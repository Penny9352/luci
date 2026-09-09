import { start as s, footer as f, LOGIN_URL } from '../content/copy'
import { asset } from '../lib/asset'
import { Button } from './ui/Button'
import { IconGift, IconSpark } from './ui/Icon'

export function Start() {
  return (
    <section className="start" id="start">
      <div className="start__inner page">
        <h2>{s.title}</h2>
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
        <div className="foot__bottom page">
          <a className="foot__contact" href={asset('contact.html')} target="_blank" rel="noopener noreferrer">
            {f.contact}
          </a>
          <span className="foot__sep" aria-hidden="true">·</span>
          {f.copyright}
        </div>
      </footer>
    </section>
  )
}
