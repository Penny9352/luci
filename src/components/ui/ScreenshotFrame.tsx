type Props = {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
  /** 真实截图为 true；本站绘制的示意为 false */
  authentic?: boolean
  className?: string
}

/**
 * 产品截图统一放进内嵌框，与页面隔离，不直接平铺在暗底上。
 */
export function ScreenshotFrame({
  src,
  alt,
  caption,
  width,
  height,
  authentic = true,
  className,
}: Props) {
  return (
    <figure className={['shot', className].filter(Boolean).join(' ')}>
      <div className="shot__frame">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </div>
      {caption && (
        <figcaption className="shot__caption">
          {!authentic && <span className="shot__tag">示意图</span>}
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
