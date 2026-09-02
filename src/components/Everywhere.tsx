import type { ReactNode } from 'react'
import { everywhere as ev } from '../content/copy.zh'
import { asset } from '../lib/asset'
import { Stage } from './Stage'
import { IconChatCluster, IconCode, IconGlobe } from './ui/Icon'

const ICONS: Record<string, typeof IconGlobe> = {
  web: IconGlobe,
  team: IconChatCluster,
  api: IconCode,
}

function ChannelIcon({ icon }: { icon: string }) {
  if (icon === 'wechat') return <img src={asset('logos/wechat.png')} alt="" width={44} height={44} />
  const Ico = ICONS[icon] ?? IconGlobe
  return <Ico size={40} />
}

/** 标题里的品牌名换成无衬线粗体 + 品牌橙——跟首屏 .hero__accent 处理「AI」是同一个理由 */
function withAccent(text: string): ReactNode[] {
  return text.split(/(Lucimix)/g).map((part, i) =>
    part === 'Lucimix' ? (
      <span className="hero__accent" key={i}>
        {part}
      </span>
    ) : (
      part
    )
  )
}

/**
 * 多端可用：独立一屏，插在工作台「文档管理」和「定时任务」之间——
 * 只上中文站（见 Workspace.tsx 的 insertAfterDocs），tint 由调用方算好
 * 传进来，好接上工作台四屏的色块交替。
 */
export function Everywhere({ tint }: { tint: boolean }) {
  return (
    <Stage id="everywhere" tint={tint}>
      <div className="section-head">
        <h2>{withAccent(ev.title)}</h2>
        <p className="lede">{ev.leadLine1}</p>
        <p className="lede">{ev.leadLine2}</p>
      </div>

      <div className="everywhere__grid">
        {ev.channels.map((c) => (
          <div className={`everywhere__item everywhere__item--${c.icon}`} key={c.icon}>
            <span className="everywhere__icon">
              <ChannelIcon icon={c.icon} />
            </span>
            <p className="everywhere__name">{c.name}</p>
            <p className="everywhere__line1">{c.line1}</p>
            <p className="everywhere__line2">{c.line2}</p>
          </div>
        ))}
      </div>
    </Stage>
  )
}
