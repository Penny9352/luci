import { models as m } from '../content/copy'

/**
 * 浅色间奏。整页是一条暗场日志，这一段是印在纸上的规格表 ——
 * 明暗反转在这里有理由，不是为了换个花样。
 */
export function Models() {
  return (
    <section className="interlude on-light" id="models">
      <div className="interlude__inner">
        <div className="interlude__rail" aria-hidden="true">
          <span className="interlude__line" />
        </div>
        <div className="interlude__head">
          <h2>{m.title}</h2>
          <p className="lede measure">{m.lead}</p>
        </div>

        <div className="matrix">
          {m.groups.map((g) => (
            <div className="matrix__group" key={g.label}>
              <span className="matrix__label">{g.label}</span>
              <ul className="matrix__list">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
                <li className="matrix__more">{m.groupsNote}</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="modes">
          <div className="modes__head">
            <h3>{m.modesTitle}</h3>
            <p className="modes__criterion">{m.modesCriterion}</p>
          </div>
          <dl className="modes__list">
            {m.modes.map((mode) => (
              <div className="modes__row" key={mode.name}>
                <dt>{mode.name}</dt>
                <dd className="modes__what">{mode.what}</dd>
                <dd className="modes__when">{mode.when}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
