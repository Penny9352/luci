#!/usr/bin/env node
/**
 * 对外文案红线检查。
 *
 * 依据 docs/superpowers/specs/2026-08-19-c端官网首页-design.md §9。
 * 这些词写上去不是「不好看」，是会造成用户预期落差或合规问题，
 * 所以做成断言，不靠人记。
 *
 * 两类区域规则不同：
 *
 *  - **营销叙述**（正文、标题、导语）走禁用清单。
 *  - **界面复刻**（首屏那个模式切换器 .demo）**逐字照抄产品**，
 *    禁用清单不适用，反过来要断言它没被「改好看」。官网写代称而产品
 *    里是另一个名字，用户进产品就找不到自己看到的东西。
 *
 *   node scripts/check-copy.mjs [url]
 *
 * 默认打 http://localhost:4173/（vite preview）。有命中即非零退出。
 */
import puppeteer from 'puppeteer-core'

const URL = process.argv[2] ?? 'http://localhost:4173/'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

/** 营销叙述里严禁出现的词与能力表述 */
const BANNED = [
  ['多模型对比', '该词在小红书已被天梯图/评测内容占据'],
  ['更强', '空洞'],
  ['保证正确', '不可承诺；用「出错的地方会被标出来」'],
  ['看不出是 AI', '用户自己判断的事，我们说了会被挑'],
  ['Excel', '需要本地文件读写，产品做不了'],
  ['降重', '能力上无效 + 合规上违规'],
  ['代写论文', '同上'],
  ['搭建工作台', '产品无配置保存与一键复用机制'],
  ['会议录音转写', '需要音频处理能力'],
  ['漫剧', '图片生成不支持复杂分镜与连续叙事'],
]

/** 营销叙述里必须存在的关键表述，防止改动时被误删 */
const REQUIRED = [
  ['多模型协同推理引擎', '对外技术代称'],
  ['择优输出', '替代被禁的「最优」，说的是动作'],
  ['出错的地方会被标出来', '交叉验证的落点，不可换成「保证正确」'],
  ['不提供任何投资建议', '收盘复盘的必需免责'],
  ['只能使用本人照片或已获授权的形象', '肖像权免责，风险落在平台'],
  ['响应耗时会明显变长', '代价要写在明面上'],
]

/** 界面复刻必须与产品逐字一致的字符串 */
const REPLICA_MUST_MATCH = [
  '智能模式',
  '自动选择最合适的单个模型处理你的请求',
  '暴力模式',
  '同时调用多个模型，综合最优结果返回',
  '自定义模型',
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })

const { prose, replica } = await page.evaluate(() => {
  const demo = document.querySelector('.demo')
  const replica = demo ? demo.innerText : ''
  const clone = document.body.cloneNode(true)
  clone.querySelector('.demo')?.remove()
  return { prose: clone.innerText, replica }
})
await browser.close()

let bad = 0

for (const [word, why] of BANNED) {
  if (prose.includes(word)) {
    console.error(`✗ 营销叙述里出现禁用表述「${word}」—— ${why}`)
    bad += 1
  }
}

for (const [word, why] of REQUIRED) {
  if (!prose.includes(word)) {
    console.error(`✗ 营销叙述里缺少必需表述「${word}」—— ${why}`)
    bad += 1
  }
}

for (const word of REPLICA_MUST_MATCH) {
  if (!replica.includes(word)) {
    console.error(`✗ 界面复刻与产品不一致，缺少「${word}」——复刻不得改写产品用词`)
    bad += 1
  }
}

if (bad === 0) {
  console.log(
    `✓ 文案红线通过：营销叙述 ${BANNED.length} 条禁用 / ${REQUIRED.length} 条必需，` +
      `界面复刻 ${REPLICA_MUST_MATCH.length} 条与产品一致`
  )
  process.exit(0)
}

console.error(`\n${bad} 处不合规。见 spec §9。`)
process.exit(1)
