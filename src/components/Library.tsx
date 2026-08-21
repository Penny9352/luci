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

        <p className="lede measure">{l.reuse.lead}</p>

        <div className="split">
          <ScreenshotFrame
            src="/shots/library-attach-menu.png"
            alt={l.reuse.attachShot.alt}
            caption={l.reuse.attachShot.caption}
            width={1130}
            height={485}
          />
          <ScreenshotFrame
            src="/shots/library-picker.png"
            alt={l.reuse.pickerShot.alt}
            caption={l.reuse.pickerShot.caption}
            width={1570}
            height={1245}
          />
        </div>
      </div>
    </Stage>
  )
}
