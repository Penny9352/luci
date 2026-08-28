import { audience as a } from '../content/copy'
import { Stage } from './Stage'
import { IconFlask, IconPen, IconTarget, IconTrend, IconUsers } from './ui/Icon'

const ROLE_ICONS = [IconFlask, IconTarget, IconTrend, IconPen, IconUsers]

/**
 * 适用人群。
 *
 * 五个角色横排一行，靠竖发丝线分栏 —— 不用卡片盒子：五张等大卡片会
 * 多出一层与内容无关的边框，而且五这个数字在三列栅格里必然落单。
 * 一行五栏既没有落单行，也让「这几类人」一眼数得清。
 */
export function Audience() {
  return (
    <Stage id="audience" tint>
      <div className="section-head">
        <p className="section__label">{a.label}</p>
        <h2>{a.title}</h2>
        <p className="lede">{a.lead}</p>
      </div>

      <ul className="roles">
        {a.roles.map((r, i) => {
          const Ico = ROLE_ICONS[i]
          return (
            <li className="roles__item" key={r.name}>
              <Ico size={22} className="roles__icon" />
              <h3>{r.name}</h3>
              <p>{r.what}</p>
            </li>
          )
        })}
      </ul>
    </Stage>
  )
}
