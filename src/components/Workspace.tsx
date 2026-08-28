import { useRef, useState, type KeyboardEvent } from 'react'
import { workspace as w, nav } from '../content/copy'
import { DailyPanel } from './panels/DailyPanel'
import { SchedulePanel } from './panels/SchedulePanel'
import { DocsPanel } from './panels/DocsPanel'
import { VerifyPanel } from './panels/VerifyPanel'
import { IconClock, IconConverge, IconFolder, IconPlus, IconSpark } from './ui/Icon'

const TAB_ICONS = [IconConverge, IconSpark, IconClock, IconFolder]

/**
 * 首屏工作台。
 *
 * 四个 Tab 共用同一个产品窗口外框 —— 切 Tab 只换画布内容，外框、侧栏、
 * 画布尺寸都不动。外框跟着内容变，整页会在每次点击时抖一下。
 *
 * 画布高度写死：四块面板内容长短差很多，让窗口自己长高等于把下方内容
 * 推着走。内容超出就在画布内部滚，不外溢。
 */
export function Workspace() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const t = w.tabs[active]
  const Badge = TAB_ICONS[active]

  /** 方向键在 tablist 内移动焦点并切换 —— 原生 tab 组件的标准行为 */
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = w.tabs.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="ws" id="workspace">
      <div className="ws__inner page">
        <header className="section-head">
          <p className="section__label">{w.label}</p>
          <h2>{w.title}</h2>
          <p className="lede">{w.lead}</p>
        </header>

        <div className="ws__tabs" role="tablist" aria-label={nav.tablistLabel}>
          {w.tabs.map((tab, i) => {
            const Ico = TAB_ICONS[i]
            const on = i === active
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`ws-tab-${tab.id}`}
                aria-controls={`ws-panel-${tab.id}`}
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                className={['ws__tab', on && 'is-on'].filter(Boolean).join(' ')}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                <Ico size={16} />
                {tab.tab}
              </button>
            )
          })}
        </div>

        <div className="ws__stage">
          <div className="ws__copy" key={t.id}>
            {/* 段头已经是 h2，这里降一级，标题层级才不会平掉 */}
            <h3>{t.title}</h3>
            <p className="ws__desc">{t.desc}</p>
            {t.usecase && <p className="ws__usecase">{t.usecase}</p>}
          </div>

          <div className="ws__device panel-dark">
            <aside className="ws__side" aria-hidden="true">
              <p className="ws__brand">
                <img src="/logo.svg" alt="" width={13} height={20} />
                {w.side.brand}
              </p>
              <p className="ws__new">
                <IconPlus size={13} />
                {w.side.newTask}
              </p>

              <p className="ws__side-label">{w.side.workLabel}</p>
              {w.tabs.map((tab, i) => (
                <p
                  key={tab.id}
                  className={['ws__side-item', i === active && 'is-on'].filter(Boolean).join(' ')}
                >
                  {tab.tab}
                </p>
              ))}

              <p className="ws__side-label">{w.side.recentLabel}</p>
              {w.side.recent.map((r) => (
                <p className="ws__side-item" key={r}>
                  {r}
                </p>
              ))}
            </aside>

            <div className="ws__main">
              <div className="ws__topbar" aria-hidden="true">
                <span>{w.topbar}</span>
                <span className="ws__badge">
                  <Badge size={13} />
                  {t.badge}
                </span>
              </div>

              <div
                className="ws__canvas"
                key={t.id}
                role="tabpanel"
                id={`ws-panel-${t.id}`}
                aria-labelledby={`ws-tab-${t.id}`}
                tabIndex={0}
              >
                {t.id === 'verify' && <VerifyPanel />}
                {t.id === 'daily' && <DailyPanel active={active === 1} />}
                {t.id === 'schedule' && <SchedulePanel />}
                {t.id === 'docs' && <DocsPanel />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
