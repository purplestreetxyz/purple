'use client'

import { usePathname } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  locales,
  translations,
  type Locale,
  type Translation,
} from '@/lib/i18n'

const STORAGE_KEY = 'purple-street-language'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLocale(value: string | null): value is Locale {
  return value !== null && locales.includes(value as Locale)
}

function getBrowserLocale(): Locale {
  const language = navigator.language.toLowerCase()

  if (language.startsWith('ca')) return 'ca'
  if (language.startsWith('fr')) return 'fr'
  if (language.startsWith('en')) return 'en'
  return 'es'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [locale, updateLocale] = useState<Locale>('es')

  useEffect(() => {
    const urlLocale = new URL(window.location.href).searchParams.get('lang')
    const storedLocale = window.localStorage.getItem(STORAGE_KEY)
    const initialLocale = isLocale(urlLocale)
      ? urlLocale
      : isLocale(storedLocale)
        ? storedLocale
        : getBrowserLocale()

    updateLocale(initialLocale)
  }, [])

  const setLocale = (nextLocale: Locale) => {
    updateLocale(nextLocale)
    window.localStorage.setItem(STORAGE_KEY, nextLocale)

    const url = new URL(window.location.href)
    url.searchParams.set('lang', nextLocale)
    window.history.replaceState({}, '', url)
  }

  const value = useMemo(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale],
  )

  useEffect(() => {
    const copy = translations[locale]
    const isManifesto = pathname === '/manifesto'

    document.documentElement.lang = locale
    document.title = isManifesto
      ? `${copy.manifesto.pageTitle.toLowerCase()} · purple street`
      : 'purple street'

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (description) {
      description.content = isManifesto
        ? copy.manifesto.description
        : copy.home.hero.line1 + ' ' + copy.home.hero.line2
    }
  }, [locale, pathname])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }

  return context
}
