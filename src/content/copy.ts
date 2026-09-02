/**
 * 语言分发。
 *
 * 中英文各有真实 URL（`/` 与 `/en/`），语言在页面加载时就定死，
 * 运行中不会变 —— 所以这里在模块加载时选一次词典再原样导出，
 * 组件继续 `import { hero } from '../content/copy'`，一行都不用改。
 *
 * 换语言 = 换页面，不是切状态。切换器就是一个指向另一份 URL 的链接。
 */
import * as zh from './copy.zh'
import * as en from './copy.en'

export { LOGIN_URL, ENTERPRISE_URL } from './urls'

/** 构建期没有 location，默认中文 */
export const LANG: 'zh' | 'en' =
  typeof location !== 'undefined' && location.pathname.startsWith('/en') ? 'en' : 'zh'

/** 另一种语言的入口，供导航里的切换器用 */
export const ALT_LANG = LANG === 'en' ? { code: 'zh', label: '中文', href: '/' } : { code: 'en', label: 'EN', href: '/en/' }

const dict = LANG === 'en' ? en : zh

export const { nav, hero, simulation, reach, workspace, models, ecosystem, start, footer } = dict
