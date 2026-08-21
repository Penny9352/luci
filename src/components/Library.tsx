import { library as l } from '../content/copy'
import { Stage } from './Stage'
import { LibraryDemo } from './LibraryDemo'

export function Library() {
  return (
    <Stage id="library" stage={l.stage} name={l.stageName}>
      <div className="stack">
        <h2>{l.title}</h2>
        <p className="lede measure">{l.lead}</p>
        <p className="lede measure">{l.reuse.lead}</p>

        <LibraryDemo />
      </div>
    </Stage>
  )
}
