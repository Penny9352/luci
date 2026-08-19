import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost'
  children: ReactNode
}

/**
 * 主按钮是橙底深字：白字对 #ff6b00 只有 2.9:1，不达标。
 */
export function Button({ variant = 'primary', children, className, ...rest }: Props) {
  return (
    <a className={['btn', `btn--${variant}`, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </a>
  )
}
