import { useMemo } from 'react'
import { simulation } from '../../content/copy'
import { useTypewriter, type Step } from '../../hooks/useTypewriter'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { IconFile, IconSpark, IconSend } from '../ui/Icon'

/**
 * 日常任务面板：一轮普通对话打字演示。
 *
 * 这是整个 Tab 区唯一的动效 —— 四块面板各来一次入场动画会让人不知道
 * 该看哪。演示随 Tab 激活开始，切走即停，不在后台空转。
 */
export function DailyPanel({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion()

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

  const { step, chars } = useTypewriter(steps, { active, reduced })

  const userTyped = step > 0 ? simulation.user : simulation.user.slice(0, chars)
  const modeVisible = step >= 2
  const blockStart = 4
  const fileVisible = step >= blockStart + simulation.blocks.length + 1
  const currentMode = simulation.modes.find((m) => m.current) ?? simulation.modes[0]

  return (
    <div className="ws-daily" aria-hidden="true">
      <div className="ws-daily__thread">
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

      <div className="ws-daily__composer">
        <span className="demo__placeholder">{simulation.placeholder}</span>
        <div className="demo__composer-bar">
          <span className="demo__chip">
            <IconSpark size={14} />
            {currentMode.name}
          </span>
          <span className="demo__send">
            <IconSend size={15} />
          </span>
        </div>
      </div>
    </div>
  )
}
