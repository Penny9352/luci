/**
 * 全站对外文案，集中一处。
 *
 * 合规红线（原 docs/superpowers/specs/2026-08-19-c端官网首页-design.md §9）：
 *
 *  【2026-08-27 用户决定解除以下两条】
 *   - 「暴力模式」可作为 Tab 标签与正文主用词直接出现，不再要求技术代称
 *     「多模型协同推理引擎」先行出现一次。
 *   - 首屏核心对话区可写「做 PPT」「整理文件」。
 *     注意：PRODUCT.md〈严禁写入任何对外物料的场景〉仍写着
 *     「PPT 自动生成并保存到本地 …… 但我们确实做不了」与「本地文件批量重命名 / 整理」。
 *     用户在知悉该条后仍要求照抄 v4 原文，措辞集中在 workspace.tabs[1].desc，
 *     一行即可改回。
 *
 *  【仍然有效】
 *   - 严禁出现：Excel 处理 / PDF 批处理 / 会议录音转写 /
 *     建站部署 / Skill 市场 / 多角色分镜 / 降重代写 /「搭建工作台」
 *   - 禁用词：多模型对比、更强、最优、保证正确、看不出是 AI
 *   - 未经研发确认的能力不得书写：定时任务引用文件库文件
 *   - 定时任务联网检索已研发确认，可对外书写
 */

import { LOGIN_URL, ENTERPRISE_URL } from './urls'

export const nav = {
  brand: 'lucimix',
  links: [
    { label: '工作台', href: '#workspace' },
    { label: '适用人群', href: '#audience' },
    { label: '案例', href: '#case' },
    { label: '模型能力', href: '#models' },
    { label: '生态应用', href: '#ecosystem' },
    { label: '光点', href: '#start' },
  ],
  login: '登录',
  cta: '免费使用',
  /** 只给读屏器和语言切换器用，不出现在可见文案里 */
  navLabel: '页面导航',
  menuOpen: '打开菜单',
  menuClose: '关闭菜单',
  langSwitch: '切换到英文',
  tablistLabel: 'Lucimix 工作模式',
}

export const hero = {
  /** 品牌单独占一行 —— 与其让「一个」孤悬行尾，不如把 Lucimix 做成题头 */
  titleBrand: 'Lucimix',
  titleLead: '一个',
  titleAccent: '真正替你工作',
  titleTail: '的 AI 助手',
  /**
   * 副标题中间要嵌渠道 logo，所以拆成前后两段。
   * logo 直接复用 reach.channels，避免同一批渠道在文案里维护两份。
   */
  subtitleLead: '分析数据、写文档、搞研究、盯投资等，Lucimix 帮你持续执行任务，成果多端推送',
  subtitleTail: '，一个账号搞定所有 AI 使用场景。',
  ctaPrimary: '免费开始使用',
  ctaSecondary: '看它怎么用',
  /** 读屏器用的等价描述，模拟对话本身对 AT 隐藏 */
  simulationAlt:
    '产品界面演示：用户请求把零散记录整理成周报，智能模式自动选定模型作答，生成的文件自动存入文件库。输入框可切换三种模式——智能模式自动选单个模型，交叉验证让多个模型背靠背作答并标出分歧，自定义模型由你指定。同一个账号也可以绑定微信、飞书、企业微信，在聊天软件里直接使用。',
}

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
}

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
}

/**
 * 首屏工作台 Tab 区。
 *
 * 四个 Tab 共用一个产品窗口外框：切换只换画布内容，外框、侧栏、
 * 尺寸都不动 —— 外框跟着内容变会让整页在每次点击时抖一下。
 * 画布高度写死，四块面板内容长短不一，不能让窗口自己长高。
 *
 * 面板素材：暴力模式用真实产品截图（暗色、横版，直接落在画布里）；
 * 另外三块是本站按产品信息绘制的界面，不是截图，也不伪装成截图。
 */
export const workspace = {
  /** 段头。Tab 区独立成段之后，需要自己交代「这一段在讲什么」 */
  label: 'Lucimix 工作台',
  title: '一个工作台，把事情做完。',
  lead: '从日常任务到复杂研究，Lucimix 帮你一路做到交付。',

  /** 侧栏是外框的一部分，四个 Tab 共用；current 由当前 Tab 决定 */
  side: {
    brand: 'Lucimix',
    newTask: '新建任务',
    workLabel: '工作',
    recentLabel: '最近',
    recent: ['竞品调研', '产品方案整理', '行业资料分析'],
    settings: '设置',
  },
  topbar: '新任务',

  tabs: [
    {
      id: 'verify',
      tab: '暴力模式',
      badge: '暴力模式 · 3 个模型',
      title: '更可靠的 AI',
      desc: '三模型背靠背作答 + 交叉验证 + 分歧标出，综合给结论。',
      usecase: '行业研究、学术论文、法律合规、财务分析，开启「暴力模式」。',
    },
    {
      id: 'daily',
      tab: '日常任务',
      badge: '智能选择模型',
      title: '日常任务',
      /**
       * 「做 PPT」「整理文件」与 PRODUCT.md 的能力清单冲突，
       * 用户 2026-08-27 知悉后仍要求照抄 v4 原文。要改回来只动这一行。
       */
      desc: '日常问答，个人写周报、做 PPT、整理文件、搜索资料，说出需求，直接拿结果。',
      usecase: '',
    },
    {
      id: 'schedule',
      tab: '定时任务',
      badge: '定时任务',
      title: '设定一次，持续替你执行',
      desc: '定时搜索、监控、整理信息，结果自动生成并按时推送。',
      usecase: '',
    },
    {
      id: 'docs',
      tab: '文档管理',
      badge: '文档管理',
      title: '文件成为可持续复用的 AI 资产',
      desc: '统一管理上传文件与 AI 产出，支持搜索、预览和跨对话引用。',
      usecase: '换一个对话，也能继续使用之前的资料和成果。',
    },
  ],

  /** 暴力模式面板：真实产品截图 */
  verify: {
    src: '/shots/cross-check-panel.png',
    alt: 'Lucimix 交叉验证界面：阶段一 GLM 5.1、Sonnet 4.6、DeepSeek V4 Pro 三个模型并行作答，阶段二交叉验证日志写明 3/3 一致的主张、成本结论存在的分歧，以及分歧根因。',
  },

  /** 定时任务面板 */
  schedule: {
    tasks: [
      { when: '每天 08:00', name: '竞品动态监控', desc: '官网 · 新闻 · 产品更新', state: '运行中', running: true },
      { when: '每天 09:00', name: '行业信号晨报', desc: '政策 · 融资 · 技术变化', state: '运行中', running: true },
      { when: '每周五 17:00', name: '本周决策备忘', desc: '项目讨论 · 关键判断 · 风险', state: '已计划', running: false },
    ],
    logLabel: '最近一次执行',
    log: '08:00 已完成竞品动态监控，发现 4 条新变化，其中 1 条信息来源单一，已标记待核实。结果已推送到微信。',
  },

  /** 文档管理面板 */
  docs: {
    search: '搜索文件名、内容，或直接问文档里的问题',
    folders: ['全部文档', '产品资料', '竞品研究', '会议与方案', '行业报告'],
    head: { name: '文档', time: '更新时间', state: '状态' },
    files: [
      { name: 'Lucimix 产品规划 2026', meta: '产品资料 · 36 页', time: '今天 14:26', state: '已解析' },
      { name: 'AI Agent 行业研究', meta: '行业报告 · PDF', time: '昨天', state: '已解析' },
      { name: '8 月产品讨论纪要', meta: '会议与方案 · 文档', time: '8 月 25 日', state: '已解析' },
      { name: '竞品功能对比表', meta: '竞品研究 · 表格', time: '8 月 23 日', state: '已解析' },
    ],
    tipStrong: '资料不是存进去就结束。',
    tip: '日常任务、暴力模式和定时任务都可以直接引用这些文档，让 Lucimix 基于你的长期资料继续工作。',
  },
}

/**
 * 适用人群。
 *
 * 文案取自「9 段结构 + 论文开题案例」原型第 6 段。原型用 emoji 当图标、
 * 五张等大卡片平铺；这里换成本站自己的描边图标与竖发丝线分栏 ——
 * emoji 不属于任何图标体系，卡片盒子在这一屏也只是多一层边框。
 */
export const audience = {
  label: '适用人群',
  title: '谁在把重要问题交给 Lucimix？',
  lead: '只要你的工作中存在「不能出错的判断」，暴力模式就有价值。',
  roles: [
    { name: '研究者', what: '文献核查、开题论证、综述交叉验证' },
    { name: '产品经理', what: '竞品监控、需求分析、决策方案比对' },
    { name: '投资者', what: '财报分析、行业研究、数据交叉核对' },
    { name: '内容创作者', what: '事实核查、数据验证、引用准确性检查' },
    { name: '管理者', what: '方案评审、风险识别、多视角决策辅助' },
  ],
}

/**
 * 案例：一份开题报告，交叉验证在提交前挑出的问题。
 *
 * 场景取自真实产品会话（「写一个开题报告大纲，《基于多模态大模型的课堂
 * 情感反馈系统研究》」）。这一屏讲的是**检查**，不是代写 —— 导语
 * 「不是写得更多，而是少带着错误交付」就是这条边界。
 *
 * 字体子集只扫 title / heading / label / name 这几个键，所以进标题衬线的
 * 文字必须挂在这些键上（见 scripts/subset-fonts.mjs 的 DISPLAY_KEYS）。
 */
export const caseStudy = {
  label: '案例',
  /** 换行是文案的一部分，靠 white-space: pre-line 保住 */
  title: '一个 AI 没发现的问题，\n三个 AI 帮你找出来。',
  lead: '不是写得更多，而是少带着错误交付。',

  doc: {
    kind: '研究生开题报告',
    running: '正在检查',
    done: '检查完成',
    title: '《基于多模态大模型的课堂情感反馈系统研究》',
  },

  /**
   * 左卡 = 产品界面复刻，取自「暴力模式跑开题报告大纲」那次真实会话截图。
   *
   * 逐字照抄的部分：三段进度（并行作答 / 交叉验证 / 开始输出）、
   * 「阶段一 · 3 个模型并行作答 3/3」、三个模型名与字数、
   * 「阶段二 · 交叉验证 已读取 5,105 字」。
   * 1,342 + 1,655 + 2,108 = 5,105，与截图对得上，别改单不改总。
   *
   * 自行撰写的部分：三条模型摘要与日志四行。截图那一次的日志讲的是
   * 「不建议整体迁移 / 成本结论存在分歧」，属于另一个问题，挂在开题报告
   * 下面前后对不上；日志四行直接用本段已确认的风险点文案。
   */
  session: {
    prompt: '写一个开题报告大纲，《基于多模态大模型的课堂情感反馈系统研究》',
    steps: ['并行作答', '交叉验证', '开始输出'],
    stage1: '阶段一 · 3 个模型并行作答',
    stage1Count: '3/3',
    models: [
      { name: 'GLM 5.1', excerpt: '先划定研究边界：多模态…', words: '1,342 字' },
      { name: 'Sonnet 4.6', excerpt: '开题的关键是讲清研究空白…', words: '1,655 字' },
      { name: 'DeepSeek V4 Pro', excerpt: '建议按问题—方法—验证三段…', words: '2,108 字' },
    ],
    stage2: '阶段二 · 交叉验证',
    stage2Note: '已读取 5,105 字',
  },

  /** 交叉验证日志里依次浮出的风险点，一遍就停 */
  flags: [
    '漏掉 2 个关键研究空白',
    '方法设计不够完整',
    '发现 1 篇不存在的引用',
    '2 个创新点与已有研究重合',
  ],

  result: {
    label: 'Lucimix 暴力模式',
    count: '4',
    heading: '个风险，在提交前被发现',
    checks: [
      '补充遗漏的研究方向',
      '三模型交叉补全研究方法',
      '标记无法验证的文献引用',
      '识别创新点的重复风险',
    ],
    note: '多个模型独立分析，再互相核查分歧与遗漏。',
  },

  uses: [
    '行业研究 · 核对数据与来源',
    '财务分析 · 找出假设和口径分歧',
    '法律合规 · 检查遗漏和风险点',
  ],
}

export const models = {
  title: '一个入口，连接多个领先模型',
  lead: '统一接入国内外主流大模型，针对不同场景选择更合适的能力，无需在多个平台之间来回切换。',
  items: [
    { name: 'Claude Opus 5', icon: '/logos/models/claude.png' },
    { name: 'Claude Sonnet 5', icon: '/logos/models/claude.png' },
    { name: 'DeepSeek V4 Flash', icon: '/logos/models/deepseek.png' },
    { name: 'DeepSeek V4 Pro', icon: '/logos/models/deepseek.png' },
    { name: 'GLM 5.1', icon: '/logos/models/glm.png' },
    { name: 'GLM 5.2', icon: '/logos/models/glm.png' },
    { name: 'GPT 5.6 Sol', icon: '/logos/models/gpt.png' },
    { name: 'GPT 5.6 Terra', icon: '/logos/models/gpt.png' },
    { name: 'Kimi K2.6', icon: '/logos/models/kimi.png' },
    { name: 'Kimi K3', icon: '/logos/models/kimi.png' },
    { name: 'Qwen 3.5', icon: '/logos/models/qwen.png' },
  ],
}

export const ecosystem = {
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
}

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
}

/**
 * 页脚四栏。只收录站内真实存在的去处 —— 锚点、登录、企业版、协议页，
 * 不为了凑满一栏去编「帮助中心」「客户端下载」这类还没有的东西。
 */
export const footer = {
  brand: 'lucimix',
  tagline: '一个真正替你工作的 AI 助手。',
  company: '北京光忽智能科技有限公司',
  /** TODO: 向用户取实际备案号。品牌页上的 京ICP备2025000000号 是占位。 */
  icp: '京ICP备2025000000号',
  columns: [
    { title: '产品', links: nav.links },
    {
      title: '开始使用',
      links: [
        { label: '免费使用', href: LOGIN_URL },
        { label: '登录', href: LOGIN_URL },
        { label: '企业版', href: ENTERPRISE_URL },
      ],
    },
    {
      /** TODO: 协议页上线前是 # 占位，上线后换成真实地址。 */
      title: '条款与政策',
      links: [
        { label: '服务协议', href: '#' },
        { label: '隐私政策', href: '#' },
      ],
    },
  ],
  disclaimer: 'AI 生成内容请注意核实。',
}
