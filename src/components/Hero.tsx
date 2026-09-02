import { hero, LOGIN_URL } from '../content/copy'
import { Button } from './ui/Button'
import { IconArrowDown } from './ui/Icon'

/**
 * 思源宋体的拉丁字形比中文字重轻很多，「AI」嵌进中文标题里会显得
 * 单薄、像贴错了字体。拆出来换成无衬线粗体 + 品牌橙，视觉粗细对得上，
 * 顺带做成强调色 —— 一举两得，不是纯粹的补丁。
 */
function withAccent(text: string) {
  return text.split(/(AI)/g).map((part, i) =>
    part === 'AI' ? (
      <span className="hero__accent" key={i}>
        AI
      </span>
    ) : (
      part
    )
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner page">
        <p className="hero__kicker">{hero.kicker}</p>
        <h1 className="hero__title">
          {hero.titleLead && <span className="hero__title-lead">{withAccent(hero.titleLead)}</span>}
          <span className="hero__title-main">{withAccent(hero.titleMain)}</span>
        </h1>
        <p className="hero__sub measure">{hero.subtitle}</p>
        <div className="hero__cta">
          <Button href={LOGIN_URL}>{hero.ctaPrimary}</Button>
          <Button href="#workspace" variant="ghost">
            {hero.ctaSecondary}
            <IconArrowDown size={17} />
          </Button>
        </div>
      </div>
    </section>
  )
}
