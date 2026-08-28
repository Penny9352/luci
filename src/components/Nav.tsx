import { useEffect, useState } from 'react'
import { nav, ALT_LANG, LOGIN_URL } from '../content/copy'
import { Button } from './ui/Button'
import { IconMenu, IconClose } from './ui/Icon'

export function Nav() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          <img src="/logo.svg" alt="" width={22} height={34} />
          <span>{nav.brand}</span>
        </a>

        <nav className="nav__links" aria-label={nav.navLabel}>
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          {/* 换语言 = 换页面。两种语言各有真实 URL，这里就是一个普通链接 */}
          <a className="nav__lang" href={ALT_LANG.href} hrefLang={ALT_LANG.code} aria-label={nav.langSwitch}>
            {ALT_LANG.label}
          </a>
          <a className="nav__login" href={LOGIN_URL}>
            {nav.login}
          </a>
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
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={LOGIN_URL}>{nav.login}</a>
        </div>
      )}
    </header>
  )
}
