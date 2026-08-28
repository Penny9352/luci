import type { ReactNode } from 'react'

type Props = {
  id: string
  children: ReactNode
  /** 上色块：暖灰通栏。与白底段交替出现，整页才有断句 */
  tint?: boolean
}

/**
 * 一个正文段 = 一整幅色块。
 *
 * 原来分段靠卡片边界（暖灰圆角卡浮在白页上），现在改为整幅通栏色块
 * 交替 —— 卡片会在段与段之间留出白边，色块是硬接缝，节奏更清楚，
 * 也更经得起段落变多。
 */
export function Stage({ id, children, tint = false }: Props) {
  return (
    <section id={id} className={['stage', tint && 'stage--tint'].filter(Boolean).join(' ')}>
      <div className="stage__inner page">{children}</div>
    </section>
  )
}
