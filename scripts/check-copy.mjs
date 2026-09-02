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

/** 营销叙述里严禁出现的词与能力表述（中文页） */
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
  [
    '标注模型分歧',
    '交叉验证的落点，原文「分歧标出」。2026-09-02 暴力模式左侧文案改成参考图的四条 ' +
      'checklist（workspace.tabs[1].checklist），原句被拆开，改用「标注模型分歧，提示验证，' +
      '减少返工」这条承接同一件事：分歧会被标出来，不是被模型悄悄抹平。',
  ],
]

/**
 * 2026-08-27 首屏改 Tab 结构时，下列必需表述随 CrossCheck / Scheduled /
 * Library 三个板块一并删除。记在这里是为了它们别被无声地忘掉 ——
 * 想恢复，最省的位置是 workspace.tabs[0].usecase：
 *
 *   ['多模型协同推理引擎', '对外技术代称']  ← 用户已明确解除该要求
 *   ['择优输出',          '替代被禁的「最优」，说的是动作']
 *   ['出错的地方会被标出来', '不可换成「保证正确」']
 *   ['响应耗时会明显变长',  '代价要写在明面上 —— 目前全站已无任何权衡披露']
 *
 * 2026-09-02 中文站拿掉了生态应用整段——'不提供任何投资建议'（投资理财
 * Agent）和'只能使用本人照片或已获授权的形象'（写真生成 / 口播视频助手）
 * 这两条必需免责原来就只挂在这一段里，段没了、页面上不再宣传这些能力，
 * 免责也就无从谈起，随之从中文页的必需清单里去掉。英文页的生态应用还在，
 * REQUIRED_EN 不受影响，照旧要求这两条。
 */

/**
 * 界面复刻必须与产品逐字一致的字符串。
 *
 * 改 Tab 结构后，常开的模式切换器已删，页面上只剩输入框那颗模式 chip，
 * 所以此表随之收缩到 chip 上真实出现的词。
 */
const REPLICA_MUST_MATCH = ['自定义模型']

/**
 * 英文页。词表不是中文表的机翻 —— 禁的是同一批「做不到 / 不能承诺」的
 * 能力表述，必需的是同一批免责，只是换了语言。
 */
const BANNED_EN = [
  ['guaranteed correct', '不可承诺'],
  ['always accurate', '同上'],
  ['never wrong', '同上'],
  ['Excel', '需要本地文件读写，产品做不了'],
  ['transcribe', '会议录音转写，产品做不了'],
  ['ghostwrit', '代写论文，能力无效 + 合规违规'],
  ['undetectable', '降 AIGC 检测率，合规违规'],
]

const REQUIRED_EN = [
  ['flag', '交叉验证的落点：分歧要被标出来'],
  ['does not give investment advice', '股票复盘的必需免责'],
  ['permission to use', '肖像权免责，风险落在平台'],
]

const REPLICA_MUST_MATCH_EN = ['Custom models']

const SUITES = [
  { name: '中文页', path: '/', banned: BANNED, required: REQUIRED, replica: REPLICA_MUST_MATCH },
  { name: '英文页', path: '/en/', banned: BANNED_EN, required: REQUIRED_EN, replica: REPLICA_MUST_MATCH_EN },
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox'],
})
let bad = 0

for (const suite of SUITES) {
  const page = await browser.newPage()
  await page.goto(URL.replace(/\/$/, '') + suite.path, { waitUntil: 'networkidle0', timeout: 60000 })

  /**
   * 2026-09-02 工作台从「一个 Tab 区，同一时刻只有一个面板在 DOM 里」
   * 改成「四个独立整幅屏，四份都常驻 DOM」，不用再逐个点开——一次性
   * 读整页正文就已经包含全部四屏的文案。
   */
  const { prose, replica } = await page.evaluate(() => {
    const demo = document.querySelector('.ws-daily')
    const replica = demo ? demo.innerText : ''
    const clone = document.body.cloneNode(true)
    clone.querySelector('.ws-daily')?.remove()
    return { prose: clone.innerText, replica }
  })
  await page.close()

  let sub = 0
  for (const [word, why] of suite.banned) {
    if (prose.includes(word)) {
      console.error(`✗ ${suite.name} 出现禁用表述「${word}」—— ${why}`)
      sub += 1
    }
  }
  for (const [word, why] of suite.required) {
    if (!prose.includes(word)) {
      console.error(`✗ ${suite.name} 缺少必需表述「${word}」—— ${why}`)
      sub += 1
    }
  }
  for (const word of suite.replica) {
    if (!replica.includes(word)) {
      console.error(`✗ ${suite.name} 界面复刻与产品不一致，缺少「${word}」`)
      sub += 1
    }
  }
  bad += sub
  if (sub === 0)
    console.log(
      `✓ ${suite.name}：${suite.banned.length} 条禁用 / ${suite.required.length} 条必需 / ` +
        `${suite.replica.length} 条界面复刻，全部通过`
    )
}

await browser.close()

if (bad === 0) process.exit(0)
console.error(`\n${bad} 处不合规。`)
process.exit(1)
