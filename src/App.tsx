import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { CrossCheck } from './components/CrossCheck'
import { Scheduled } from './components/Scheduled'
import { Library } from './components/Library'
import { Models } from './components/Models'
import { Ecosystem } from './components/Ecosystem'
import { Start } from './components/Start'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#cross-check">
        跳到正文
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <div className="log">
          <CrossCheck />
          <Scheduled />
          <Library />
          <Models />
          <Ecosystem />
        </div>
        <Start />
      </main>
    </>
  )
}
