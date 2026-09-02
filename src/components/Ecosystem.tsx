import { ecosystem as e, reach as r } from '../content/copy'
import { asset } from '../lib/asset'
import { Stage } from './Stage'

export function Ecosystem() {
  return (
    <Stage id="ecosystem">
      <div className="section-head">
        <h2>{e.title}</h2>
      </div>

      <div className="stack">
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
              <img className="apps__icon" src={asset(a.icon)} alt="" width={48} height={48} />
              <h3>{a.name}</h3>
              <p>{a.what}</p>
              {a.note && <p className="apps__note">{a.note}</p>}
            </li>
          ))}
        </ul>

        <div className="reach">
          <div className="reach__head">
            <h3>{r.title}</h3>
            <p className="reach__lead">{r.lead}</p>
            <p className="reach__foot">{r.footnote}</p>
          </div>

          <ul className="reach__channels">
            {r.channels.map((c) => (
              <li key={c.name}>
                <img
                  className="reach__logo"
                  src={asset(c.logo)}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                />
                <span className="reach__name">{c.name}</span>
                <span className="reach__action">{c.action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  )
}
