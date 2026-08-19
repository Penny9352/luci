import { library as l } from '../content/copy'
import { Stage } from './Stage'
import { ScreenshotFrame } from './ui/ScreenshotFrame'

export function Library() {
  return (
    <Stage id="library" stage={l.stage} name={l.stageName}>
      <div className="stack">
        <h2>{l.title}</h2>
        <p className="lede measure">{l.lead}</p>
        <ul className="tabs" aria-label="文件库分类">
          {l.tabs.map((t, i) => (
            <li key={t} className={i === 0 ? 'is-on' : undefined}>
              {t}
            </li>
          ))}
        </ul>
        <ScreenshotFrame
          src="/shots/library.png"
          alt={l.shot.alt}
          caption={l.shot.caption}
          width={1912}
          height={971}
        />
      </div>
    </Stage>
  )
}
