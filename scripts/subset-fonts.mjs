#!/usr/bin/env node
/**
 * 构建期字体子集化。
 *
 * 思源宋体全字符集 5MB+，直接引入会毁掉首屏 LCP（LCP 元素就是首屏那行中文标题）。
 * 这里扫描 src/content/copy.ts 里实际用到的字符，向 Google Fonts 请求只含这些
 * 字形的 woff2，自托管到 public/fonts/，并生成 src/styles/fonts.css。
 *
 * 用 Google Fonts css2 API 的 text= 参数拿子集，不需要本地 fonttools。
 * 网络不可用时保留已有产物并退出 0——不阻塞开发。
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FONT_DIR = resolve(root, 'public/fonts')
const CSS_OUT = resolve(root, 'src/styles/fonts.css')

// 现代 Chrome UA，否则 Google Fonts 回退发 ttf
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

/** 页面上可能出现但不在 copy.ts 里的字符（数字、标点、模拟对话的兜底） */
const EXTRA = '0123456789%·—…、，。：；？！（）「」『』/+-.,:;?!()[]#@&*"\' '

/**
 * 中文正文走系统栈（PingFang SC / Microsoft YaHei），与产品端一致，不下载。
 * 只有标题用的衬线需要子集，且只含标题里实际出现的字。
 */
const FAMILIES = [
  { file: 'noto-serif-sc-700', family: 'Noto Serif SC', spec: 'wght@700', weight: 700, set: 'display' },
  { file: 'inter-400', family: 'Inter', spec: 'wght@400', weight: 400, set: 'latin' },
  { file: 'inter-600', family: 'Inter', spec: 'wght@600', weight: 600, set: 'latin' },
  { file: 'jetbrains-mono-500', family: 'JetBrains Mono', spec: 'wght@500', weight: 500, set: 'latin' },
]

/** copy.ts 里承担标题/展示级排版的字段名 */
const DISPLAY_KEYS = [
  'title', 'titleLead', 'titleAccent', 'titleTail', 'stageName',
  'modesTitle', 'modesCriterion', 'closing', 'term', 'name', 'heading', 'label',
]

function clean(set) {
  for (const c of [...set]) if (c.codePointAt(0) < 0x21) set.delete(c)
  return [...set].sort().join('')
}

async function collectChars() {
  const src = await readFile(resolve(root, 'src/content/copy.ts'), 'utf8')

  // 展示级：只取标题类字段的字符串字面量
  const keys = DISPLAY_KEYS.join('|')
  const re = new RegExp(`\\b(?:${keys})\\s*:\\s*(['\"])((?:\\\\.|(?!\\1).)*)\\1`, 'g')
  const display = new Set(EXTRA)
  for (const m of src.matchAll(re)) for (const c of m[2]) display.add(c)

  // 拉丁：整份文件里的 ASCII，够覆盖正文里的英文与数字
  const latin = new Set(EXTRA)
  for (const c of src) if (c.codePointAt(0) < 0x80) latin.add(c)

  return { display: clean(display), latin: clean(latin) }
}

async function fetchSubset({ family, spec }, text) {
  const url =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${spec}` +
    `&text=${encodeURIComponent(text)}&display=swap`
  const css = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!css.ok) throw new Error(`${family}: css2 responded ${css.status}`)
  const body = await css.text()
  // 子集接口返回的是无后缀的 /l/font?kit=… ，只能靠 format('woff2') 认
  const match = body.match(/url\((https:\/\/[^)]+)\)\s*format\('woff2'\)/)
  if (!match) throw new Error(`${family}: no woff2 in css2 response`)
  const font = await fetch(match[1], { headers: { 'User-Agent': UA } })
  if (!font.ok) throw new Error(`${family}: font responded ${font.status}`)
  return Buffer.from(await font.arrayBuffer())
}

function css(entries) {
  const faces = entries
    .map(
      (e) => `@font-face {
  font-family: '${e.family}';
  font-style: normal;
  font-weight: ${e.weight};
  font-display: swap;
  src: url('/fonts/${e.file}.woff2') format('woff2');
}`
    )
    .join('\n\n')
  return `/* 由 scripts/subset-fonts.mjs 生成，请勿手改。改文案后跑 npm run fonts。 */\n\n${faces}\n`
}

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

async function main() {
  await mkdir(FONT_DIR, { recursive: true })
  const sets = await collectChars()
  const cjkCount = [...sets.display].filter((c) => c.codePointAt(0) > 0x2e80).length
  console.log(`标题字符集：${[...sets.display].length} 个（其中 CJK ${cjkCount} 个）`)
  console.log(`拉丁字符集：${[...sets.latin].length} 个`)

  const done = []
  let total = 0
  for (const f of FAMILIES) {
    const out = resolve(FONT_DIR, `${f.file}.woff2`)
    try {
      const buf = await fetchSubset(f, sets[f.set])
      await writeFile(out, buf)
      total += buf.length
      console.log(`  ✓ ${f.file}.woff2  ${(buf.length / 1024).toFixed(1)} KB`)
      done.push(f)
    } catch (err) {
      if (await exists(out)) {
        console.warn(`  · ${f.file}.woff2  取用已有产物（${err.message}）`)
        done.push(f)
      } else {
        console.warn(`  ✗ ${f.file}.woff2  ${err.message}`)
      }
    }
  }

  if (!done.length) {
    console.warn('没有取到任何字体，保留现有 fonts.css。')
    if (!(await exists(CSS_OUT))) await writeFile(CSS_OUT, '/* 字体未就绪 */\n')
    return
  }

  await writeFile(CSS_OUT, css(done))
  console.log(`合计 ${(total / 1024).toFixed(1)} KB → src/styles/fonts.css`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
