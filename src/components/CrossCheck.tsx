import { crossCheck as c } from '../content/copy'
import { Stage } from './Stage'
import { ScreenshotFrame } from './ui/ScreenshotFrame'
import { IconConverge, IconDiverge } from './ui/Icon'

/**
 * 这一屏的说服力全在那段推理日志上 —— 它是证据，不是宣传语。
 * 所以截图整幅铺开，不塞进侧栏；缩到读不出来就等于没放。
 */
export function CrossCheck() {
  return (
    <Stage id="cross-check" stage={c.stage} name={c.stageName}>
      <div className="stack">
        <h2>{c.title}</h2>
        <p className="lede measure">{c.lead}</p>
        <p className="lede measure">
          {c.engine.pre}
          <strong className="engine">{c.engine.name}</strong>
          {c.engine.post}
        </p>

        <p className="beats">
          {c.beats.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </p>

        <ScreenshotFrame
          src="/shots/cross-check-panel.png"
          alt={c.shot.alt}
          caption={c.shot.caption}
          width={950}
          height={700}
          className="shot--evidence"
        />

        <dl className="terms">
          {c.points.map((p, i) => (
            <div className="terms__row" key={p.term}>
              <dt>
                {i === 2 ? <IconDiverge size={18} /> : <IconConverge size={18} />}
                {p.term}
              </dt>
              <dd>{p.desc}</dd>
            </div>
          ))}
        </dl>

        <p className="tradeoff">
          <span className="tradeoff__label">{c.tradeoff.label}</span>
          {c.tradeoff.text}
        </p>

        <p className="claim">{c.closing}</p>
      </div>
    </Stage>
  )
}
