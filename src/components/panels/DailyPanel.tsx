import { useEffect, useMemo, useRef } from 'react'
import { simulation } from '../../content/copy'
import { useTypewriter, type Step } from '../../hooks/useTypewriter'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { IconCheck, IconCode, IconDownload, IconEye, IconSearch, IconSend, IconSliders, IconTool } from '../ui/Icon'

/** 「写入文件」用铅笔图标，其余（联网搜索 / 抓取网页）都算查找类，用放大镜 */
function toolIcon(label: string) {
  return label.includes('写入') || label.toLowerCase().includes('write') ? IconTool : IconSearch
}

/** 已打完 / 正在打 / 还没开始，三种状态里取出这一刻该显示的文字 */
function typed(full: string, at: number, step: number, chars: number) {
  if (step > at) return full
  if (step === at) return full.slice(0, chars)
  return ''
}

/**
 * 「自由模式」面板：靠 UI 自己讲故事，不靠文字解释。
 *
 * 起始状态就是 Claude 已经答完 Step 1——不重放它的打字过程，省下的时间
 * 全部让给这一屏真正要演的动作：读完 Claude 的完整回答（自动滚到底部）、
 * 点开输入框的模型切换器、选中 DeepSeek，再基于上文续写成小红书文案，
 * 验证「自由切换、上下文不中断」这句承诺。Claude 的回答全程不折叠——
 * 切完模型之后新内容照真实聊天的规矩往下长，随 DeepSeek 打字自动跟着
 * 滚，不是靠收起旧内容腾地方。弹窗绝对定位悬浮在输入框正上方，不占
 * 版面高度。
 *
 * Step 1/2 的说明文字不放在这里——那是给读者看的注释，真实产品的聊天
 * 界面不会自己标注第几步。调用方（Workspace）负责把它画在这个控件外面，
 * 这里只通过 onPhaseChange 上报进度。
 */
export function DailyPanel({
  active,
  onPhaseChange,
}: {
  active: boolean
  onPhaseChange?: (phase: 1 | 2) => void
}) {
  const reduced = usePrefersReducedMotion()
  const [turn0, turn1] = simulation.turns
  const threadRef = useRef<HTMLDivElement>(null)

  const { steps, idx } = useMemo(() => {
    const s: Step[] = []
    let n = 0
    const push = (step: Step) => {
      s.push(step)
      return n++
    }

    push({ kind: 'show' }) // 起始帧：Claude 已经答完 Step 1
    push({ kind: 'wait', ms: 700 })
    const scrollBottomIdx = push({ kind: 'show' }) // 读完了，滚到底部
    push({ kind: 'wait', ms: 900 })
    const menuOpenIdx = push({ kind: 'show' })
    push({ kind: 'wait', ms: 520 })
    const menuSelectIdx = push({ kind: 'show' })
    push({ kind: 'wait', ms: 620 })
    const step2RevealIdx = push({ kind: 'show' })
    push({ kind: 'wait', ms: 300 })
    const user2TypeIdx = push({ kind: 'type', text: turn1.user, speed: 34 })
    push({ kind: 'wait', ms: 380 })
    const turn1HeaderIdx = push({ kind: 'show' })
    push({ kind: 'wait', ms: 260 })
    const blocks1StartIdx = n
    // DeepSeek 这篇文案篇幅长（逐字取自真实产出），用更快的字速，
    // 不然一轮演示要跑很久
    for (const b of turn1.blocks) push({ kind: 'type', text: b.heading + '\n' + b.body, speed: 5 })
    push({ kind: 'wait', ms: 500 })
    const tailIdx = push({ kind: 'show' }) // 话题标签 + 结尾问句
    push({ kind: 'wait', ms: 900 })
    push({ kind: 'show' })

    return {
      steps: s,
      idx: {
        scrollBottomIdx,
        menuOpenIdx,
        menuSelectIdx,
        step2RevealIdx,
        user2TypeIdx,
        turn1HeaderIdx,
        blocks1StartIdx,
        tailIdx,
      },
    }
  }, [turn0, turn1])

  const { step, chars } = useTypewriter(steps, { active, reduced })

  const menuOpen = step >= idx.menuOpenIdx && step < idx.step2RevealIdx
  const menuSelected = step >= idx.menuSelectIdx
  const step2Begun = step >= idx.step2RevealIdx
  const user2Typed = typed(turn1.user, idx.user2TypeIdx, step, chars)
  const turn1HeaderVisible = step >= idx.turn1HeaderIdx
  const tailVisible = step >= idx.tailIdx

  useEffect(() => {
    onPhaseChange?.(step2Begun ? 2 : 1)
  }, [step2Begun, onPhaseChange])

  // Step 1 读完，滚到底部一次——让读者看到 Claude 完整答完的状态
  useEffect(() => {
    if (step === idx.scrollBottomIdx) {
      threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
    }
  }, [step, idx.scrollBottomIdx, reduced])

  // Step 2 开始后，跟着 DeepSeek 打字持续贴底——真实聊天窗口的滚动方式
  useEffect(() => {
    if (step2Begun && threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight
    }
  }, [step2Begun, step, chars])

  const currentModel = step2Begun ? turn1.model : turn0.model
  const selectedModel = menuSelected ? turn1.model : turn0.model

  return (
    <div className="ws-daily" aria-hidden="true">
      <div className="ws-daily__thread" ref={threadRef}>
        <div className="demo__ask is-on">
          <p>{turn0.user}</p>
        </div>

        {turn0.narration.map((n, i) => (
          <div className="demo__narr" key={i}>
            <p className="demo__text">{n.text}</p>
            <p className="demo__tools">
              {n.tools.map((t) => {
                const Icon = toolIcon(t)
                return (
                  <span key={t}>
                    <Icon size={12} />
                    {t}
                  </span>
                )
              })}
            </p>
          </div>
        ))}

        {turn0.file && (
          <div className="demo__file">
            <span className="demo__file-icon">
              <IconCode size={13} />
            </span>
            <span className="demo__file-name">{turn0.file}</span>
            <span className="demo__file-actions">
              <IconEye size={13} />
              <IconDownload size={13} />
            </span>
          </div>
        )}

        {turn0.summary && <p className="demo__text">{turn0.summary}</p>}
        {turn0.summaryIntro && <p className="demo__text">{turn0.summaryIntro}</p>}

        {turn0.bullets.length > 0 && (
          <ul className="demo__bullets">
            {turn0.bullets.map((b) => (
              <li key={b.label}>
                <strong>{b.label}：</strong>
                {b.body}
              </li>
            ))}
          </ul>
        )}

        {turn0.closing && <p className="demo__text">{turn0.closing}</p>}

        {turn0.narration.length === 0 && (
          <>
            <p className="demo__tools">
              {turn0.tools.map((t) => {
                const Icon = toolIcon(t)
                return (
                  <span key={t}>
                    <Icon size={12} />
                    {t}
                  </span>
                )
              })}
            </p>
            <div className="demo__answer">
              {turn0.blocks.map((b) => (
                <div className="demo__block" key={b.heading}>
                  <h4>{b.heading}</h4>
                  <p>{b.body}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {step2Begun && (
          <>
            <div className={['demo__ask', user2Typed && 'is-on'].filter(Boolean).join(' ')}>
              <p>
                {user2Typed}
                {step === idx.user2TypeIdx && chars < turn1.user.length && <span className="demo__caret" />}
              </p>
            </div>

            {turn1HeaderVisible && (
              <>
                {turn1.intro && <p className="demo__text">{turn1.intro}</p>}
                <div className="demo__answer">
                  {turn1.blocks.map((b, i) => {
                    const my = idx.blocks1StartIdx + i
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
                {tailVisible && (
                  <>
                    {turn1.hashtags && <p className="demo__hashtags">{turn1.hashtags}</p>}
                    {turn1.outro && <p className="demo__text">{turn1.outro}</p>}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      <div className="ws-daily__composer">
        <span className="demo__placeholder">{simulation.placeholder}</span>
        <div className="demo__composer-bar">
          <span className={['demo__chip', menuOpen && 'is-pressed'].filter(Boolean).join(' ')}>
            <IconSliders size={14} />
            {currentModel}
          </span>
          <span className="demo__send">
            <IconSend size={15} />
          </span>
        </div>

        <div className={['ws-daily__menu', menuOpen && 'is-open'].filter(Boolean).join(' ')}>
          <p className="ws-daily__menu-label">{simulation.modelMenuLabel}</p>
          {simulation.models.map((m) => {
            const isSelected = m === selectedModel
            return (
              <p key={m} className={['ws-daily__menu-item', isSelected && 'is-selected'].filter(Boolean).join(' ')}>
                {m}
                {isSelected && <IconCheck size={11} />}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
