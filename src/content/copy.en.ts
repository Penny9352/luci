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
import { LOGIN_URL, ENTERPRISE_URL } from './urls'

export const nav = {
  brand: 'lucimix',
  links: [
    { label: 'Workspace', href: '#workspace' },
    { label: "Who it's for", href: '#audience' },
    { label: 'Case study', href: '#case' },
    { label: 'Models', href: '#models' },
    { label: 'Apps', href: '#ecosystem' },
    { label: 'Lumens', href: '#start' },
  ],
  login: 'Log in',
  cta: 'Start free',
  /** Screen-reader and switcher strings; never rendered as visible copy */
  navLabel: 'Site navigation',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  langSwitch: '切换到中文',
  tablistLabel: 'Lucimix working modes',
}

export const hero = {
  titleBrand: 'Lucimix',
  titleLead: 'An AI assistant that ',
  titleAccent: 'actually works',
  titleTail: ' for you',
  subtitleLead:
    'Analyse data, write documents, run research, track investments — Lucimix keeps working on your tasks and delivers the results to',
  subtitleTail: '. One account covers every way you use AI.',
  ctaPrimary: 'Start free',
  ctaSecondary: 'See how it works',
  simulationAlt:
    'Product demo: the user asks for scattered notes to be turned into a weekly report. Smart Mode picks a model, answers, and files the result in the Library. The composer offers three modes — Smart Mode picks one model, Cross-Check Mode has several models answer independently and flags where they disagree, and Custom lets you choose. The same account also binds to WeChat, Feishu and WeCom, so you can use it straight from your chat app.',
}

/** Opening demo: one ordinary exchange, no cross-check, nothing unshipped. */
export const simulation = {
  user: 'Turn these scattered notes into a weekly report. Keep it formal, under 500 words, and do not invent data I did not give you.',
  modeLabel: 'Smart Mode',
  modeNote: 'chosen for you',
  model: 'GLM 5.1',
  blocks: [
    {
      heading: 'Shipped this week',
      body: 'Settlement path rolled out to 30%. Rollback time cut from 12 minutes to 90 seconds.',
    },
    {
      heading: 'Next week',
      body: 'Widen the rollout to 60% and land the first pass of the reconciliation script.',
    },
  ],
  file: { name: 'Weekly-report-W34.md', note: 'saved to Library' },
  placeholder: 'What can I help you with?',
  modes: [
    { name: 'Smart Mode', desc: 'Picks the single model best suited to your request', current: true, info: false },
    { name: 'Cross-Check Mode', desc: 'Runs several models at once and returns a combined answer', current: false, info: true },
    { name: 'Custom models', desc: 'Currently: Smart Mode', current: false, info: false },
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
  label: 'Lucimix Workspace',
  title: 'One workspace. Work finished.',
  lead: 'From everyday questions to serious research, Lucimix carries the work through to something you can use.',

  side: {
    brand: 'Lucimix',
    newTask: 'New task',
    workLabel: 'Work',
    recentLabel: 'Recent',
    recent: ['Competitor scan', 'Product plan notes', 'Sector research'],
    settings: 'Settings',
  },
  topbar: 'New task',

  tabs: [
    {
      id: 'verify',
      tab: 'Cross-Check',
      badge: 'Cross-Check · 3 models',
      title: 'An AI you can lean on',
      desc: 'Three models answer independently, cross-check each other, and flag every disagreement before giving you a conclusion.',
      usecase: 'Turn on Cross-Check Mode for sector research, academic writing, legal and compliance work, and financial analysis.',
    },
    {
      id: 'daily',
      tab: 'Everyday',
      badge: 'Model chosen for you',
      title: 'Everyday tasks',
      /** Mirrors copy.zh.ts — see the note there about PPT / file handling. */
      desc: 'Everyday questions, weekly reports, slide decks, tidying files, digging up material. Say what you need and take the result.',
      usecase: '',
    },
    {
      id: 'schedule',
      tab: 'Scheduled',
      badge: 'Scheduled task',
      title: 'Set it once. It keeps running.',
      desc: 'Search, monitor and digest on a schedule. Results are generated and delivered on time, without you asking.',
      usecase: '',
    },
    {
      id: 'docs',
      tab: 'Documents',
      badge: 'Documents',
      title: 'Files that stay useful',
      desc: 'Uploads and AI output in one place, searchable, previewable, and reusable across conversations.',
      usecase: 'Start a new conversation and pick up the material and results you already have.',
    },
  ],

  verify: {
    src: '/shots/cross-check-panel.png',
    alt: 'Lucimix cross-check interface: stage one shows GLM 5.1, Sonnet 4.6 and DeepSeek V4 Pro drafting in parallel; stage two shows the cross-check log listing the claim all three agreed on, the cost conclusion they disagreed on, and the reason for the disagreement.',
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

export const audience = {
  label: "Who it's for",
  title: 'Who hands their hard questions to Lucimix?',
  lead: 'If your work contains judgements that cannot afford to be wrong, Cross-Check Mode earns its keep.',
  roles: [
    { name: 'Researchers', what: 'Source checking, proposal review, cross-checked literature surveys' },
    { name: 'Product managers', what: 'Competitor watch, requirement analysis, weighing options' },
    { name: 'Investors', what: 'Filings analysis, sector research, cross-checked figures' },
    { name: 'Writers and creators', what: 'Fact checking, data verification, citation accuracy' },
    { name: 'Managers', what: 'Proposal review, risk spotting, decisions seen from several angles' },
  ],
}

export const caseStudy = {
  label: 'Case study',
  title: 'What one AI missed,\nthree AIs found.',
  lead: 'Not more words. Fewer mistakes shipped.',

  doc: {
    kind: 'Graduate research proposal',
    running: 'Checking',
    done: 'Check complete',
    title: '“A Multimodal LLM System for Classroom Emotion Feedback”',
  },

  session: {
    prompt:
      'Draft a research proposal outline: “A Multimodal LLM System for Classroom Emotion Feedback”',
    steps: ['Drafting in parallel', 'Cross-check', 'Composing answer'],
    stage1: 'Stage one · 3 models drafting in parallel',
    stage1Count: '3/3',
    models: [
      { name: 'GLM 5.1', excerpt: 'Start by bounding the problem: multimodal…', words: '1,342 words' },
      { name: 'Sonnet 4.6', excerpt: 'A proposal lives or dies on the research gap…', words: '1,655 words' },
      { name: 'DeepSeek V4 Pro', excerpt: 'Structure it as problem — method — validation…', words: '2,108 words' },
    ],
    stage2: 'Stage two · cross-check',
    stage2Note: '5,105 words read',
  },

  flags: [
    'Two key research gaps missing',
    'Method design underspecified',
    'One citation does not exist',
    'Two contributions overlap existing work',
  ],

  result: {
    label: 'Lucimix Cross-Check Mode',
    count: '4',
    heading: 'risks caught before submission',
    checks: [
      'Filled in the missing research directions',
      'Three models completed the method section together',
      'Flagged the citation that could not be verified',
      'Spotted where the contributions repeat existing work',
    ],
    note: 'Several models analyse independently, then check each other for disagreements and gaps.',
  },

  uses: [
    'Sector research · verify data and sources',
    'Financial analysis · surface assumptions and mismatches',
    'Legal and compliance · check for gaps and risks',
  ],
}

export const models = {
  title: 'One door, many leading models',
  lead: 'Leading models from China and abroad in one place, so you can pick what suits the task instead of switching between platforms.',
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
  lead: 'Sign in with a phone number. If you have no account, one is created for you.',
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

export const footer = {
  brand: 'lucimix',
  tagline: 'An AI assistant that actually works for you.',
  /** Registered entity stays as filed. Swap if there is a registered English name. */
  company: '北京光忽智能科技有限公司',
  /** Same legal notice as the Chinese page; entity name kept as registered. */
  copyright: 'Copyright © 香港超昂控股有限公司 All Rights Reserved.',
  columns: [
    { title: 'Product', links: nav.links },
    {
      title: 'Get started',
      links: [
        { label: 'Start free', href: LOGIN_URL },
        { label: 'Log in', href: LOGIN_URL },
        { label: 'Enterprise', href: ENTERPRISE_URL },
      ],
    },
    {
      title: 'Terms and policies',
      links: [
        { label: 'Terms of service', href: '#' },
        { label: 'Privacy policy', href: '#' },
      ],
    },
  ],
  disclaimer: 'AI-generated content. Please verify before relying on it.',
}
