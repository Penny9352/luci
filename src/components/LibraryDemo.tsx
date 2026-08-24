import { useMemo } from 'react'
import { libraryDemo as d } from '../content/copy'
import { useTypewriter, type Step } from '../hooks/useTypewriter'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useInView } from '../hooks/useInView'
import {
  IconPlus,
  IconPaperclip,
  IconFolder,
  IconSearch,
  IconFile,
  IconTool,
  IconSend,
  IconSpark,
  IconClose,
  IconCheck,
} from './ui/Icon'

/**
 * 文件库板块第二个演示：在已有对话里，把历史文件当上下文引用进来。
 *
 * 状态机对应 assets/文件库Demo 的四张真实截图：
 * 0 静止 → 1 「+」菜单展开 → 2 从文件库选择弹窗 → 3 勾选一个文件 →
 * 4 文件已附加、正在输入 → 5 已发送，AI 读取文件、写入文件。
 * 窗口壳与首屏 .demo 共用同一套样式变量。
 */
export function LibraryDemo() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>('0px')

  const steps = useMemo<Step[]>(
    () => [
      { kind: 'wait', ms: 500 }, // 0 静止
      { kind: 'show' }, // 1 菜单展开
      { kind: 'wait', ms: 750 },
      { kind: 'show' }, // 3 弹窗打开
      { kind: 'wait', ms: 500 },
      { kind: 'show' }, // 5 勾选文件
      { kind: 'wait', ms: 650 },
      { kind: 'show' }, // 7 弹窗关闭，文件已附加
      { kind: 'wait', ms: 260 },
      { kind: 'type', text: d.user, speed: 32 }, // 9 输入问题
      { kind: 'wait', ms: 380 },
      { kind: 'show' }, // 11 已发送
      { kind: 'wait', ms: 420 },
      { kind: 'type', text: d.answer.para1, speed: 11 }, // 13
      { kind: 'wait', ms: 260 },
      { kind: 'show' }, // 15 读取文件
      { kind: 'wait', ms: 520 },
      { kind: 'type', text: d.answer.para2, speed: 11 }, // 17
      { kind: 'wait', ms: 260 },
      { kind: 'show' }, // 19 写入文件
    ],
    []
  )

  const { step, chars } = useTypewriter(steps, { active: inView, reduced, hold: 3200 })

  const menuOn = step >= 1 && step < 3
  const modalOn = step >= 3 && step < 7
  const fileSelected = step >= 5 && step < 7
  const chipInComposer = step >= 7 && step < 11
  const sent = step >= 11

  const composerText =
    step === 9 ? d.user.slice(0, chars) : step > 9 && step < 11 ? d.user : ''

  const para1On = step >= 13
  const para1Text = step === 13 ? d.answer.para1.slice(0, chars) : d.answer.para1
  const toolReadOn = step >= 15
  const para2On = step >= 17
  const para2Text = step === 17 ? d.answer.para2.slice(0, chars) : d.answer.para2
  const toolWriteOn = step >= 19

  return (
    <div className="reuse" ref={ref}>
      <div className="reuse__window demo__window">
        <div className="demo__chrome" aria-hidden="true">
          <span className="demo__dot" />
          <span className="demo__dot" />
          <span className="demo__dot" />
          <span className="demo__app">{d.appName}</span>
        </div>

        <div className="reuse__thread" aria-hidden="true">
          {sent && (
            <div className="reuse__ask">
              <p>{d.user}</p>
              <span className="reuse__ask-file">
                <IconPaperclip size={13} />
                <span className="reuse__ask-file-name">{d.chip.name}</span>
                <span className="reuse__ask-size">{d.chip.size}</span>
              </span>
            </div>
          )}

          {para1On && (
            <div className="reuse__answer">
              <p>{para1Text}</p>
              {toolReadOn && (
                <span className="reuse__tool">
                  <IconTool size={13} />
                  {d.answer.toolRead}
                </span>
              )}
              {para2On && <p>{para2Text}</p>}
              {toolWriteOn && (
                <span className="reuse__tool">
                  <IconTool size={13} />
                  {d.answer.toolWrite}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="demo__composer reuse__composer" aria-hidden="true">
          {chipInComposer && (
            <span className="reuse__chip-file">
              <IconFile size={14} />
              <span className="reuse__chip-file-name">{d.chip.name}</span>
              <span className="reuse__chip-size">{d.chip.size}</span>
            </span>
          )}
          <span className={composerText ? 'reuse__typed' : 'demo__placeholder'}>
            {composerText || d.placeholder}
            {step === 9 && chars < d.user.length && <span className="demo__caret" />}
          </span>
          <div className="demo__composer-bar">
            <span className={['reuse__plus', menuOn && 'is-active'].filter(Boolean).join(' ')}>
              <IconPlus size={16} />
            </span>
            <span className="reuse__mode">
              <IconSpark size={13} /> 智能模式
            </span>
            <span className="demo__send">
              <IconSend size={15} />
            </span>
          </div>

          {menuOn && (
            <div className="reuse__menu">
              <div className="reuse__menu-item">
                <IconPaperclip size={15} />
                {d.attachMenu.upload}
              </div>
              <div className="reuse__menu-item is-active">
                <IconFolder size={15} />
                {d.attachMenu.library}
              </div>
            </div>
          )}
        </div>

        {modalOn && <div className="reuse__backdrop" />}

        {modalOn && (
          <div className="reuse__modal">
            <div className="reuse__modal-head">
              <h4>{d.picker.title}</h4>
              <IconClose size={16} />
            </div>
            <div className="reuse__modal-search">
              <IconSearch size={14} />
              {d.picker.search}
            </div>
            <div className="reuse__modal-tabs">
              {d.picker.tabs.map((t, i) => (
                <span className={i === 0 ? 'is-on' : undefined} key={t}>
                  {t}
                </span>
              ))}
              <span className="reuse__modal-ai">
                <span className="reuse__modal-check" />
                {d.picker.aiOnly}
              </span>
            </div>
            <div className="reuse__modal-list">
              {d.picker.files.map((f, i) => {
                const checked = i === 0 && fileSelected
                return (
                  <div
                    className={['reuse__modal-row', checked && 'is-selected'].filter(Boolean).join(' ')}
                    key={f.name}
                  >
                    <span className={['reuse__modal-box', checked && 'is-checked'].filter(Boolean).join(' ')}>
                      {checked && <IconCheck size={11} />}
                    </span>
                    <IconFile size={14} />
                    <span className="reuse__modal-name">{f.name}</span>
                    <span className="reuse__modal-time">{f.time}</span>
                  </div>
                )
              })}
            </div>
            <div className="reuse__modal-foot">
              <span>{fileSelected ? d.picker.selectedOne : d.picker.selected}</span>
              <span className="reuse__modal-cancel">{d.picker.cancel}</span>
              <span
                className={['reuse__modal-confirm', fileSelected && 'is-active'].filter(Boolean).join(' ')}
              >
                {d.picker.confirm}
              </span>
            </div>
          </div>
        )}
      </div>

      <p className="visually-hidden">{d.alt}</p>
    </div>
  )
}
