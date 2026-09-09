import { useEffect, useState } from 'react'
import { nav, LOGIN_URL } from '../content/copy'
import { asset } from '../lib/asset'
import { Button } from './ui/Button'
import { IconMenu, IconClose } from './ui/Icon'

export function Nav() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  /** 当前滚到的段落，用来点亮导航 */
  const [current, setCurrent] = useState('')

  useEffect(() => {
    const ids = nav.links.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1))

    const onScroll = () => {
      setStuck(window.scrollY > 8)

      // 判定线取导航下沿再往下一点：段落顶越过这条线就算「进入」
      const line = window.scrollY + 140
      let hit = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) hit = id
      }
      // 触底时锁定最后一段 —— 否则页尾那段永远等不到自己越过判定线
      const doc = document.documentElement
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) hit = ids[ids.length - 1]
      setCurrent(hit)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={['nav', stuck && 'is-stuck'].filter(Boolean).join(' ')}>
      <div className="nav__inner page">
        <a className="nav__brand" href="#top">
          <img src={asset('logo.svg')} alt="" width={22} height={34} />
          <span>{nav.brand}</span>
        </a>

        <nav className="nav__links" aria-label={nav.navLabel}>
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.href === `#${current}` ? 'true' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <Button href={LOGIN_URL}>{nav.cta}</Button>
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-label={open ? nav.menuClose : nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__sheet">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.href === `#${current}` ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
