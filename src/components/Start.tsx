import { start as s, footer as f, LOGIN_URL } from '../content/copy'
import { Button } from './ui/Button'
import { IconGift, IconSpark } from './ui/Icon'

export function Start() {
  return (
    <section className="start" id="start">
      <div className="start__inner page">
        <h2>{s.title}</h2>
        <p className="lede">{s.lead}</p>
        <Button href={LOGIN_URL} className="start__cta">
          {s.cta}
        </Button>

        <div className="start__facts">
          <div className="start__fact">
            <h3>
              <IconSpark size={17} />
              {s.credits.title}
            </h3>
            <p>{s.credits.body}</p>
          </div>
          <div className="start__fact">
            <h3>
              <IconGift size={17} />
              {s.invite.title}
            </h3>
            <p>
              邀请人与被邀请人各得 <span className="num start__amount">{s.invite.amount}</span> 光点。
            </p>
          </div>
        </div>
      </div>

      <footer className="foot">
        <div className="foot__inner page">
          <p className="foot__co">{f.company}</p>
          <p className="foot__links">
            {f.links.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
            <a href={f.enterprise.href}>{f.enterprise.label}</a>
          </p>
          <p className="foot__legal">
            <span>{f.icp}</span>
            <span>{f.disclaimer}</span>
          </p>
        </div>
      </footer>
    </section>
  )
}
