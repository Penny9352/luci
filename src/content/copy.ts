/**
 * 全站对外文案，集中一处。
 *
 * 改这个文件前先读 docs/superpowers/specs/2026-08-19-c端官网首页-design.md §9 合规红线：
 *  - 严禁出现：PPT 自动生成 / Excel 处理 / PDF 批处理 / 会议转写 / 本地文件操作 /
 *    建站部署 / Skill 市场 / 多角色分镜 / 降重代写 /「搭建工作台」
 *  - 禁用词：多模型对比、暴力模式、更强、最优、保证正确、看不出是 AI
 *  - 未经研发确认的能力不得书写：定时任务联网检索、定时任务引用文件库文件
 */

export const LOGIN_URL = 'https://lucimix.com/login'
export const ENTERPRISE_URL = 'https://biz.lucimix.com'

export const nav = {
  brand: 'lucimix',
  links: [
    { label: '交叉验证', href: '#cross-check' },
    { label: '定时任务', href: '#scheduled' },
    { label: '生态应用', href: '#ecosystem' },
    { label: '光点', href: '#start' },
  ],
  login: '登录',
  cta: '免费使用',
} as const

export const hero = {
  titleLead: '你的专属 · ',
  titleAccent: '全能',
  titleTail: ' AI 工作台',
  subtitle: '聊天对话、文档处理、数据分析、自动化任务、API 接入，一个账号搞定所有 AI 使用场景。',
  ctaPrimary: '免费开始使用',
  ctaSecondary: '看它怎么用',
  /** 读屏器用的等价描述，模拟对话本身对 AT 隐藏 */
  simulationAlt:
    '产品界面演示：用户请求把零散记录整理成周报，智能模式自动选定模型作答，生成的文件自动存入文件库。输入框可切换三种模式——智能模式自动选单个模型，交叉验证让多个模型背靠背作答并标出分歧，自定义模型由你指定。同一个账号也可以绑定微信、飞书、企业微信，在聊天软件里直接使用。',
} as const

/** 首屏模拟对话。演一轮普通对话（非交叉验证），不依赖任何未确认能力。 */
export const simulation = {
  user: '把下面这些零散记录整理成周报，正式一点，500 字以内，不要出现我没提供的数据。',
  modeLabel: '智能模式',
  modeNote: '已为你选择',
  model: 'GLM 5.1',
  blocks: [
    { heading: '本周完成', body: '结算链路灰度至 30%，异常回滚耗时从 12 分钟降至 90 秒。' },
    { heading: '下周计划', body: '灰度扩至 60%，完成对账自动化脚本第一版。' },
  ],
  file: { name: '周报-第 34 周.md', note: '已存入文件库' },
  placeholder: '有什么可以帮你的吗？',
  /**
   * 输入框的模式切换器。产品 UI 里第二项叫「暴力模式」、描述写「综合最优结果返回」，
   * 两者都在 spec §9 的对外禁用清单里，官网一律用对外名「交叉验证」并改写描述。
   */
  modes: [
    { name: '智能模式', desc: '自动选择最合适的单个模型处理你的请求', current: true },
    { name: '交叉验证', desc: '多个模型背靠背作答，不一致的地方标出来', current: false },
    { name: '自定义模型', desc: '自己指定这次用哪个模型', current: false },
  ],
} as const

/** 首屏右侧：同一个账号也能在聊天软件里用 */
export const reach = {
  title: '不只在网页上',
  lead: '扫码绑定后，在聊天软件里直接对话，文件自动同步回网页端。',
  channels: [
    { name: '微信', action: '连接' },
    { name: '飞书', action: '连接' },
    { name: '企业微信', action: '连接' },
  ],
  footnote: '定时任务的结果也推到这里。',
} as const

export const crossCheck = {
  stage: '01',
  stageName: '交叉验证',
  title: '三个模型背靠背作答，不一致的地方会被标出来',
  lead: '单个 AI 在编的时候，不会告诉你它在编。这不是能力问题——它只有一个视角，没法发现自己错了。',
  points: [
    { term: '多模型背靠背', desc: '同一个问题独立作答，互不参考。' },
    { term: '自动合并去重', desc: '各家说法一致的部分，沉淀为共识。' },
    { term: '分歧单独标出', desc: '不把互相矛盾的说法合成一个看起来很确定的结论。' },
  ],
  closing: '出错的地方会被标出来。',
  shot: {
    alt: 'Lucimix 交叉验证界面：阶段一三个模型并行作答，阶段二交叉验证日志显示共识与冲突检测结果。',
    caption: '真实界面 · 阶段二的日志会写明哪条主张几家一致、哪条存在分歧、剔除了几处无法印证的数字',
  },
} as const

export const scheduled = {
  stage: '02',
  stageName: '定时任务',
  title: '你不用打开任何 App，它自己来微信找你',
  lead: '别的 AI 是你不去问，它就不存在。Lucimix 的任务在云端按时执行，结果直接推到微信——手机锁屏也照样到。',
  tasks: [
    { when: '每周五 16:00', what: '周报初稿写好发到微信，改两句就能交。' },
    { when: '每天 20:00', what: '目标岗位的面试题一天一道，连答题框架一起给。' },
    { when: '每天 21:00', what: '一个不重复的睡前故事，推到微信直接念。' },
  ],
  channels: { label: '推送渠道', items: ['微信', '企业微信', '飞书'], note: '需先扫码绑定' },
  config: {
    alt: 'Lucimix 创建定时任务界面：可填写标题、任务描述，设置执行频率与时刻、推送渠道，并为该任务单独指定执行模型。',
    caption: '每个任务可以单独指定用哪种模式执行，不跟着全局走',
  },
  push: {
    /** 尚无真实微信推送截图。这是本站绘制的示意，不伪装成真实截图。 */
    label: '示意图',
    time: '16:00',
    sender: 'Lucimix',
    title: '我的周报',
    body: '本周完成：结算链路灰度至 30%，异常回滚耗时从 12 分钟降至 90 秒……',
  },
} as const

export const library = {
  stage: '03',
  stageName: '文件库',
  title: 'AI 生成的东西，自动存进你的文件库',
  lead: '对话关掉，产出还在。全部 AI 产出与你上传的文件汇总一处，可搜索、可预览、可下载，也能直接引用到新对话里——不用下载再上传。',
  tabs: ['全部', '我的云盘', '对话内文件', '图片生成'],
  shot: {
    alt: 'Lucimix 文件库界面：全部、我的云盘、对话内文件、图片生成四个分类标签，列表显示文件名、修改时间与大小。',
    caption: '真实界面 · 四个分类，去重展示，可搜索与筛选',
  },
} as const

export const models = {
  title: '不绑定任何一家',
  lead: '没有哪个模型适合所有场景。接入得够多，才谈得上每次都用对的那个。',
  groups: [
    { label: '国产', items: ['DeepSeek', 'Kimi', 'GLM', 'Qwen'] },
    { label: '世界前沿', items: ['Claude', 'GPT'] },
  ],
  groupsNote: '等',
  modesTitle: '三种模式，一个判断标准',
  modesCriterion: '这段内容错了，要不要担责？',
  modes: [
    { name: '智能模式', what: '系统自动选最合适的模型，你只管提问。', when: '长、日常、随手问、自己看' },
    { name: '交叉验证', what: '多个模型背靠背作答，分歧标出来。', when: '短、重要、要对外交付、错了要担责' },
    { name: '自定义模型', what: '自己指定用哪个。', when: '明确知道某个模型在这件事上更擅长' },
  ],
} as const

export const ecosystem = {
  stage: '04',
  stageName: '生态应用',
  title: '平台上的应用，不用各自注册、各自付费',
  points: [
    { term: '一个账号通用', desc: '平台上的应用不用挨个注册登录。' },
    {
      term: '一份光点通用',
      desc: '不管用哪个应用，消耗的都是同一份光点，不需要在每个应用里单独充值。',
    },
  ],
  apps: [
    {
      name: '口播视频',
      what: '一张照片加一条参考视频，产出口播视频和配套文案。',
      note: '只能使用本人照片或已获授权的形象。',
    },
    {
      name: '收盘复盘',
      what: '收盘后自动整理当日复盘推到微信，各家说法不一致的地方会标出来。',
      note: '信息整理工具，不提供任何投资建议。',
    },
    {
      name: '批量换装',
      what: '一张自己的照片出一整季搭配图，人还是同一个人。',
      note: '只能使用本人照片或已获授权的形象。',
    },
  ],
} as const

export const start = {
  title: '现在开始用',
  lead: '手机号登录，未注册会自动创建账号。',
  credits: {
    title: '光点',
    body: '平台统一的计费单位，微信或支付宝扫码充值。侧边栏常驻显示余额，旁边就是充值入口。',
  },
  invite: {
    title: '邀请好友',
    body: '邀请人与被邀请人各得 1,000 光点。',
    amount: '1,000',
  },
  cta: '免费开始使用',
} as const

export const footer = {
  company: '北京光忽智能科技有限公司',
  /** TODO: 向用户取实际备案号。品牌页上的 京ICP备2025000000号 是占位。 */
  icp: '京ICP备2025000000号',
  links: [
    { label: '服务协议', href: '#' },
    { label: '隐私政策', href: '#' },
  ],
  enterprise: { label: '企业版', href: ENTERPRISE_URL },
  disclaimer: 'AI 生成内容请注意核实。',
} as const
