import { models as m } from '../content/copy'
import { Stage } from './Stage'

const mid = Math.ceil(m.items.length / 2)
const rows = [m.items.slice(0, mid), m.items.slice(mid)]

/**
 * 模型矩阵。两行 logo 反向横向滚动，跑到卡片两边才截断 ——
 * 「接了很多」这件事靠看不到头来说，比列一个数字有说服力。
 */
export function Models() {
  return (
    <Stage id="models" tint>
      <div className="section-head">
        <h2>{m.title}</h2>
        <p className="lede">{m.lead}</p>
      </div>

      <div className="matrix">
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
    </Stage>
  )
}
