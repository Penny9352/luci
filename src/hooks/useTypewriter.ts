import { useEffect, useRef, useState } from 'react'

export type Step =
  | { kind: 'type'; text: string; speed?: number }
  | { kind: 'wait'; ms: number }
  | { kind: 'show' }

/**
 * 首屏模拟对话的时间轴。
 *
 * 一条步骤序列，逐步推进 stepIndex 与当前步骤内已打出的字数。
 * reduced 为真时直接跳到终态，不做任何逐字动画。
 * 播完停 hold 毫秒后回到起点重播。
 */
export function useTypewriter(steps: Step[], opts: { active: boolean; reduced: boolean; hold?: number }) {
  const { active, reduced, hold = 2600 } = opts
  const [cursor, setCursor] = useState({ step: 0, chars: 0 })
  const [done, setDone] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (reduced || !active) {
      if (reduced) setDone(true)
      return
    }

    let cancelled = false
    let step = 0
    let chars = 0

    const clear = () => timer.current && clearTimeout(timer.current)

    const schedule = (ms: number, fn: () => void) => {
      clear()
      timer.current = setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
    }

    const tick = () => {
      if (step >= steps.length) {
        setDone(true)
        schedule(hold, () => {
          step = 0
          chars = 0
          setDone(false)
          setCursor({ step: 0, chars: 0 })
          tick()
        })
        return
      }

      const current = steps[step]

      if (current.kind === 'wait') {
        setCursor({ step, chars: 0 })
        schedule(current.ms, () => {
          step += 1
          tick()
        })
        return
      }

      if (current.kind === 'show') {
        setCursor({ step, chars: 0 })
        schedule(60, () => {
          step += 1
          tick()
        })
        return
      }

      if (chars >= current.text.length) {
        step += 1
        chars = 0
        schedule(180, tick)
        return
      }

      chars += 1
      setCursor({ step, chars })
      schedule(current.speed ?? 26, tick)
    }

    tick()

    return () => {
      cancelled = true
      clear()
    }
  }, [steps, active, reduced, hold])

  if (reduced) return { step: steps.length, chars: Number.MAX_SAFE_INTEGER, done: true }
  return { step: cursor.step, chars: cursor.chars, done }
}
