'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navigation = [
  { href: '/#que-hacemos', label: 'Qué hacemos' },
  { href: '/#sobre-mi', label: 'Sobre mí' },
]

function BrandLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      className="site-nav__button site-nav__brand"
      href="/"
      aria-label="Purple Street — inicio"
      onClick={onClick}
    >
      <Image
        src="/media/purple-glasses-cursor.png"
        alt=""
        width={160}
        height={49}
        priority
      />
    </Link>
  )
}

function InstagramLink({ onClick }: { onClick?: () => void }) {
  return (
    <a
      className="site-nav__button site-nav__instagram"
      href="https://www.instagram.com/purplestreet.xyz/"
      target="_blank"
      rel="noreferrer"
      aria-label="Purple Street en Instagram"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle cx="17.4" cy="6.7" r="1" className="is-filled" />
      </svg>
    </a>
  )
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`site-header${isOpen ? ' is-menu-open' : ''}`}>
      <div className="site-header__inner">
        <nav aria-label="Navegación principal">
          <ul className="site-nav site-nav--desktop">
            <li className="site-nav__brand-item">
              <BrandLink />
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="site-nav__button" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contacto" className="site-nav__button is-primary">
                Contacto
              </Link>
            </li>
            <li>
              <InstagramLink />
            </li>
          </ul>

          <div className="site-nav-mobile">
            <BrandLink onClick={closeMenu} />
            <button
              type="button"
              className="site-nav-mobile__toggle"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((open) => !open)}
            >
              <span>Menú</span>
              <span aria-hidden="true">{isOpen ? '×' : '+'}</span>
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-nav-panel"
        aria-hidden={!isOpen}
      >
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            <span>{item.label}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
        <Link
          href="/#contacto"
          className="mobile-nav-panel__contact"
          onClick={closeMenu}
        >
          <span>Contacto</span>
          <span aria-hidden="true">↗</span>
        </Link>
        <div className="mobile-nav-panel__social">
          <span>Instagram</span>
          <InstagramLink onClick={closeMenu} />
        </div>
      </div>
    </header>
  )
}
