'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useLanguage } from '@/components/LanguageProvider'
import { localeNames, locales, type Locale } from '@/lib/i18n'

function BrandLink({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <Link
      className="site-nav__button site-nav__brand"
      href="/"
      aria-label={label}
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

function InstagramLink({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <a
      className="site-nav__button site-nav__instagram"
      href="https://www.instagram.com/purplestreetorg/"
      target="_blank"
      rel="noreferrer"
      aria-label={label}
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

function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      className={`language-switcher${mobile ? ' language-switcher--mobile' : ''}`}
      role="group"
      aria-label={t.nav.languageLabel}
    >
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={locale === item}
          onClick={() => setLocale(item as Locale)}
        >
          {localeNames[item]}
        </button>
      ))}
    </div>
  )
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const navigation = [
    { href: '/#que-hacemos', label: t.nav.whatWeDo },
    { href: '/#sobre-mi', label: t.nav.about },
  ]

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
        <nav aria-label={t.nav.mainLabel}>
          <ul className="site-nav site-nav--desktop">
            <li className="site-nav__brand-item">
              <BrandLink label={t.nav.homeLabel} />
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
                {t.nav.contact}
              </Link>
            </li>
            <li>
              <InstagramLink label={t.nav.instagramLabel} />
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>

          <div className="site-nav-mobile">
            <BrandLink label={t.nav.homeLabel} onClick={closeMenu} />
            <button
              type="button"
              className="site-nav-mobile__toggle"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((open) => !open)}
            >
              <span>{t.nav.menu}</span>
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
            <span className="ui-arrow" aria-hidden="true">↗︎</span>
          </Link>
        ))}
        <Link
          href="/#contacto"
          className="mobile-nav-panel__contact"
          onClick={closeMenu}
        >
          <span>{t.nav.contact}</span>
          <span className="ui-arrow" aria-hidden="true">↗︎</span>
        </Link>
        <div className="mobile-nav-panel__social">
          <span>Instagram</span>
          <InstagramLink label={t.nav.instagramLabel} onClick={closeMenu} />
        </div>
        <LanguageSwitcher mobile />
      </div>
    </header>
  )
}
