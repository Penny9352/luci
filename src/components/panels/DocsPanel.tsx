import { LANG, workspace as w } from '../../content/copy'
import { IconCheck, IconFile, IconSearch, IconSend } from '../ui/Icon'

/**
 * 文档管理面板。列头与文件行按产品的文件库信息绘制，非截图。
 */
export function DocsPanel() {
  if (LANG === 'zh') return <ChineseDocsPanel />

  return <LegacyDocsPanel />
}

function LegacyDocsPanel() {
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

function ChineseDocsPanel() {
  return (
    <div className="ws-docs ws-docs--zh" aria-hidden="true">
      <p className="ws-docs__search">
        <IconSearch size={14} />
        {w.docs.search}
      </p>

      <div className="ws-docs__body ws-docs__body--zh">
        <nav className="ws-docs__categories">
          {w.docs.folders.map((folder, index) => (
            <p className={['ws-docs__folder', index === 0 && 'is-on'].filter(Boolean).join(' ')} key={folder}>
              {folder}
            </p>
          ))}
        </nav>

        <div className="ws-docs__list">
          <p className="ws-docs__head">
            <span>{w.docs.head.name}</span>
            <span>{w.docs.head.time}</span>
            <span>{w.docs.head.state}</span>
          </p>
          {w.docs.files.map((file) => (
            <p className="ws-docs__row" key={file.name}>
              <span className="ws-docs__file">
                <IconFile size={14} />
                <span>
                  <span className="ws-docs__name">{file.name}</span>
                  <span className="ws-docs__meta">{file.meta}</span>
                </span>
              </span>
              <span className="ws-docs__time num">{file.time}</span>
              <span className="ws-docs__state">{file.state}</span>
            </p>
          ))}
        </div>
      </div>

    </div>
  )
}

export function DocsCrossPanel() {
  return (
    <>
      <div className="ws-docs__cross" aria-hidden="true">
        <div className="ws-docs__cross-head">
          <div>
            <h4>跨对话使用</h4>
            <p>你可以在新的对话中直接引用已保存的文件，Lucimix 会基于文件内容提供更准确的回答。</p>
          </div>
          <span className="ws-docs__cross-close">×</span>
        </div>
        <div className="ws-docs__cross-field">
          <strong>选择要引用的文件</strong>
          <div className="ws-docs__cross-file">
            <IconFile size={15} />
            <span>
              <b>{w.docs.files[0].name}</b>
              <small>{w.docs.files[0].meta}</small>
            </span>
            <span className="ws-docs__cross-remove">×</span>
          </div>
          <div className="ws-docs__cross-prompt">
            <span>基于这份产品规划，帮我总结 Q4 的功能优先级和资源需求。</span>
            <span className="ws-docs__cross-send"><IconSend size={14} /></span>
          </div>
          <p className="ws-docs__cross-note"><IconCheck size={13} /> 已选择 1 个文件，将在本次对话中作为上下文使用</p>
        </div>
      </div>
      <p className="ws-docs__cross-callout" aria-hidden="true">
        <span className="ws-docs__cross-callout-arrow" />
        在新对话中<br />
        引用文件
      </p>
    </>
  )
}
