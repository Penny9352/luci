import { LANG } from './content/copy'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Workspace } from './components/Workspace'
import { Models } from './components/Models'
import { Everywhere } from './components/Everywhere'
import { Ecosystem } from './components/Ecosystem'
import { Start } from './components/Start'

/**
 * 中文站目前跑一条独立顺序——模型段挪到第二屏、生态应用整段拿掉、
 * 文档管理后面插了「多端可用」一屏，英文站维持原来的顺序（工作台→
 * 模型→生态应用）不受影响，定稿后再一起搬。色块交替顺序换了，
 * Workspace 的 tint 要跟着中文这条新顺序翻一次，靠 flip prop 传，
 * 不写死在组件里。
 */
const zh = LANG === 'zh'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#workspace">
        跳到正文
      </a>
      <Nav />
      <main id="main">
        <Hero />
        {zh && <Models />}
        <Workspace flip={zh} insertAfterDocs={zh ? (tint) => <Everywhere tint={tint} /> : undefined} />
        {!zh && (
          <>
            <Models />
            <Ecosystem />
          </>
        )}
        <Start />
      </main>
    </>
  )
}
