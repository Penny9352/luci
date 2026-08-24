import { models as m } from '../content/copy'

const mid = Math.ceil(m.items.length / 2)
const rows = [m.items.slice(0, mid), m.items.slice(mid)]

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
          {rows.map((row, ri) => (
            <div className="marquee" aria-hidden="true" key={ri}>
              <div
                className={['marquee__track', ri % 2 === 1 && 'marquee__track--reverse']
                  .filter(Boolean)
                  .join(' ')}
              >
                {[...row, ...row].map((i, idx) => (
                  <span className="marquee__pill" key={`${i.name}-${idx}`}>
                    <img src={i.icon} alt="" width={28} height={28} />
                    {i.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <ul className="visually-hidden">
            {m.items.map((i) => (
              <li key={i.name}>{i.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
