#!/usr/bin/env node
/**
 * 对外文案红线检查。
 *
 * 依据 docs/superpowers/specs/2026-08-19-c端官网首页-design.md §9。
 * 这些词写上去不是「不好看」，是会造成用户预期落差或合规问题，
 * 所以做成断言，不靠人记。
 *
 *   node scripts/check-copy.mjs [url]
 *
 * 默认打 http://localhost:4173/（vite preview）。有命中即非零退出。
 */
import puppeteer from 'puppeteer-core'

const URL = process.argv[2] ?? 'http://localhost:4173/'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

/** 严禁出现的词与能力表述 */
const BANNED = [
  ['暴力模式', '内部叫法，对外用「多模型协同推理引擎」'],
  ['多模型对比', '该词在小红书已被天梯图/评测内容占据'],
  ['最优', '空洞承诺；用「择优输出」这类动作词'],
  ['更强', '空洞'],
  ['保证正确', '不可承诺；用「出错的地方会被标出来」'],
  ['看不出是 AI', '用户自己判断的事，我们说了会被挑'],
  ['PPT', '国内 AI 工具最大的单一心智，但产品做不了'],
  ['Excel', '需要本地文件读写，产品做不了'],
  ['降重', '能力上无效 + 合规上违规'],
  ['代写论文', '同上'],
  ['搭建工作台', '产品无配置保存与一键复用机制'],
  ['会议录音转写', '需要音频处理能力'],
]

/** 必须存在的关键表述，防止改动时被误删 */
const REQUIRED = [
  '多模型协同推理引擎',
  '择优输出',
  '出错的地方会被标出来',
  '不提供任何投资建议',
  '只能使用本人照片或已获授权的形象',
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })
const text = await page.evaluate(() => document.body.innerText)
await browser.close()

let bad = 0

for (const [word, why] of BANNED) {
  if (text.includes(word)) {
    console.error(`✗ 出现禁用表述「${word}」—— ${why}`)
    bad += 1
  }
}

for (const word of REQUIRED) {
  if (!text.includes(word)) {
    console.error(`✗ 缺少必需表述「${word}」`)
    bad += 1
  }
}

if (bad === 0) {
  console.log(`✓ 文案红线检查通过（${BANNED.length} 条禁用、${REQUIRED.length} 条必需）`)
  process.exit(0)
}

console.error(`\n${bad} 处不合规。见 spec §9。`)
process.exit(1)
