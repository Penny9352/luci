import { hero, LOGIN_URL } from '../content/copy'
import { Button } from './ui/Button'
import { HeroDemo } from './HeroDemo'
import { IconArrowDown } from './ui/Icon'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner page">
        <h1 className="hero__title">
          {hero.titleLead}
          <em>{hero.titleAccent}</em>
          {hero.titleTail}
        </h1>
        <p className="hero__sub measure">{hero.subtitle}</p>
        <div className="hero__cta">
          <Button href={LOGIN_URL}>{hero.ctaPrimary}</Button>
          <Button href="#cross-check" variant="ghost">
            {hero.ctaSecondary}
            <IconArrowDown size={17} />
          </Button>
        </div>
      </div>
      <div className="hero__demo page">
        <HeroDemo />
      </div>
    </section>
  )
}
