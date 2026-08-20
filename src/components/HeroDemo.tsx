import { useMemo } from 'react'
import { simulation, reach, hero } from '../content/copy'
import { useTypewriter, type Step } from '../hooks/useTypewriter'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useInView } from '../hooks/useInView'
import {
  IconFile,
  IconSpark,
  IconConverge,
  IconSliders,
  IconCheck,
  IconSend,
  IconLink,
} from './ui/Icon'

const MODE_ICONS = [IconSpark, IconConverge, IconSliders]

/**
 * 首屏下半部。
 *
 * 完整的对话窗口偏左摆放，模式切换器从输入框浮出、压在窗口右缘之外 ——
 * 三种模式是这一屏要突出的东西，所以它常开可读，不靠悬停才出现。
 * 右侧一列讲同一个账号也能在聊天软件里用。
 */
export function HeroDemo() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>('0px')

  const steps = useMemo<Step[]>(() => {
    const s: Step[] = [
      { kind: 'type', text: simulation.user, speed: 34 },
      { kind: 'wait', ms: 380 },
      { kind: 'show' },
      { kind: 'wait', ms: 460 },
    ]
    for (const b of simulation.blocks) {
      s.push({ kind: 'type', text: b.heading + '\n' + b.body, speed: 10 })
    }
    s.push({ kind: 'wait', ms: 340 })
    s.push({ kind: 'show' })
    return s
  }, [])

  const { step, chars } = useTypewriter(steps, { active: inView, reduced })

  const userTyped = step > 0 ? simulation.user : simulation.user.slice(0, chars)
  const modeVisible = step >= 2
  const blockStart = 4
  const fileVisible = step >= blockStart + simulation.blocks.length + 1
  const currentMode = simulation.modes.find((m) => m.current) ?? simulation.modes[0]

  return (
    <div className="demo" ref={ref}>
      <div className="demo__window">
        <div className="demo__chrome" aria-hidden="true">
          <span className="demo__dot" />
          <span className="demo__dot" />
          <span className="demo__dot" />
          <span className="demo__app">个人助手</span>
        </div>

        <div className="demo__thread" aria-hidden="true">
          <div className={['demo__ask', userTyped && 'is-on'].filter(Boolean).join(' ')}>
            <p>
              {userTyped}
              {step === 0 && chars < simulation.user.length && <span className="demo__caret" />}
            </p>
          </div>

          <div className={['demo__meta', modeVisible && 'is-on'].filter(Boolean).join(' ')}>
            <IconSpark size={14} />
            <span className="demo__meta-name">{simulation.modeLabel}</span>
            <span className="demo__meta-note">{simulation.modeNote}</span>
            <span className="demo__meta-model num">{simulation.model}</span>
          </div>

          <div className="demo__answer">
            {simulation.blocks.map((b, i) => {
              const my = blockStart + i
              if (step < my) return null
              const raw = b.heading + '\n' + b.body
              const shown = step > my ? raw : raw.slice(0, chars)
              const [h, ...rest] = shown.split('\n')
              return (
                <div className="demo__block" key={b.heading}>
                  <h4>{h}</h4>
                  {rest.length > 0 && <p>{rest.join('')}</p>}
                </div>
              )
            })}
          </div>

          <div className={['demo__file', fileVisible && 'is-on'].filter(Boolean).join(' ')}>
            <IconFile size={15} />
            <span className="demo__file-name">{simulation.file.name}</span>
            <span className="demo__file-note">{simulation.file.note}</span>
          </div>
        </div>

        <div className="demo__composer" aria-hidden="true">
          <span className="demo__placeholder">{simulation.placeholder}</span>
          <div className="demo__composer-bar">
            <span className="demo__chip">
              <IconSpark size={14} />
              {currentMode.name}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="demo__send">
              <IconSend size={15} />
            </span>
          </div>
        </div>
      </div>

      {/* 模式切换器：这一屏真正要说的东西，所以常开 */}
      <div className="demo__modes" aria-hidden="true">
        {simulation.modes.map((m, i) => {
          const Ico = MODE_ICONS[i]
          return (
            <div
              className={['demo__mode', m.current && 'is-current'].filter(Boolean).join(' ')}
              key={m.name}
            >
              <Ico size={17} className="demo__mode-icon" />
              <span className="demo__mode-name">{m.name}</span>
              {m.current && <IconCheck size={15} className="demo__mode-check" />}
              <span className="demo__mode-desc">{m.desc}</span>
            </div>
          )
        })}
      </div>

      <aside className="demo__side">
        <h2 className="demo__side-title">{reach.title}</h2>
        <p className="demo__side-lead">{reach.lead}</p>
        <ul className="demo__channels">
          {reach.channels.map((c) => (
            <li key={c.name}>
              <IconLink size={15} />
              <span className="demo__channel-name">{c.name}</span>
              <span className="demo__channel-action">{c.action}</span>
            </li>
          ))}
        </ul>
        <p className="demo__side-foot">{reach.footnote}</p>
      </aside>

      <p className="visually-hidden">{hero.simulationAlt}</p>
    </div>
  )
}
