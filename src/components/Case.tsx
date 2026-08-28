import type { CSSProperties } from 'react'
import { caseStudy as c } from '../content/copy'
import { Stage } from './Stage'
import { useInView } from '../hooks/useInView'
import { IconCheck, IconConverge, IconWarn } from './ui/Icon'

/**
 * 案例：一份开题报告，与暴力模式在提交前挑出的问题。
 *
 * 左卡是产品界面复刻，不是示意图 —— 进度条、阶段标签、模型名与字数都
 * 逐字取自真实会话截图，所以它按产品自己的顺序演：三个模型先并行作答，
 * 再进交叉验证，日志一行行落，最后才出结论。
 *
 * 动效循环播放：一轮 = 依次浮出 → 停住看清 → 依次退场 → 重来。
 * 整条时间轴是 CSS 的一条 infinite 动画，每个元素靠 animation-delay
 * 错开相位 —— 不用 JS 定时器反复重挂节点，也就不会有重挂那一帧的闪白。
 */
export function Case() {
  // once=false：循环动效在屏幕外要停下来，不空转
  const { ref, inView } = useInView<HTMLDivElement>('-15% 0px -15% 0px', false)
  const s = c.session

  return (
    <Stage id="case">
      <div className="stack">
        <p className="section__label">{c.label}</p>
        <h2 className="case__title">{c.title}</h2>
        <p className="lede measure">{c.lead}</p>
      </div>

      <div className={['case', inView && 'is-in'].filter(Boolean).join(' ')} ref={ref}>
        <article className="case__doc">
          <header className="case__doc-head">
            <span className="case__kind">{c.doc.kind}</span>
            <span className="case__status">
              <span className="case__status-run">{c.doc.running}</span>
              <span className="case__status-done">{c.doc.done}</span>
            </span>
          </header>

          <p className="case__prompt">{s.prompt}</p>

          {/* 以下为产品界面复刻，对读屏器隐藏，等价内容由右卡承担 */}
          <div className="case__panel" aria-hidden="true">
            <div className="case__steps">
              <IconConverge size={15} className="case__steps-icon" />
              {s.steps.map((step, i) => (
                <span className="case__step" key={step} style={{ '--i': i } as CSSProperties}>
                  {step}
                  {/* 第三段是「开始输出」，产品里那里转的是圈不是勾 */}
                  {i < 2 && <IconCheck size={13} />}
                </span>
              ))}
            </div>

            <p className="case__stage">
              {s.stage1}
              <span className="case__stage-note num">{s.stage1Count}</span>
            </p>

            <ul className="case__models">
              {s.models.map((m, i) => (
                <li key={m.name} style={{ '--i': i } as CSSProperties}>
                  <IconCheck size={14} className="case__tick" />
                  <span className="case__model-name">{m.name}</span>
                  <span className="case__model-excerpt">{m.excerpt}</span>
                  <span className="case__model-words num">{m.words}</span>
                </li>
              ))}
            </ul>

            <p className="case__stage case__stage--two">
              {s.stage2}
              <span className="case__stage-note">{s.stage2Note}</span>
            </p>

            <ul className="case__log">
              {c.flags.map((f, i) => (
                <li className="case__flag" key={f} style={{ '--i': i } as CSSProperties}>
                  <IconWarn size={14} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="case__result">
          <p className="case__result-label">{c.result.label}</p>
          <p className="case__count num">{c.result.count}</p>
          <h3 className="case__result-heading">{c.result.heading}</h3>

          <ul className="case__checks">
            {c.result.checks.map((k) => (
              <li key={k}>
                <IconCheck size={15} />
                {k}
              </li>
            ))}
          </ul>

          <p className="case__note">{c.result.note}</p>
        </aside>
      </div>

      <ul className="case__uses">
        {c.uses.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
    </Stage>
  )
}
