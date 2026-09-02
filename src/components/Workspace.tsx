import { Fragment, type ReactNode, useState } from 'react'
import { LANG, simulation, workspace as w } from '../content/copy'
import { asset } from '../lib/asset'
import { Stage } from './Stage'
import { DailyPanel } from './panels/DailyPanel'
import { SchedulePanel } from './panels/SchedulePanel'
import { DocsCrossPanel, DocsPanel } from './panels/DocsPanel'
import { VerifyPanel } from './panels/VerifyPanel'
import { useInView } from '../hooks/useInView'
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconConverge,
  IconFolder,
  IconPlus,
  IconSpark,
  IconTarget,
} from './ui/Icon'

const BADGE_ICON: Record<string, typeof IconSpark> = {
  daily: IconSpark,
  verify: IconConverge,
  schedule: IconClock,
  docs: IconFolder,
}

type Tab = (typeof w.tabs)[number]

/**
 * 一屏 = 一个工作模式。
 *
 * 原来四个模式共用一个产品窗口外框、靠 Tab 切换画布内容；现在拆成四个
 * 独立的整幅屏，各自持有自己的外框 —— 代价是外框标记要重复四份，
 * 用这个子组件收住，也顺带把「日常任务」演示的启动时机从「Tab 是否
 * 被选中」换成「这一屏是否滚入视口」（useInView，滚出去即停，不空转）。
 */
function WorkspaceScreen({ tab, tint }: { tab: Tab; tint: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>('-15% 0px -15% 0px', false)
  const [dailyPhase, setDailyPhase] = useState<1 | 2>(1)
  const Badge = BADGE_ICON[tab.id]
  const isDaily = tab.id === 'daily'
  const navLumens = 'lumens' in w.side ? w.side.lumens : 'Lumens'

  return (
    <Stage id={isDaily ? 'workspace' : `ws-${tab.id}`} tint={tint}>
      <div className="ws__stage" ref={ref}>
        <div className="ws__copy">
          {/* 「日常任务」本身就是模式名，标题再写一遍纯属重复，跳过小标签 */}
          {tab.tab !== tab.title && (
            <p className="section__label">
              {tab.tab}
            </p>
          )}
          <h3 className={tab.id === 'verify' && LANG === 'zh' ? 'ws__heading--verify-zh' : undefined}>
            {tab.title}
            {tab.titleAccent && (
              LANG === 'zh' && tab.id === 'verify' ? (
                <span className="ws__title-accent ws__title-accent--inline">{tab.titleAccent}</span>
              ) : (
                <>
                  <br />
                  <span className="ws__title-accent">{tab.titleAccent}</span>
                </>
              )
            )}
          </h3>
          {tab.checklist.length > 0 ? (
            <ul className="ws-docs__features">
              {tab.checklist.map((item) => (
                <li key={item}>
                  <span className="ws-docs__feature-icon"><IconCheck size={14} /></span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="ws__desc">{tab.desc}</p>
              {tab.usecase && <p className="ws__usecase">{tab.usecase}</p>}
            </>
          )}
        </div>

        <div className="ws__product-wrap">
          <div
            className={[
              'ws__device',
              'panel-dark',
              isDaily && 'ws__device--daily',
              tab.id === 'verify' && LANG === 'zh' && 'ws__device--verify',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <aside className="ws__side" aria-hidden="true">
              <p className="ws__brand">
                <img src={asset('logo.svg')} alt="" width={13} height={20} />
                {w.side.brand}
              </p>

              {isDaily ? (
                <>
                  <p className="ws__side-item ws__side-item--nav is-on">
                    <IconSpark size={13} />
                    {w.side.navAssistant}
                  </p>
                  <p className="ws__side-item ws__side-item--nav">
                    <IconFolder size={13} />
                    {w.side.navLibrary}
                  </p>
                  <p className="ws__side-item ws__side-item--nav">
                    <IconClock size={13} />
                    {w.side.navSchedule}
                  </p>
                </>
              ) : tab.id === 'docs' && LANG === 'zh' ? (
                <>
                  <p className="ws__side-item ws__side-item--nav">
                    <IconSpark size={13} />
                    {LANG === 'zh' && navLumens === '光点' ? '光点 9,995' : navLumens}
                  </p>
                  <p className="ws__side-item ws__side-item--nav">
                    <IconSpark size={13} />
                    {w.side.navAssistant}
                  </p>
                  <p className="ws__side-item ws__side-item--nav is-on">
                    <IconFolder size={13} />
                    {w.side.navLibrary}
                  </p>
                  <p className="ws__side-item ws__side-item--nav">
                    <IconClock size={13} />
                    {w.side.navSchedule}
                  </p>
                </>
              ) : (
                <>
                  <p className="ws__new">
                    <IconPlus size={13} />
                    {w.side.newTask}
                  </p>

                  <p className="ws__side-label">{w.side.workLabel}</p>
                  {w.tabs.map((t) => (
                    <p
                      key={t.id}
                      className={['ws__side-item', t.id === tab.id && 'is-on'].filter(Boolean).join(' ')}
                    >
                      {t.tab}
                    </p>
                  ))}

                  <p className="ws__side-label">{w.side.recentLabel}</p>
                  {w.side.recent.map((r) => (
                    <p className="ws__side-item" key={r}>
                      {r}
                    </p>
                  ))}
                </>
              )}
            </aside>

            <div className="ws__main">
              <div className="ws__topbar" aria-hidden="true">
                <span>{tab.topbar || w.topbar}</span>
                <span className="ws__badge">
                  <Badge size={13} />
                  {tab.badge}
                </span>
              </div>

              <div className="ws__canvas">
                {tab.id === 'verify' && <VerifyPanel />}
                {tab.id === 'daily' && <DailyPanel active={inView} onPhaseChange={setDailyPhase} />}
                {tab.id === 'schedule' && <SchedulePanel />}
                {tab.id === 'docs' && <DocsPanel />}
              </div>
            </div>
          </div>

          {tab.id === 'docs' && LANG === 'zh' && <DocsCrossPanel />}

          {isDaily && LANG !== 'zh' && (
            <p className="ws-daily__caption" aria-hidden="true">
              <span className={dailyPhase >= 1 ? 'is-active' : undefined}>
                {simulation.turns[0].step} · {simulation.turns[0].displayName}
              </span>
              <IconArrowRight size={11} />
              <span className={dailyPhase >= 2 ? 'is-active' : undefined}>
                {simulation.turns[1].step} · {simulation.turns[1].displayName}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Step 1/2 是给读者看的案例注释，不放进聊天窗口本身 —— 那个控件
         要模拟真实使用，产品自己的聊天界面不会标注「第几步」。跟整屏
         对齐（.ws__stage 的兄弟节点，不是设备列的一部分），不只贴着
         设备栏那一栏窄——只上中文站；英文站保留原来贴在设备下方的
         简单箭头写法，定稿后再一起搬过去。 */}
      {isDaily && LANG === 'zh' && (
        <div className="ws-daily__stepbar" aria-hidden="true">
          <div className="ws-daily__stepbar-item">
            <span className="ws-daily__stepbar-badge ws-daily__stepbar-badge--task">
              <IconTarget size={14} />
            </span>
            <div className="ws-daily__stepbar-copy">
              <p className="ws-daily__stepbar-label">{simulation.task.label}</p>
              <p className="ws-daily__stepbar-title">{simulation.task.title}</p>
            </div>
          </div>

          <IconArrowRight size={13} className="ws-daily__stepbar-chevron" />

          <div className={['ws-daily__stepbar-item', dailyPhase >= 1 && 'is-active'].filter(Boolean).join(' ')}>
            <span className="ws-daily__stepbar-badge">1</span>
            <div className="ws-daily__stepbar-copy">
              <p className="ws-daily__stepbar-label">
                {simulation.turns[0].step} · {simulation.turns[0].displayName}
              </p>
              <p className="ws-daily__stepbar-title">{simulation.turns[0].stepTitle}</p>
              <p className="ws-daily__stepbar-desc">{simulation.turns[0].stepDesc}</p>
            </div>
          </div>

          <IconArrowRight size={13} className="ws-daily__stepbar-chevron" />

          <div className={['ws-daily__stepbar-item', dailyPhase >= 2 && 'is-active'].filter(Boolean).join(' ')}>
            <span className="ws-daily__stepbar-badge">2</span>
            <div className="ws-daily__stepbar-copy">
              <p className="ws-daily__stepbar-label">
                {simulation.turns[1].step} · {simulation.turns[1].displayName}
              </p>
              <p className="ws-daily__stepbar-title">{simulation.turns[1].stepTitle}</p>
              <p className="ws-daily__stepbar-desc">{simulation.turns[1].stepDesc}</p>
            </div>
          </div>
        </div>
      )}
    </Stage>
  )
}

/**
 * 四个工作模式，各占一整幅屏，顺序与色块交替都由 workspace.tabs 的顺序决定。
 *
 * flip：这一段前面是否插了一块暖灰（中文站的 Models 现在挪到这前面）。
 * 插了就要把奇偶反过来，色块交替才不断——默认 false，英文站顺序没变，
 * 不受影响。
 *
 * insertAfterDocs：中文站在「文档管理」后面插了「多端可用」一整屏
 * （见 App.tsx），跟这四屏共用同一条色块交替节奏，所以用一个递增计数器
 * 现算 tint、以渲染函数的形式把算好的值传出去，而不是在 tabs 数组的
 * 奇偶上硬编码——不管中间插了几块，后面的屏都能接得上。
 */
export function Workspace({
  flip = false,
  insertAfterDocs,
}: {
  flip?: boolean
  insertAfterDocs?: (tint: boolean) => ReactNode
}) {
  let n = 0
  const nextTint = () => {
    const tint = flip ? n % 2 === 1 : n % 2 === 0
    n += 1
    return tint
  }

  return (
    <>
      {w.tabs.map((tab) => (
        <Fragment key={tab.id}>
          <WorkspaceScreen tab={tab} tint={nextTint()} />
          {tab.id === 'docs' && insertAfterDocs?.(nextTint())}
        </Fragment>
      ))}
    </>
  )
}
