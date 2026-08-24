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
          {m.groups.map((g, gi) => (
            <div className="matrix__row" key={g.label}>
              <span className="matrix__label">{g.label}</span>
              <div className="marquee" aria-hidden="true">
                <div className={['marquee__track', gi % 2 === 1 && 'marquee__track--reverse'].filter(Boolean).join(' ')}>
                  {[...g.items, ...g.items].map((i, idx) => (
                    <span className="marquee__pill" key={`${i.name}-${idx}`}>
                      <img src={i.icon} alt="" width={28} height={28} />
                      {i.name}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="visually-hidden">
                {g.items.map((i) => (
                  <li key={i.name}>{i.name}</li>
                ))}
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
                <dt>
                  {mode.name}
                  {'alias' in mode && <span className="modes__alias">{mode.alias}</span>}
                </dt>
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
