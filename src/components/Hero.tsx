import { hero, reach, LOGIN_URL } from '../content/copy'
import { Button } from './ui/Button'
import { IconArrowDown } from './ui/Icon'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner page">
        <h1 className="hero__title">
          <span className="hero__title-brand">{hero.titleBrand}</span>
          {hero.titleLead}
          <em>{hero.titleAccent}</em>
          {hero.titleTail}
        </h1>
        <p className="hero__sub measure">
          {hero.subtitleLead}
          <span className="hero__channels">
            {reach.channels.map((c) => (
              /* alt 不能留空：文字换成图之后，读屏器只剩这里能读出渠道名 */
              <img
                key={c.name}
                className="hero__channel"
                src={c.logo}
                alt={c.name}
                width={22}
                height={22}
              />
            ))}
          </span>
          {hero.subtitleTail}
        </p>
        <div className="hero__cta">
          <Button href={LOGIN_URL}>{hero.ctaPrimary}</Button>
          <Button href="#cross-check" variant="ghost">
            {hero.ctaSecondary}
            <IconArrowDown size={17} />
          </Button>
        </div>
      </div>
    </section>
  )
}
