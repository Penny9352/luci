/**
 * English copy. Mirrors the shape of copy.zh.ts exactly — if you add a key
 * there, add it here or the build breaks.
 *
 * ── GLOSSARY (pending sign-off) ────────────────────────────────────────
 * These are product-surface names. If the product ships an English UI with
 * different wording, that wins and these must follow it — a visitor who
 * reads "Cross-Check Mode" here and finds 暴力模式 in the app is lost.
 *
 *   暴力模式    → Cross-Check Mode      (not "Force Mode": the whole English
 *                                        line is reliability, so say it)
 *   智能模式    → Smart Mode
 *   交叉验证    → cross-check
 *   并行作答    → Drafting in parallel
 *   开始输出    → Composing answer
 *   光点        → Lumens                (glossed as "credits" on first use)
 *   工作台      → Workspace
 *   日常任务    → Everyday Tasks        (not "Daily": reads as once-per-day)
 *   定时任务    → Scheduled Tasks
 *   文档管理    → Documents
 *   文件库      → Library
 *   生态应用    → Apps
 *   适用人群    → Who it's for
 *
 * ── OPEN ITEM ─────────────────────────────────────────────────────────
 * The Cross-Check tab shows a real product screenshot, and that screenshot
 * is in Chinese. The HTML replicas around it are translated here. If the
 * product has no English UI, either an English screenshot is needed or this
 * page should say plainly that the app runs in Chinese.
 */
export const nav = {
  brand: 'lucimix',
  links: [
    { label: 'Workspace', href: '#workspace' },
    { label: 'Models', href: '#models' },
    { label: 'Apps', href: '#ecosystem' },
    { label: 'Lumens', href: '#start' },
  ],
  cta: 'Log in',
  /** Screen-reader strings; never rendered as visible copy */
  navLabel: 'Site navigation',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
}

export const hero = {
  kicker: 'Lucimix · Multi-Model AI Platform',
  /** No lead line in English — the Chinese copy stacks two lines, this one doesn't */
  titleLead: '',
  titleMain: 'One place. The right AI.',
  subtitle:
    "Access the world's leading AI models in one place. Choose your model, let Lucimix pick the best one, or combine multiple models for harder problems.",
  ctaPrimary: 'Start free',
  ctaSecondary: 'See how it works',
}

/** Opening demo: one ordinary exchange, no cross-check, nothing unshipped. */
/** Mirrors copy.zh.ts — a two-turn, UI-tells-its-own-story demo: Claude drafts
 *  material, then the model switcher opens and DeepSeek picks it up to write
 *  a social post. Content is trimmed from real product screenshots to fit the
 *  canvas; the emoji in DeepSeek's copy are kept as-is (matches its house style). */
export const simulation = {
  placeholder: 'Type a message...',
  /** Model-switcher popup title — UI replica, matches the product verbatim */
  modelMenuLabel: 'Custom models',
  models: ['claude-opus-5', 'deepseek-v4-pro', 'glm-5.1', 'kimi-k2.6'],
  // zh-only for now: the bottom device caption is a richer 3-segment step
  // bar there (see Workspace.tsx, gated on LANG === 'zh'). English keeps the
  // simple arrow caption, but the field lives here too for type parity.
  task: {
    label: 'Task',
    title: 'Research "why we dream" and turn it into a social post',
  },
  turns: [
    {
      step: 'Step 1',
      displayName: 'Claude',
      model: 'claude-opus-5',
      user: 'Put together material on why we dream',
      stepTitle: 'Research the material',
      stepDesc: 'Searches and writes as it goes, producing a reusable file.',
      tools: ['Web search', 'Write file'],
      // zh-only: the full multi-step narration + file card + bullets. Kept
      // empty here so the English demo stays the compact two-block version.
      narration: [] as { text: string; tools: string[] }[],
      file: '',
      summary: '',
      summaryIntro: '',
      bullets: [] as { label: string; body: string }[],
      closing: '',
      intro: '',
      hashtags: '',
      outro: '',
      blocks: [
        { heading: 'The mechanism', body: 'Brain activity nears waking levels during REM sleep, while the body stays briefly paralyzed.' },
        { heading: 'Five leading theories', body: 'Memory consolidation, emotional regulation, threat rehearsal, neural clean-up, and creativity.' },
      ],
    },
    {
      step: 'Step 2',
      displayName: 'DeepSeek',
      model: 'deepseek-v4-pro',
      user: 'Turn this into a social post — catchy title, keep the body light',
      stepTitle: 'Write the social post',
      stepDesc: 'Picks up the material directly — no context lost.',
      tools: [] as string[],
      narration: [] as { text: string; tools: string[] }[],
      file: '',
      summary: '',
      summaryIntro: '',
      bullets: [] as { label: string; body: string }[],
      closing: '',
      intro: '',
      hashtags: '',
      outro: '',
      blocks: [
        {
          heading: '🥱 Dreamed again last night? Turns out your brain was running "detox + rehearsal" behind your back',
          body: "Ex showed up, forgot your pen at the exam, chased by three dogs down the block... woke up like, what even was that? Turns out I had dreaming all wrong.",
        },
        {
          heading: '1️⃣ Dreaming isn\'t bad — it\'s your brain on the night shift 🌙',
          body: 'Scientists say it mostly happens in REM sleep, when your brain is nearly as active as when you\'re awake — but your body stays "paralyzed", so you don\'t act it out and fall off the bed 😂',
        },
      ],
    },
  ],
}

export const reach = {
  title: 'Not only on the web',
  lead: 'Scan once to connect, then talk to it inside your chat app. Files sync back to the web workspace on their own.',
  channels: [
    { name: 'WeChat', action: 'Connect', logo: '/logos/wechat.png' },
    { name: 'Feishu', action: 'Connect', logo: '/logos/feishu.png' },
    { name: 'WeCom', action: 'Connect', logo: '/logos/wecom.png' },
  ],
  footnote: 'Scheduled task results land here too.',
}

export const workspace = {
  side: {
    brand: 'Lucimix',
    newTask: 'New task',
    workLabel: 'Work',
    recentLabel: 'Recent',
    recent: ['Competitor scan', 'Product plan notes', 'Sector research'],
    settings: 'Settings',
    navAssistant: 'Assistant',
    navLibrary: 'Library',
    navSchedule: 'Scheduled',
    // zh-only: the Documents screen's sidebar shows a Lumens balance entry
    // there. Kept here only for type parity.
    lumens: 'Lumens',
  },
  topbar: 'New task',

  /** No longer switchable tabs — four standalone full-screen sections, in display order */
  tabs: [
    {
      id: 'daily',
      tab: 'Free Mode',
      badge: 'Custom models',
      title: 'Always the right AI for the job',
      titleAccent: '',
      desc: 'Hand one task to different AIs. Switch freely — the context never breaks.',
      usecase: '',
      checklist: [] as string[],
      topbar: '',
    },
    {
      id: 'verify',
      tab: 'Cross-Check',
      badge: 'Cross-Check · 3 models',
      title: 'An AI you can lean on',
      // zh-only: this screen's left copy switches to a two-line title +
      // checklist there. Kept empty here for type parity — English keeps
      // the original title/desc/usecase paragraph layout.
      titleAccent: '',
      desc: 'Three models answer independently, cross-check each other, and flag every disagreement before giving you a conclusion.',
      usecase: 'Turn on Cross-Check Mode for sector research, academic writing, legal and compliance work, and financial analysis.',
      checklist: [] as string[],
      topbar: '',
    },
    {
      id: 'schedule',
      tab: 'Scheduled',
      badge: 'Scheduled task',
      title: 'Set it once. It keeps running.',
      titleAccent: '',
      desc: 'Search, monitor and digest on a schedule. Results are generated and delivered on time, without you asking.',
      usecase: '',
      checklist: [] as string[],
      topbar: '',
    },
    {
      id: 'docs',
      tab: 'Documents',
      badge: 'Documents',
      title: 'Files that stay useful',
      titleAccent: '',
      desc: 'Uploads and AI output in one place, searchable, previewable, and reusable across conversations.',
      usecase: 'Start a new conversation and pick up the material and results you already have.',
      checklist: [] as string[],
      topbar: '',
    },
  ],

  // zh-only: the Cross-Check panel there is now a hand-built case-study UI
  // instead of a screenshot. These fields exist here only for type parity —
  // VerifyPanel.tsx still renders the src/alt screenshot for English.
  verify: {
    src: '/shots/cross-check-panel.png',
    alt: 'Lucimix cross-check interface: stage one shows GLM 5.1, Sonnet 4.6 and DeepSeek V4 Pro drafting in parallel; stage two shows the cross-check log listing the claim all three agreed on, the cost conclusion they disagreed on, and the reason for the disagreement.',
    task: { prompt: '', attachment: '' },
    stage1: {
      label: '',
      note: '',
      models: [] as {
        name: string
        badge: string
        accent: string
        angle: string
        intro: string
        bullets: string[]
        range: string
        confidence: string
      }[],
    },
    stage2: { label: '', agreeLabel: '', agree: [] as string[], disagreeLabel: '', disagree: [] as string[] },
    stage3: { label: '', text: '', cta: '' },
    footnote: '',
  },

  schedule: {
    tasks: [
      { when: 'Daily 08:00', name: 'Competitor watch', desc: 'Site · news · product updates', state: 'Running', running: true },
      { when: 'Daily 09:00', name: 'Sector briefing', desc: 'Policy · funding · technology', state: 'Running', running: true },
      { when: 'Fridays 17:00', name: 'Decisions this week', desc: 'Discussions · calls made · risks', state: 'Scheduled', running: false },
    ],
    logLabel: 'Last run',
    log: '08:00 — competitor watch finished. Four changes found; one rests on a single source and has been flagged for checking. Results pushed to WeChat.',
  },

  docs: {
    search: 'Search by name, by content, or just ask the documents a question',
    // zh-only: a short features list shown under the Documents screen's copy
    // there. Kept here only for type parity.
    features: ['Supports many file formats', 'Auto-parsed and indexed', 'Reusable across conversations'],
    folders: ['All documents', 'Product', 'Competitors', 'Meetings', 'Sector reports'],
    head: { name: 'Document', time: 'Updated', state: 'Status' },
    files: [
      { name: 'Lucimix product plan 2026', meta: 'Product · 36 pages', time: 'Today 14:26', state: 'Parsed' },
      { name: 'AI agent sector research', meta: 'Sector report · PDF', time: 'Yesterday', state: 'Parsed' },
      { name: 'August product discussion', meta: 'Meetings · doc', time: 'Aug 25', state: 'Parsed' },
      { name: 'Competitor feature matrix', meta: 'Competitors · sheet', time: 'Aug 23', state: 'Parsed' },
    ],
    tipStrong: 'Filing something is not the end of it.',
    tip: 'Everyday tasks, Cross-Check Mode and scheduled tasks can all draw on these documents, so Lucimix keeps working from the material you have built up.',
  },
}

export const models = {
  title: 'One door, many leading models',
  lead: 'Leading models from China and abroad in one place, so you can pick what suits the task instead of switching between platforms.',
  // zh-only for now: the redesigned section (3 mode cards above the
  // marquee) ships on the Chinese site first. Kept here only for type
  // parity — Models.tsx still renders the original title/lead + marquee
  // layout when LANG !== 'zh'.
  modes: [
    {
      icon: 'free',
      label: 'Free Mode',
      title: 'I pick',
      bullets: [
        { icon: 'grid', text: 'Choose any model' },
        { icon: 'swap', text: 'Switch anytime' },
        { icon: 'link', text: 'Context carries over' },
      ],
    },
    {
      icon: 'smart',
      label: 'Smart Mode',
      title: 'AI picks for me',
      bullets: [
        { icon: 'target', text: 'Auto-matched model' },
        { icon: 'bolt', text: 'One-tap ask' },
        { icon: 'check', text: 'No second-guessing' },
      ],
    },
    {
      icon: 'verify',
      label: 'Cross-Check',
      title: 'Let them all weigh in',
      bullets: [
        { icon: 'users', text: 'Multiple models answer' },
        { icon: 'shield', text: 'Cross-checked' },
        { icon: 'pie', text: 'Different angles combined' },
      ],
    },
  ],
  matrixLabel: 'Leading AI models, all in one place',
  items: [
    { name: 'Claude Opus 5', icon: '/logos/models/claude.webp' },
    { name: 'Claude Sonnet 5', icon: '/logos/models/claude.webp' },
    { name: 'DeepSeek V4 Flash', icon: '/logos/models/deepseek.webp' },
    { name: 'DeepSeek V4 Pro', icon: '/logos/models/deepseek.webp' },
    { name: 'GLM 5.1', icon: '/logos/models/glm.webp' },
    { name: 'GLM 5.2', icon: '/logos/models/glm.webp' },
    { name: 'GPT 5.6 Sol', icon: '/logos/models/gpt.webp' },
    { name: 'GPT 5.6 Terra', icon: '/logos/models/gpt.webp' },
    { name: 'Kimi K2.6', icon: '/logos/models/kimi.webp' },
    { name: 'Kimi K3', icon: '/logos/models/kimi.webp' },
    { name: 'Qwen 3.5', icon: '/logos/models/qwen.webp' },
  ],
}

export const ecosystem = {
  title: 'Apps on the platform, without separate sign-ups or separate bills',
  points: [
    { term: 'One account throughout', desc: 'No registering and logging in to each app on the platform.' },
    {
      term: 'One balance throughout',
      desc: 'Whichever app you use, it draws on the same Lumens. No topping up app by app.',
    },
  ],
  apps: [
    {
      name: 'Talking-head video',
      icon: '/logos/apps/koubo-video.png',
      what: 'Your AI presenter studio: topic, script, digital-host delivery, video generation and publishing copy, all in one pass, so an idea becomes a finished cut quickly.',
      note: 'Only your own likeness, or one you have permission to use.',
    },
    {
      name: 'Zi Wei Dou Shu',
      icon: '/logos/apps/ziwei-doushu.png',
      what: 'AI Zi Wei Dou Shu and BaZi analysis: chart casting, decade and annual readings, and chart interpretation, written so you can actually follow it.',
      note: 'For reference only. Not a basis for life decisions.',
    },
    {
      name: 'Portrait studio',
      icon: '/logos/apps/xiezhen.png',
      what: 'AI portrait generation: change outfit, style and setting in one step and get natural, polished, professional-grade shots.',
      note: 'Only your own likeness, or one you have permission to use.',
    },
    {
      name: 'Investment agent',
      icon: '/logos/apps/touzi-licai.png',
      what: 'Your AI review desk for investments: trade reviews, position tracking and return analysis, so account performance and changes are easier to see.',
      note: 'An organising tool. It does not give investment advice.',
    },
    {
      name: 'Deck builder',
      icon: '/logos/apps/ppt-zhushou.png',
      what: 'Give it a topic or upload your material, and it drafts the outline, writes the copy and lays out the pages into a clearly structured deck.',
      note: '',
    },
    {
      name: 'Document summariser',
      icon: '/logos/apps/wendang-zongjie.png',
      what: 'Fast summaries of long pieces, reports and meeting notes, with the key points, conclusions and action items pulled out for you.',
      note: '',
    },
  ],
}

export const start = {
  title: 'Start now',
  credits: {
    title: 'Lumens',
    body: 'The platform-wide unit of billing (credits). Top up by scanning with WeChat or Alipay. Your balance sits in the sidebar with the top-up button beside it.',
  },
  invite: {
    title: 'Invite a friend',
    body: 'Both of you get 1,000 Lumens.',
    amount: '1,000',
  },
  cta: 'Start free',
}

/** Same legal notice as the Chinese page; entity name kept as registered. */
export const footer = {
  contact: 'Contact us',
  copyright: 'Copyright © 香港超昂控股有限公司 All Rights Reserved.',
}
