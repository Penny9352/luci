/**
 * 全站对外文案，集中一处。
 *
 * 改这个文件前先读 docs/superpowers/specs/2026-08-19-c端官网首页-design.md §9 合规红线：
 *  - 严禁出现：Excel 处理 / PDF 批处理 / 会议录音转写 / 本地文件操作 /
 *    建站部署 / Skill 市场 / 多角色分镜 / 降重代写 /「搭建工作台」
 *  - PPT 生成不再是通用禁项：ecosystem.apps 里的「PPT 生成助手」是真实上线的生态应用，
 *    可以写；但核心对话（hero / simulation）不能暗示智能模式本身会做 PPT
 *  - 禁用词：多模型对比、更强、最优、保证正确、看不出是 AI
 *  - 「暴力模式」可以出现在正文里（作为产品内的真实模式名），但技术代称
 *    「多模型协同推理引擎」必须先出现一次，「暴力模式」不能是用户唯一看到的说法
 *  - 未经研发确认的能力不得书写：定时任务联网检索、定时任务引用文件库文件
 */

export const LOGIN_URL = 'https://lucimix.com/login'
export const ENTERPRISE_URL = 'https://biz.lucimix.com'

export const nav = {
  brand: 'lucimix',
  links: [
    { label: '模型能力', href: '#cross-check' },
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
   * 输入框的模式切换器 —— 这是产品界面的复刻，**逐字照抄产品**，
   * 包括「暴力模式」和「综合最优结果返回」。
   *
   * spec §9 那份禁用清单管的是营销叙述，不管界面复刻：官网写「多模型协同
   * 推理引擎」而产品里叫「暴力模式」，用户进产品就找不到自己看到的东西，
   * 这个代价比用词统一大得多。代称只在正文里用（见 crossCheck / models）。
   */
  modes: [
    { name: '智能模式', desc: '自动选择最合适的单个模型处理你的请求', current: true, info: false },
    { name: '暴力模式', desc: '同时调用多个模型，综合最优结果返回', current: false, info: true },
    { name: '自定义模型', desc: '当前：智能模式', current: false, info: false },
  ],
} as const

/** 首屏右侧：同一个账号也能在聊天软件里用 */
export const reach = {
  title: '不只在网页上',
  lead: '扫码绑定后，在聊天软件里直接对话，文件自动同步回网页端。',
  /** logo 取自产品自身的资源，非重绘 */
  channels: [
    { name: '微信', action: '连接', logo: '/logos/wechat.png' },
    { name: '飞书', action: '连接', logo: '/logos/feishu.png' },
    { name: '企业微信', action: '连接', logo: '/logos/wecom.png' },
  ],
  footnote: '定时任务的结果也推到这里。',
} as const

export const crossCheck = {
  stage: '01',
  stageName: '模型能力',
  title: '多模型协同推理引擎',
  subtitle: '一个问题，让多个 AI 一起思考。',
  problem: {
    pre: '单个 AI 有时会给出',
    strong: '看似可信、实际并不准确的答案',
    post: '，甚至编造不存在的信息。',
  },
  engine: 'Lucimix 暴力模式，同时调用多个领先模型回答、交叉验证并择优输出，让复杂问题的答案更全面、更可靠。',
  usage: {
    label: '怎么用？',
    pre: '日常问题使用「智能模式」；遇到',
    strong: '重要决策、复杂分析或希望多方验证',
    post: '的问题，开启「暴力模式」。',
  },
  beats: ['多模型回答', '交叉验证', '择优输出'],
  points: [
    { term: '多模型背靠背', desc: '同一个问题独立作答，互不参考。' },
    { term: '自动合并去重', desc: '各家说法一致的部分，沉淀为共识。' },
    { term: '分歧单独标出', desc: '不把互相矛盾的说法合成一个看起来很确定的结论。' },
  ],
  /** 产品自己的弹窗里写明的代价。讲清楚比只讲好处可信。 */
  tradeoff: {
    label: '权衡',
    text: '响应耗时会明显变长，光点花费也可能高于智能模式。日常问题用智能模式就够了。',
  },
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
  title: '文件成为可持续复用的 AI 资产',
  lead: '统一管理上传文件与 AI 产出，支持搜索、预览和跨对话引用。换一个对话，也能继续使用之前的资料和成果。',
  reuse: {
    lead: '开新对话时不用重新上传。点输入框的「+」，云盘、文件库、其他对话生成过的文件，直接拉进来当上下文。',
  },
} as const

/**
 * 文件库板块的第二个演示：对话里引用一个历史文件。
 *
 * 界面复刻——菜单项、弹窗标签、文件名与工具调用标记都逐字取自真实截图
 * （assets/文件库Demo），不是营销叙述，不受 §9 禁用词表约束。
 */
export const libraryDemo = {
  appName: '个人助手',
  placeholder: '输入消息...',
  attachMenu: { upload: '从电脑上传', library: '从文件库添加' },
  picker: {
    title: '从文件库选择',
    search: '搜索文件...',
    tabs: ['全部', '对话内文件', '图片生成', '我的云盘'],
    aiOnly: '只看 AI 生成',
    files: [
      { name: '三个月健身训练计划.html', time: '20小时前' },
      { name: 'WorkBuddy竞品全景清单（含第三方AI聚合平台）.html', time: '2天前' },
    ],
    selected: '已选 0 个文件',
    cancel: '取消',
    confirm: '确认添加',
  },
  chip: { name: '三个月健身训练计划.html', size: '22.6KB' },
  user: '结合健身计划，给出针对性改善睡眠的方法。',
  answer: {
    para1:
      '我看了你的三个月健身计划——第 1 月基础适应，第 2 月推/拉/腿分化，第 3 月冲到更高强度。我先读一下完整计划，再给出针对性的睡眠方案。',
    toolRead: '读取文件',
    para2:
      '计划强度从 RPE 6 逐步加到 9 的 PR 峰值，睡眠需求也随阶段明显变化。我按三个阶段定制了一套睡眠方案，写成和你原计划风格统一的 HTML 页面。',
    toolWrite: '写入文件',
  },
  alt: '产品界面演示：在已有对话里点输入框的「+」，选择「从文件库添加」，从弹窗中选中一个历史文件「三个月健身训练计划.html」，文件以附件形式带入新提问，AI 读取文件内容后生成针对性回答并写入新文件。',
} as const

export const models = {
  title: '不绑定任何一家',
  lead: '没有哪个模型适合所有场景。接入得够多，才谈得上每次都用对的那个。',
  groups: [
    {
      label: '国产',
      items: [
        { name: 'DeepSeek', icon: '/logos/models/deepseek.png' },
        { name: 'Kimi', icon: '/logos/models/kimi.png' },
        { name: 'GLM', icon: '/logos/models/glm.png' },
        { name: 'Qwen', icon: '/logos/models/qwen.png' },
      ],
    },
    {
      label: '世界前沿',
      items: [
        { name: 'Claude', icon: '/logos/models/claude.png' },
        { name: 'GPT', icon: '/logos/models/gpt.png' },
      ],
    },
  ],
  modesTitle: '三种模式，一个判断标准',
  modesCriterion: '这段内容错了，要不要担责？',
  modes: [
    { name: '智能模式', what: '自动选最合适的单个模型，你只管提问。', when: '长、日常、随手问、自己看' },
    {
      name: '多模型协同推理引擎',
      /** 产品里的叫法，写出来才对得上，否则用户进产品找不到 */
      alias: '产品内叫「暴力模式」',
      what: '多个模型同时作答，交叉验证后择优输出。',
      when: '重要决策、复杂分析、希望多方验证',
    },
    { name: '自定义模型', what: '自己指定这次用哪个。', when: '明确知道某个模型在这件事上更擅长' },
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
      name: '口播视频助手',
      icon: '/logos/apps/koubo-video.png',
      what: '您的专属 AI 口播视频助手，从选题、写稿到数字人口播、视频生成和发布文案，一站式完成，快速把想法变成成片。',
      note: '只能使用本人照片或已获授权的形象。',
    },
    {
      name: '紫微斗数',
      icon: '/logos/apps/ziwei-doushu.png',
      what: 'AI 紫微斗数与八字分析助手，支持八字排盘、大运流年解读与命盘分析，快速生成清晰易懂的个人运势参考。',
      note: '结果仅供参考，不作人生决策依据。',
    },
    {
      name: '写真生成',
      icon: '/logos/apps/xiezhen.png',
      what: 'AI 写真生成助手，一键换装、切换风格与场景，轻松生成自然精致的专业级写真。',
      note: '只能使用本人照片或已获授权的形象。',
    },
    {
      name: '投资理财 Agent',
      icon: '/logos/apps/touzi-licai.png',
      what: '您的 AI 投资复盘助手，支持股票复盘、持仓跟踪与投资收益分析，帮您更清晰地了解账户表现和投资变化。',
      note: '信息整理工具，不提供任何投资建议。',
    },
    {
      name: 'PPT 生成助手',
      icon: '/logos/apps/ppt-zhushou.png',
      what: '输入主题或上传资料，AI 自动梳理大纲、生成文案并完成页面设计，快速制作结构清晰的演示文稿。',
      note: '',
    },
    {
      name: '文档总结助手',
      icon: '/logos/apps/wendang-zongjie.png',
      what: '支持长文、报告、会议纪要等内容的快速总结与重点提炼，自动整理关键信息、结论和待办事项。',
      note: '',
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
