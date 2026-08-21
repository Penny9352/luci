import { ecosystem as e } from '../content/copy'
import { Stage } from './Stage'

export function Ecosystem() {
  return (
    <Stage id="ecosystem" stage={e.stage} name={e.stageName}>
      <div className="stack">
        <h2>{e.title}</h2>

        <dl className="terms terms--lead">
          {e.points.map((p) => (
            <div className="terms__row" key={p.term}>
              <dt>{p.term}</dt>
              <dd>{p.desc}</dd>
            </div>
          ))}
        </dl>

        <ul className="apps">
          {e.apps.map((a) => (
            <li key={a.name}>
              <img className="apps__icon" src={a.icon} alt="" width={48} height={48} />
              <h3>{a.name}</h3>
              <p>{a.what}</p>
              {a.note && <p className="apps__note">{a.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  )
}
