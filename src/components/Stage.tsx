import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

type Props = {
  id: string
  stage: string
  name: string
  children: ReactNode
  /** 浅色间奏段：轨线反相为深色 */
  light?: boolean
}

/**
 * 日志轨的一节。
 *
 * 页面从首屏往下就是一条执行日志：左侧常驻沟槽，每个区块是一个阶段。
 * 阶段滚进视口时，标记与轨线由待执行翻成已完成 —— 这是全页唯一的
 * 主动效，其余区块不做入场动画。
 */
export function Stage({ id, stage, name, children, light = false }: Props) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={['stage', light && 'stage--light', inView && 'is-done'].filter(Boolean).join(' ')}
    >
      <div className="stage__rail" aria-hidden="true">
        <span className="stage__marker" />
        <span className="stage__line" />
      </div>

      <div className="stage__meta" aria-hidden="true">
        <span className="stage__num num">{stage}</span>
        <span className="stage__name">{name}</span>
        <span className="stage__state num">{inView ? '已完成' : '待执行'}</span>
      </div>

      <div className="stage__body">{children}</div>
    </section>
  )
}
