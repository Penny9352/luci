import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Workspace } from './components/Workspace'
import { Audience } from './components/Audience'
import { Case } from './components/Case'
import { Models } from './components/Models'
import { Ecosystem } from './components/Ecosystem'
import { Start } from './components/Start'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#workspace">
        跳到正文
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Workspace />
        <Audience />
        <Case />
        <Models />
        <Ecosystem />
        <Start />
      </main>
    </>
  )
}
