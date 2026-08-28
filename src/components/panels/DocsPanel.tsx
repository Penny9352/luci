import { workspace as w } from '../../content/copy'
import { IconFile, IconSearch } from '../ui/Icon'

/**
 * 文档管理面板。列头与文件行按产品的文件库信息绘制，非截图。
 */
export function DocsPanel() {
  return (
    <div className="ws-docs" aria-hidden="true">
      <p className="ws-docs__search">
        <IconSearch size={14} />
        {w.docs.search}
      </p>

      <div className="ws-docs__body">
        <nav className="ws-docs__folders">
          {w.docs.folders.map((f, i) => (
            <p className={['ws-docs__folder', i === 0 && 'is-on'].filter(Boolean).join(' ')} key={f}>
              {f}
            </p>
          ))}
        </nav>

        <div className="ws-docs__list">
          <p className="ws-docs__head">
            <span>{w.docs.head.name}</span>
            <span>{w.docs.head.time}</span>
            <span>{w.docs.head.state}</span>
          </p>
          {w.docs.files.map((f) => (
            <p className="ws-docs__row" key={f.name}>
              <span className="ws-docs__file">
                <IconFile size={14} />
                <span>
                  <span className="ws-docs__name">{f.name}</span>
                  <span className="ws-docs__meta">{f.meta}</span>
                </span>
              </span>
              <span className="ws-docs__time num">{f.time}</span>
              <span className="ws-docs__state">{f.state}</span>
            </p>
          ))}
        </div>
      </div>

      <p className="ws-docs__tip">
        <strong>{w.docs.tipStrong}</strong>
        {w.docs.tip}
      </p>
    </div>
  )
}
