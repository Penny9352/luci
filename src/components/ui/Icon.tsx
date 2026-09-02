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

/** 表格/表单文件：案例里作为上下文附件的 xlsx */
export const IconTable = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <path d="M3.5 9.5h17" />
    <path d="M9 9.5V19.5" />
    <path d="M15 9.5V19.5" />
  </Svg>
)

export const IconSpark = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5c.6 4.3 2.6 6.3 6.9 6.9-4.3.6-6.3 2.6-6.9 6.9-.6-4.3-2.6-6.3-6.9-6.9 4.3-.6 6.3-2.6 6.9-6.9Z" />
    <path d="M18.5 16.5c.3 2 1.2 2.9 3.2 3.2-2 .3-2.9 1.2-3.2 3.2-.3-2-1.2-2.9-3.2-3.2 2-.3 2.9-1.2 3.2-3.2Z" />
  </Svg>
)

/** 文件卡片：代码/文档产出的文件类型标记 */
export const IconCode = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9 8-4.5 4 4.5 4" />
    <path d="m15 8 4.5 4-4.5 4" />
  </Svg>
)

/** 文件卡片：预览 */
export const IconEye = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.6" />
  </Svg>
)

/** 文件卡片：下载 */
export const IconDownload = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 17.5v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2" />
  </Svg>
)

/** 切换：两条方向相反的线 */
export const IconSwap = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8.5h14" />
    <path d="m14 4.5 4 4-4 4" />
    <path d="M20 15.5H6" />
    <path d="m10 11.5-4 4 4 4" />
  </Svg>
)

/** 四宫格：自由选择的多个选项 */
export const IconGrid = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </Svg>
)

/** 闪电：一键、即时 */
export const IconBolt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 3 5 13.5h5.3L10 21l8-11h-5.3L13 3Z" />
  </Svg>
)

/** 盾牌：交叉验证 */
export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.3 5 6v6c0 4.6 3 7.6 7 8.7 4-1.1 7-4.1 7-8.7V6l-7-2.7Z" />
    <path d="m9 12 2 2 4-4.5" />
  </Svg>
)

/** 饼图：聚合、汇总不同来源 */
export const IconPie = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4v8l6.9 4" />
  </Svg>
)

/** 地球：Web 入口 */
export const IconGlobe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c3 3 3 15 0 18" />
    <path d="M12 3c-3 3-3 15 0 18" />
  </Svg>
)

/** 一大一小两个对话气泡：企业微信 / 飞书这类多个协作工具的入口 */
export const IconChatCluster = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7.5a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9l-3.5 3v-3H7a3 3 0 0 1-3-3Z" />
    <circle cx="18.5" cy="17" r="3" />
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

/** 自定义模型：手动拨定 */
export const IconSliders = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8h9" />
    <path d="M17 8h3" />
    <circle cx="15" cy="8" r="2.1" />
    <path d="M4 16h3" />
    <path d="M11 16h9" />
    <circle cx="9" cy="16" r="2.1" />
  </Svg>
)

/** 绑定到聊天软件 */
export const IconLink = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.6 1.6" />
    <path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 1 0 5.7 5.7l1.6-1.6" />
  </Svg>
)

/** 产品里模式旁边的说明入口 */
export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5" />
    <path d="M12 8.2v.1" />
  </Svg>
)

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.5v15" />
    <path d="M4.5 12h15" />
  </Svg>
)

/** 输入框「+」菜单里的「从电脑上传」 */
export const IconPaperclip = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21.4 11.05 12.25 20.2a6 6 0 0 1-8.5-8.48l9.2-9.2a4 4 0 0 1 5.65 5.66l-9.19 9.2a2 2 0 0 1-2.83-2.83l8.49-8.49" />
  </Svg>
)

export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10.8" cy="10.8" r="6.8" />
    <path d="m19.5 19.5-4-4" />
  </Svg>
)

/** 读取/写入文件的工具调用标记 */
export const IconTool = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
  </Svg>
)

/* ── 适用人群。沿用同一套 24 网格 / 1.6 描边 ───────────────── */

export const IconFlask = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.5 3h5" />
    <path d="M10.5 3v5.6L5.1 17.3A2 2 0 0 0 6.8 20.4h10.4a2 2 0 0 0 1.7-3.1L13.5 8.6V3" />
    <path d="M7.7 14.8h8.6" />
  </Svg>
)

export const IconTarget = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="7.6" />
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 1.6v2.4M12 20v2.4M1.6 12h2.4M20 12h2.4" />
  </Svg>
)

export const IconTrend = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 16.8l5.6-5.6 3.4 3.4L21 6" />
    <path d="M15.2 6H21v5.8" />
  </Svg>
)

export const IconPen = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20h4L19.4 8.6a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M14.4 6.6l3 3" />
  </Svg>
)

export const IconUsers = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9.2" cy="8.2" r="3.3" />
    <path d="M3.2 19.2a6 6 0 0 1 12 0" />
    <path d="M16.4 5.5a3.3 3.3 0 0 1 0 5.4" />
    <path d="M17.6 14.1a6 6 0 0 1 3.2 5.1" />
  </Svg>
)

export const IconWarn = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.8 2.9 19.6a1 1 0 0 0 .87 1.5h16.46a1 1 0 0 0 .87-1.5L12 3.8z" />
    <path d="M12 9.6v4.3" />
    <path d="M12 17.3h.01" />
  </Svg>
)
