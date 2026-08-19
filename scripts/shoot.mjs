#!/usr/bin/env node
/**
 * 批量验收截图：桌面与移动一次跑完，顺带回读计算样式做机械检查。
 * 用系统已装的 Chrome，不下载浏览器。
 *
 *   node scripts/shoot.mjs [baseUrl]
 */
import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'

const BASE = process.argv[2] ?? 'http://localhost:4173/'
const OUT = 'shots-review'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const VIEWS = [
  { name: 'desktop', width: 1440, height: 900, dsf: 2 },
  { name: 'mobile', width: 390, height: 844, dsf: 2, mobile: true },
]

const SECTIONS = ['#cross-check', '#scheduled', '#library', '#models', '#ecosystem', '#start']

async function main() {
  await mkdir(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--font-render-hinting=none'],
  })

  const report = {}

  for (const v of VIEWS) {
    const page = await browser.newPage()
    await page.setViewport({
      width: v.width,
      height: v.height,
      deviceScaleFactor: v.dsf,
      isMobile: !!v.mobile,
      hasTouch: !!v.mobile,
    })
    await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((r) => setTimeout(r, 900))

    // 首屏
    await page.screenshot({ path: `${OUT}/${v.name}-01-hero.png` })

    // 让模拟对话跑一会儿再截一张，看流式中段
    await new Promise((r) => setTimeout(r, 4200))
    await page.screenshot({ path: `${OUT}/${v.name}-02-hero-mid.png` })

    // 各区块
    let i = 3
    for (const sel of SECTIONS) {
      await page.evaluate((s) => {
        document.querySelector(s)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      }, sel)
      await new Promise((r) => setTimeout(r, 1400))
      const label = sel.replace('#', '')
      await page.screenshot({ path: `${OUT}/${v.name}-${String(i).padStart(2, '0')}-${label}.png` })
      i += 1
    }

    // 整页
    await page.evaluate(() => window.scrollTo(0, 0))
    await new Promise((r) => setTimeout(r, 500))
    await page.screenshot({ path: `${OUT}/${v.name}-full.png`, fullPage: true })

    // 机械回读
    report[v.name] = await page.evaluate(() => {
      const out = { overflow: null, measures: [], tiny: [], contrastSamples: [] }
      const de = document.documentElement
      out.overflow = {
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        horizontal: de.scrollWidth > de.clientWidth + 1,
      }
      const px = (n) => parseFloat(n) || 0
      for (const el of document.querySelectorAll('p, li, dd, dt, h1, h2, h3')) {
        const cs = getComputedStyle(el)
        const fs = px(cs.fontSize)
        const text = (el.textContent || '').trim()
        if (!text) continue
        if (fs < 12) out.tiny.push({ tag: el.tagName, fs, text: text.slice(0, 26) })
        if (el.tagName === 'P' && text.length > 40) {
          const ch = el.getBoundingClientRect().width / (fs * 0.5)
          out.measures.push({ ch: Math.round(ch), cls: el.className, text: text.slice(0, 22) })
        }
      }
      for (const sel of ['.lede', '.shot__caption', '.apps__note', '.stage__state', '.modes__when', '.foot__legal']) {
        const el = document.querySelector(sel)
        if (!el) continue
        const cs = getComputedStyle(el)
        out.contrastSamples.push({ sel, color: cs.color, size: cs.fontSize })
      }
      return out
    })

    await page.close()
  }

  console.log(JSON.stringify(report, null, 2))
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
