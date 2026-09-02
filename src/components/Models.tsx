import { type ReactNode } from 'react'
import { LANG, models as m } from '../content/copy'
import { asset } from '../lib/asset'
import { Stage } from './Stage'
import {
  IconBolt,
  IconCheck,
  IconGrid,
  IconLink,
  IconPie,
  IconShield,
  IconSliders,
  IconSpark,
  IconSwap,
  IconTarget,
  IconUsers,
} from './ui/Icon'

const mid = Math.ceil(m.items.length / 2)
const rows = [m.items.slice(0, mid), m.items.slice(mid)]

const CARD_ICON: Record<string, typeof IconSpark> = {
  free: IconSliders,
  smart: IconSpark,
  verify: IconUsers,
}

const BULLET_ICON: Record<string, typeof IconSpark> = {
  grid: IconGrid,
  swap: IconSwap,
  link: IconLink,
  target: IconTarget,
  bolt: IconBolt,
  check: IconCheck,
  users: IconUsers,
  shield: IconShield,
  pie: IconPie,
}

/**
 * 标题里「AI」和「用法」两处强调色，处理方式不同：「AI」是拉丁字，
 * 衬线体里笔画比中文细很多，要换成无衬线粗体才不显单薄（跟首屏
 * .hero__accent 是同一处理）；「用法」是中文，跟标题同一副衬线体，
 * 只需要换色。
 */
function withAccent(text: string): ReactNode[] {
  return text.split(/(AI|用法)/g).map((part, i) => {
    if (part === 'AI') return <span className="hero__accent" key={i}>{part}</span>
    if (part === '用法') return <span className="text-accent" key={i}>{part}</span>
    return part
  })
}

/**
 * 模型段：三张模式卡片 + 模型矩阵。
 *
 * 卡片文案与截图参考逐字一致，先只上中文站——英文站的 modes/matrixLabel
 * 字段已经备好（见 copy.en.ts），定稿后再补英文渲染分支。模型矩阵两行
 * logo 反向横向滚动的部分完全不动。
 */
export function Models() {
  return (
    <Stage id="models" tint>
      <div className="section-head">
        <h2>{LANG === 'zh' ? withAccent(m.title) : m.title}</h2>
        {LANG !== 'zh' && <p className="lede">{m.lead}</p>}
      </div>

      {LANG === 'zh' && (
        <div className="modes">
          {m.modes.map((mode) => {
            const CardIcon = CARD_ICON[mode.icon] ?? IconSpark
            return (
              <div className={`modes__card modes__card--${mode.icon}`} key={mode.icon}>
                <div className="modes__top">
                  <span className="modes__icon">
                    <CardIcon size={22} />
                  </span>
                  <div className="modes__head">
                    <p className="modes__label">{mode.label}</p>
                    <p className="modes__title">{mode.title}</p>
                  </div>
                </div>
                <ul className="modes__bullets">
                  {mode.bullets.map((b) => {
                    const BulletIcon = BULLET_ICON[b.icon] ?? IconCheck
                    return (
                      <li key={b.text}>
                        <BulletIcon size={15} />
                        {b.text}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )}

      <div className="matrix">
        {LANG === 'zh' && <p className="matrix__label">{m.matrixLabel}</p>}
        {rows.map((row, ri) => (
          <div className="marquee" aria-hidden="true" key={ri}>
            <div
              className={['marquee__track', ri % 2 === 1 && 'marquee__track--reverse']
                .filter(Boolean)
                .join(' ')}
            >
              {/*
                轨道动画走的是 translateX(-50%)，所以「一份」必须自己就宽过视口，
                否则滚到一半会露出空档 —— 出血到满幅之后，一行五六个已经不够宽了。
                一份 = 两遍，整轨 = 两份，-50% 仍恰好等于一份，接缝无感。
              */}
              {[...row, ...row, ...row, ...row].map((i, idx) => (
                <span className="marquee__pill" key={`${i.name}-${idx}`}>
                  <img src={asset(i.icon)} alt="" width={28} height={28} />
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
    </Stage>
  )
}
