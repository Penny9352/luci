/**
 * 手写图标集。统一 24 网格、1.6 描边、round 端点与拐角。
 * 不使用 emoji 或 Unicode 字符代替图标。
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12.5 9 17.5 20 6.5" />
  </Svg>
)

export const IconArrowDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v15" />
    <path d="m5.5 12.5 6.5 6.5 6.5-6.5" />
  </Svg>
)

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15" />
    <path d="m12.5 5.5 6.5 6.5-6.5 6.5" />
  </Svg>
)

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
)

export const IconFolder = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 6.5a2 2 0 0 1 2-2h3.4a2 2 0 0 1 1.5.7l1.1 1.3h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z" />
  </Svg>
)

export const IconFile = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9Z" />
    <path d="M13.5 3.5V9H19" />
  </Svg>
)

export const IconSpark = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5c.6 4.3 2.6 6.3 6.9 6.9-4.3.6-6.3 2.6-6.9 6.9-.6-4.3-2.6-6.3-6.9-6.9 4.3-.6 6.3-2.6 6.9-6.9Z" />
    <path d="M18.5 16.5c.3 2 1.2 2.9 3.2 3.2-2 .3-2.9 1.2-3.2 3.2-.3-2-1.2-2.9-3.2-3.2 2-.3 2.9-1.2 3.2-3.2Z" />
  </Svg>
)

export const IconGift = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 11h16v8.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
    <path d="M3 7.5h18V11H3z" />
    <path d="M12 7.5v13" />
    <path d="M12 7.5S10.8 3.5 8.5 3.5a2 2 0 0 0 0 4Z" />
    <path d="M12 7.5s1.2-4 3.5-4a2 2 0 0 1 0 4Z" />
  </Svg>
)

export const IconSend = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 19V5" />
    <path d="m6 11 6-6 6 6" />
  </Svg>
)

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Svg>
)

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </Svg>
)

/** 分歧标记：两条岔开的线。只出现在交叉验证语境里。 */
export const IconDiverge = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h5" />
    <path d="m9 12 5-5.5" />
    <path d="m9 12 5 5.5" />
    <circle cx="16.5" cy="6" r="1.9" />
    <circle cx="16.5" cy="18" r="1.9" />
  </Svg>
)

/** 共识标记：多条线收束成一条。logo 的形态母题。 */
export const IconConverge = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 6.5 11 12l-7 5.5" />
    <path d="M11 12h9" />
  </Svg>
)
