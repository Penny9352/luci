import { useMemo } from 'react'
import { simulation, hero } from '../content/copy'
import { useTypewriter, type Step } from '../hooks/useTypewriter'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useInView } from '../hooks/useInView'
import { IconFile, IconSpark } from './ui/Icon'

/**
 * 首屏下半的模拟对话。演一轮普通对话，不是交叉验证。
 *
 * 重建而非截图：静态图演不出流式输出与文件自动归档这两个动作，
 * 而这一屏的说服力正来自「它在动」。
 */
export function ChatSimulation() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>('0px')

  const steps = useMemo<Step[]>(() => {
    const s: Step[] = [
      { kind: 'type', text: simulation.user, speed: 38 },
      { kind: 'wait', ms: 420 },
      { kind: 'show' }, // 模式条
      { kind: 'wait', ms: 520 },
    ]
    for (const b of simulation.blocks) {
      s.push({ kind: 'type', text: b.heading + '\n' + b.body, speed: 11 })
    }
    s.push({ kind: 'wait', ms: 380 })
    s.push({ kind: 'show' }) // 文件卡
    return s
  }, [])

  const { step, chars } = useTypewriter(steps, { active: inView, reduced })

  const userTyped = step > 0 ? simulation.user : simulation.user.slice(0, chars)
  const modeVisible = step >= 2
  const blockStart = 4

  const fileVisible = step >= blockStart + simulation.blocks.length + 1

  return (
    <div className="sim" ref={ref}>
      <div className="sim__window">
        <div className="sim__chrome">
          <span className="sim__dot" />
          <span className="sim__dot" />
          <span className="sim__dot" />
          <span className="sim__title">个人助手</span>
        </div>

        <div className="sim__body" aria-hidden="true">
          <div className={['sim__ask', userTyped && 'is-on'].filter(Boolean).join(' ')}>
            <p>
              {userTyped}
              {step === 0 && chars < simulation.user.length && <span className="sim__caret" />}
            </p>
          </div>

          <div className={['sim__mode', modeVisible && 'is-on'].filter(Boolean).join(' ')}>
            <IconSpark size={15} />
            <span className="sim__mode-name">{simulation.modeLabel}</span>
            <span className="sim__mode-note">{simulation.modeNote}</span>
            <span className="sim__mode-model num">{simulation.model}</span>
          </div>

          <div className="sim__answer">
            {simulation.blocks.map((b, i) => {
              const my = blockStart + i
              if (step < my) return null
              const full = step > my
              const raw = b.heading + '\n' + b.body
              const shown = full ? raw : raw.slice(0, chars)
              const [h, ...rest] = shown.split('\n')
              return (
                <div className="sim__block" key={b.heading}>
                  <h4>{h}</h4>
                  {rest.length > 0 && <p>{rest.join('')}</p>}
                </div>
              )
            })}
          </div>

          <div className={['sim__file', fileVisible && 'is-on'].filter(Boolean).join(' ')}>
            <IconFile size={16} />
            <span className="sim__file-name">{simulation.file.name}</span>
            <span className="sim__file-note">{simulation.file.note}</span>
          </div>
        </div>
      </div>

      <p className="visually-hidden">{hero.simulationAlt}</p>
    </div>
  )
}
