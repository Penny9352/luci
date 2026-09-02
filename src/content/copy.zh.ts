/**
 * 全站对外文案，集中一处。
 *
 * 合规红线（原 docs/superpowers/specs/2026-08-19-c端官网首页-design.md §9）：
 *
 *  【2026-08-27 用户决定解除】
 *   - 「暴力模式」可作为 Tab 标签与正文主用词直接出现，不再要求技术代称
 *     「多模型协同推理引擎」先行出现一次。
 *
 *  【2026-09-02 已作废】
 *   - 曾允许首屏对话区写「做 PPT」「整理文件」（workspace.tabs[1].desc）。
 *     该屏 2026-09-02 整屏替换为「自由模式」（自由切换 Claude / 豆包等模型），
 *     PPT / 整理文件措辞已不存在，此豁免随内容一起作废，不必再照顾。
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
  brand: '多模型AI平台',
  links: [
    { label: '多模型AI平台', href: '#top' },
    { label: '模型能力', href: '#models' },
    { label: '文件库', href: '#ws-docs' },
    { label: '定时任务', href: '#ws-schedule' },
    { label: '光点', href: '#start' },
  ],
  login: '登录',
  cta: '免费使用',
  /** 只给读屏器和语言切换器用，不出现在可见文案里 */
  navLabel: '页面导航',
  menuOpen: '打开菜单',
  menuClose: '关闭菜单',
  langSwitch: '切换到英文',
}

export const hero = {
  kicker: 'Lucimix · 多模型AI平台',
  /** 两行叠题：先给结论「AI 该不同」，落到「每次都用对」的具体主张 */
  titleLead: '问题不同，AI就该不同',
  titleMain: '每次提问，都用对AI',
  subtitle: '你想用的AI都在这里，让每个问题都有更合适的解法。',
  ctaPrimary: '免费开始使用',
  ctaSecondary: '看它怎么用',
}

/** 首屏模拟对话。演一轮普通对话（非交叉验证），不依赖任何未确认能力。 */
/**
 * 首屏工作台「自由模式」演示：不靠文字解释，靠 UI 自己讲故事。
 * 两步一镜到底 —— Claude 整理科普素材后，点开模型切换器，选中 DeepSeek
 * 续写成小红书图文，验证「自由切换、上下文不中断」这句承诺。内容取自
 * 真实产品截图，按画布空间做了压缩（DeepSeek 那份文案里的颜文字照原样保留）。
 */
export const simulation = {
  placeholder: '输入消息...',
  /** 模型切换器弹窗标题 —— 界面复刻，逐字照抄产品 */
  modelMenuLabel: '自定义模型',
  models: ['claude-opus-5', 'deepseek-v4-pro', 'glm-5.1', 'kimi-k2.6'],
  /** 控件底部步骤条最左侧那一格，给读者一句话说清这个案例在干什么 */
  task: {
    label: '任务',
    title: '创作一篇小红书科普文章「为什么人会做梦」',
  },
  turns: [
    {
      step: 'Step 1',
      displayName: 'Claude',
      model: 'claude-opus-5',
      user: '整理「为什么人会做梦」的科普资料',
      /** 底部步骤条这一格的标题 + 一句话说明 */
      stepTitle: '整理科普资料',
      stepDesc: '逻辑结构清晰，严谨少幻觉。',
      /** Claude 这一路的完整过程：边搜索边写、最后产出文件 —— 逐字取自真实产品截图，不再压缩 */
      narration: [
        { text: '我会为你整理"为什么人会做梦"的科普资料，先搜索最新的科学研究和权威解释。', tools: ['联网搜索'] },
        { text: '搜索到了一些基础信息，我再获取更详细的科学解释和理论。', tools: ['抓取网页', '联网搜索'] },
        { text: '继续搜集更多权威的科学解释和理论。', tools: ['联网搜索'] },
        { text: '现在整理成科普资料。', tools: ['写入文件'] },
      ],
      file: '为什么人会做梦_科普资料',
      summary: '已经为你整理好了一份完整的科普资料，涵盖了做梦的神经科学机制、主流理论、特殊现象和实用建议。',
      summaryIntro: '我从最新的科学研究中提取了核心信息，包括：',
      bullets: [
        { label: '生理机制', body: 'REM 睡眠期间大脑的特殊活动模式，以及不同脑区的协同工作' },
        { label: '五大主流理论', body: '记忆整合、情绪调节、威胁模拟、神经清理和创造力激发' },
        { label: '实用知识', body: '频繁做梦的原因、噩梦的触发因素、如何改善梦境质量' },
        { label: '常见误解澄清', body: '比如"不做梦才正常"、"做梦影响睡眠质量"等错误观念' },
      ],
      closing: '资料采用了深色配色和卡片式布局，方便阅读和理解。点击文件卡片即可下载查看，也可以用浏览器打开进行分享。',
      // 旧的压缩版字段 + DeepSeek 专用字段，Claude 这边保留空值只为类型对齐
      intro: '',
      hashtags: '',
      outro: '',
      tools: [] as string[],
      blocks: [] as { heading: string; body: string }[],
    },
    {
      step: 'Step 2',
      displayName: 'DeepSeek',
      model: 'deepseek-v4-pro',
      user: '基于刚才的资料，帮我写成一篇小红书文章，标题要有吸引力，正文轻松一点',
      stepTitle: '创作小红书笔记',
      stepDesc: '中文语感极佳，网感好，能写爆款。',
      narration: [] as { text: string; tools: string[] }[],
      file: '',
      summary: '',
      summaryIntro: '',
      bullets: [] as { label: string; body: string }[],
      closing: '',
      tools: [] as string[],
      /** 逐字取自真实产品导出的文案全文，不再压缩 */
      intro: '我根据刚才的科普资料，为你写一篇轻松有吸引力的小红书文案。',
      blocks: [
        {
          heading: '😴 你昨晚又做梦了？科学家说这可能是大脑在偷偷"排毒+排练"！',
          body: '姐妹们！有没有人和我一样，总觉得"做梦=没睡好"？醒来看见前任、考试没带笔、被狗追三条街……醒来一脸懵：我这是睡了个啥？🤯 但最近查了资料才发现，原来是我一直误会了梦！',
        },
        {
          heading: '1️⃣ 做梦不是坏事，是大脑在"上夜班" 🌙',
          body: '科学家的说法是，梦主要发生在"快速眼动睡眠（REM）"阶段。这时候你的大脑活跃度跟醒着差不多，但身体却"瘫"着——怕你把梦里的动作真做出来摔下床😂 所以不是做梦影响睡眠，做梦本身就是好睡眠的一部分！',
        },
        {
          heading: '2️⃣ 大脑到底在梦里干嘛？',
          body: '简单说，它在干三份工：🧹 当"清道夫"——白天塞进来的一堆信息，重要的归档、没用的删除，顺便把坏情绪"消化"掉。🎭 当"导演"——把记忆碎片、情绪、身体感受乱炖成一出戏。所以你才会梦见离谱剧情，因为负责逻辑的"前额叶"下班了！🛡️ 当"演习教官"——有个理论说，噩梦其实是大脑在安全环境里"彩排"危险，帮你提前练好逃生反应。',
        },
        {
          heading: '3️⃣ 所以噩梦不是敌人？',
          body: '是的！研究发现那些偶尔做"可怕梦"的人，情绪调节能力反而更强🧘‍♀️ 梦里的恐惧就像一次"免费的心理脱敏"，大脑在悄悄给你打"情绪疫苗"。（但注意⚠️ 如果噩梦频繁到影响生活，还是要去睡眠科看看！）',
        },
        {
          heading: '4️⃣ 那为什么我老觉得"一晚上都在做梦"？',
          body: '多半是这几种情况：熬夜后"REM 反弹"——欠的觉，大脑会加倍补梦给你；老在梦境里醒来，所以记得特别清楚；最近压力大、焦虑，梦就特别"戏多"。',
        },
        {
          heading: '💡 想睡得更香、梦更甜？试试这几招：',
          body: '✅ 固定作息，别当"作息反骨仔" ✅ 睡前少刷手机、少碰咖啡因 ✅ 卧室凉快、黑暗、安静 ✅ 醒来先记梦，说不定你就是下一个门捷列夫（他是梦到元素周期表的🤭）',
        },
        {
          heading: '最后一句掏心窝子的话：',
          body: '梦不是睡眠的"副作用"，它是大脑送给你的免费心理师 + 记忆整理师 + 逃生演练官。今晚的梦，就放心大胆地做吧～🌙✨',
        },
      ],
      hashtags: '#睡眠知识 #做梦 #心理学冷知识 #健康科普 #我的睡眠质量 #认知升级 #涨知识 #女生必看',
      outro: '需要我调整语气、长度，或者改成更"标题党"一点的版本吗？也可以直接帮你导出成文本文件。',
    },
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
  /** 侧栏是外框的一部分，四屏共用；current 由当前屏决定 */
  side: {
    brand: 'Lucimix',
    newTask: '新建任务',
    workLabel: '工作',
    recentLabel: '最近',
    recent: ['竞品调研', '产品方案整理', '行业资料分析'],
    settings: '设置',
    /** 「自由模式」这一屏按真实产品左侧导航改 —— 三个入口，不再是工作列表 */
    navAssistant: '个人助手',
    navLibrary: '文件库',
    navSchedule: '定时任务',
    /** 「文档管理」这一屏的真实导航多带一个光点余额入口 */
    lumens: '光点',
  },
  topbar: '新任务',

  /** 不再是可切换的 Tab，是四个独立的整幅屏，顺序即出场顺序 */
  tabs: [
    {
      id: 'daily',
      tab: '自由模式',
      badge: '自定义模型',
      title: '随时，用更合适的 AI',
      titleAccent: '',
      desc: '一个任务，也可以交给不同 AI。自由切换，上下文不中断。',
      usecase: '',
      checklist: [] as string[],
      topbar: '',
    },
    {
      id: 'verify',
      tab: '暴力模式',
      badge: '暴力模式 · 3 个模型',
      /** 逐字取自参考图：两行叠题，第二行换色 */
      title: '多个 AI，',
      titleAccent: '一起想',
      desc: '',
      usecase: '',
      checklist: [
        '多视角，分析更全面',
        '减少 AI 编造内容，更准确',
        '推理路径对比，不会一条道错到底',
        '标注模型分歧，提示验证，减少返工',
      ],
      /** 案例区顶栏跟其它三屏不一样，逐字照参考图 */
      topbar: '示例任务',
    },
    {
      id: 'docs',
      tab: '文件库',
      badge: '文件库',
      title: '文件成为可持续复用的 AI 资产',
      titleAccent: '',
      desc: '统一管理上传文件与 AI 产出，支持搜索、预览和跨对话引用。',
      usecase: '',
      checklist: ['支持多种文件格式', '自动解析与索引', '跨对话引用'],
      topbar: '文件库',
    },
    {
      id: 'schedule',
      tab: '定时任务',
      badge: '定时任务',
      title: '设定一次，重要信息按时送达',
      titleAccent: '',
      desc: '把搜索、监控、整理交给定时任务，结果自动生成并推送到你的工作入口。',
      usecase: '每天打开就有现成的市场动态、行业信号和决策材料。',
      checklist: [] as string[],
      topbar: '',
    },
  ],

  /**
   * 暴力模式面板：一个涨价决策案例，逐字取自参考图。原来这一屏是真实
   * 产品截图；现在换成本站按案例内容手绘的界面（跟自由模式那屏是
   * 同一套做法），所以不再是「不能改一个字」的逐字复刻，但内容仍然
   * 一比一对着参考图来，没有自己发挥。只上中文站——英文站的 src/alt
   * 两个字段还留着，继续用原来的截图。
   */
  verify: {
    src: '/shots/cross-check-panel.png',
    alt: 'Lucimix 交叉验证界面：阶段一 GLM 5.1、Sonnet 4.6、DeepSeek V4 Pro 三个模型并行作答，阶段二交叉验证日志写明 3/3 一致的主张、成本结论存在的分歧，以及分歧根因。',
    task: {
      prompt: '过去一年 XXX 卸妆油销售数据如下。\n原材料价格上涨 10%，产品价格上涨多少最佳？',
      attachment: '过去 12 个月销售明细.xlsx',
    },
    stage1: {
      label: '阶段一：3 个模型独立作答',
      note: '独立检索与生成',
      models: [
        {
          name: 'Claude Opus 5',
          badge: 'AI',
          accent: 'orange',
          angle: '成本 / 毛利视角',
          intro: '',
          bullets: ['成本上涨 10%，直接影响毛利率', '建议价格上调 8%~12%', '可通过优化包装降低部分成本'],
          range: '8% ~ 12%',
          confidence: '高',
        },
        {
          name: 'GPT-5.6',
          badge: 'spark',
          accent: 'green',
          angle: '价格 / 销量视角',
          intro: '价格敏感度分析显示：',
          bullets: ['涨价 10% 对销量影响可控', '建议价格上调 9%~14%', '需配合促销活动缓冲影响'],
          range: '9% ~ 14%',
          confidence: '高',
        },
        {
          name: 'GLM 4.2',
          badge: 'Z',
          accent: 'blue',
          angle: '渠道 / 用户视角',
          intro: '',
          bullets: ['竞品价格普遍上调 8%~12%', '用户对品质接受度较高', '建议价格上调 10%~15%'],
          range: '10% ~ 15%',
          confidence: '中高',
        },
      ],
    },
    stage2: {
      label: '阶段二：交叉验证与分歧标注',
      agreeLabel: '一致观点',
      agree: ['成本上涨 10% 是主要影响因素', '价格上调区间集中在 8%~15%', '可通过营销 / 包装优化降低影响'],
      disagreeLabel: '存在分歧',
      disagree: [
        '最优涨价区间：8%~12% vs 9%~14% vs 10%~15%',
        '是否需要强力促销活动：观点不一致',
        '用户对价格敏感度评估：差异较大',
      ],
    },
    stage3: {
      label: '阶段三：综合结论',
      text: '综合 3 个模型观点，建议价格上调 10% ~ 12% 最优，兼顾利润与销量。建议配合会员优惠活动，平滑用户感知风险，提升涨价成功率。',
      cta: '查看完整结论',
    },
    footnote: '* 结果由多个模型输出，仅供参考，请结合自身情况判断。',
  },

  /** 定时任务面板 */
  schedule: {
    tasks: [
      { when: '每天 15:30', name: '今日市场复盘', desc: '复盘今日 A 股 / 港股板块表现 · 汽车 / 新能源 · 政策资金面', state: '运行中', running: true },
      { when: '每天 08:00', name: '竞品动态监控', desc: '官网 · 新闻 · 产品更新', state: '运行中', running: true },
      { when: '每周五 17:00', name: '本周决策备忘', desc: '项目讨论 · 关键判断 · 风险', state: '已计划', running: false },
    ],
    logLabel: '最近一次执行',
    log: '15:30 已完成今日市场复盘，已整理主要指数与汽车 / 新能源板块变化。结果已推送到微信。',
  },

  /** 文档管理面板 */
  docs: {
    search: '搜索文件名、内容，或直接问文档里的问题',
    features: ['支持多种文件格式', '自动解析与索引', '跨对话引用'],
    folders: ['全部文件', '文档', '表格', '演示文稿', '图片', '其他'],
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
 * 多端可用——独立一屏，插在「文档管理」和「定时任务」之间，只上中文站
 * （见 App.tsx 的 insertAfterDocs）。跟 Ecosystem 里那个小的 .reach
 * 换绑卡片不是一回事：那个只列了三个聊天软件、且只在英文站还在用，
 * 字段名不能公用，所以这里另起一个导出，互不影响。
 */
export const everywhere = {
  title: 'Lucimix，在哪儿都能用。',
  leadLine1: '从 Web 到微信、企微、飞书，再到 API。',
  leadLine2: '换个入口，也能接着用。',
  channels: [
    { icon: 'web', name: 'Web', line1: '深度工作', line2: '工作、研究、复杂任务' },
    { icon: 'wechat', name: '微信', line1: '随手提问', line2: '想到什么，随手问一句' },
    { icon: 'team', name: '企微 / 飞书', line1: '融入工作', line2: '在工作场景中直接使用' },
    { icon: 'api', name: 'API', line1: '接入产品', line2: 'OpenAI 兼容 API，接入你的产品' },
  ],
}

export const models = {
  title: '更多 AI，更好的用法',
  /** 中文站已去掉这句副标题（Models.tsx 按 LANG 不渲染），留空只为类型对齐 */
  lead: '',
  /** 三种工作模式卡片 —— icon 字段对应 Models.tsx 里的图标查表 */
  modes: [
    {
      icon: 'free',
      label: '自由模式',
      title: '我来选',
      bullets: [
        { icon: 'grid', text: '自由选择模型' },
        { icon: 'swap', text: '随时切换' },
        { icon: 'link', text: '上下文不断' },
      ],
    },
    {
      icon: 'smart',
      label: '智能模式',
      title: 'AI 帮我选',
      bullets: [
        { icon: 'target', text: '自动匹配模型' },
        { icon: 'bolt', text: '一键提问' },
        { icon: 'check', text: '无需纠结' },
      ],
    },
    {
      icon: 'verify',
      label: '暴力模式',
      title: '让他们一起上',
      bullets: [
        { icon: 'users', text: '多模型共同回答' },
        { icon: 'shield', text: '交叉验证' },
        { icon: 'pie', text: '聚合不同思路' },
      ],
    },
  ],
  matrixLabel: '汇集国内外领先 AI 模型',
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
  brand: '多模型AI平台',
  tagline: '多模型AI平台',
  company: '',
  /**
   * 页脚底栏的法律声明。原来这里是 ICP 备案号占位，2026-08-28 用户指定
   * 改为版权声明 —— 字段名跟着改，留着 icp 这个名字会误导后来的人。
   */
  copyright: 'Copyright © 香港超昂控股有限公司 All Rights Reserved.',
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
