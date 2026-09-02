import { LANG, workspace as w } from '../../content/copy'
import { asset } from '../../lib/asset'
import { IconArrowRight, IconCheck, IconInfo, IconSpark, IconTable, IconWarn } from '../ui/Icon'

function ModelBadge({ badge }: { badge: string }) {
  if (badge === 'spark') return <IconSpark size={16} />
  return <span className="vc-model__avatar-text">{badge}</span>
}

/**
 * 暴力模式面板。
 *
 * 中文站：一个涨价决策案例，手绘界面（原来这一屏是真实产品截图，
 * 现在跟自由模式那屏一样换成本站按案例内容绘制），内容逐字对着
 * 参考图来。案例比截图长得多，画布单独放高（.ws__device--verify）
 * 之外整块还是可以上下滚动，跟自由模式的处理方式一致。
 *
 * 英文站：维持原来的真实产品截图，不受影响。
 */
export function VerifyPanel() {
  if (LANG !== 'zh') {
    return (
      <img
        className="ws-verify"
        src={asset(w.verify.src)}
        alt={w.verify.alt}
        width={950}
        height={700}
        loading="lazy"
        decoding="async"
      />
    )
  }

  const v = w.verify

  return (
    <div className="ws-verify-case" aria-hidden="true">
      <div className="vc-task">
        <span className="vc-task__icon">
          <IconTable size={16} />
        </span>
        <div className="vc-task__body">
          <p className="vc-task__prompt">{v.task.prompt}</p>
          <p className="vc-task__attachment">附件：{v.task.attachment}</p>
        </div>
      </div>

      <div className="vc-stage-head">
        <span className="vc-stage-head__label">
          {v.stage1.label}
          <IconInfo size={13} />
        </span>
        <span className="vc-stage-head__note">{v.stage1.note}</span>
      </div>

      <div className="vc-models">
        {v.stage1.models.map((m) => (
          <div className={`vc-model vc-model--${m.accent}`} key={m.name}>
            <div className="vc-model__head">
              <span className="vc-model__avatar">
                <ModelBadge badge={m.badge} />
              </span>
              <span className="vc-model__name">{m.name}</span>
            </div>
            <p className="vc-model__angle">{m.angle}</p>
            {m.intro && <p className="vc-model__intro">{m.intro}</p>}
            <ul className="vc-model__bullets">
              {m.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="vc-model__range-label">建议涨价区间</p>
            <p className="vc-model__range">{m.range}</p>
            <span className="vc-model__confidence">置信度：{m.confidence}</span>
          </div>
        ))}
      </div>

      <p className="vc-stage-label">{v.stage2.label}</p>
      <div className="vc-cross">
        <div className="vc-cross__box vc-cross__box--agree">
          <p className="vc-cross__head">
            <IconCheck size={14} />
            {v.stage2.agreeLabel}
          </p>
          <ul>
            {v.stage2.agree.map((a) => (
              <li key={a}>
                <IconCheck size={12} />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="vc-cross__box vc-cross__box--disagree">
          <p className="vc-cross__head">
            <IconWarn size={14} />
            {v.stage2.disagreeLabel}
          </p>
          <ul>
            {v.stage2.disagree.map((d) => (
              <li key={d}>
                <IconArrowRight size={12} />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="vc-stage-label">{v.stage3.label}</p>
      <div className="vc-conclusion">
        <span className="vc-conclusion__icon">
          <IconSpark size={16} />
        </span>
        <p className="vc-conclusion__text">{v.stage3.text}</p>
        <span className="vc-conclusion__cta">
          {v.stage3.cta}
          <IconArrowRight size={13} />
        </span>
      </div>

      <p className="vc-footnote">{v.footnote}</p>
    </div>
  )
}
