'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '@/components/LanguageProvider'

export default function ManifestoPage() {
  const { t } = useLanguage()
  const copy = t.manifesto

  return (
    <section className="street-manifest-layout manifesto-page">
      <aside className="street-rail" aria-label={copy.streetLabel}>
        <div className="street-rail__sticky">
          <Image
            src="/media/interactive-street.png"
            alt={copy.streetAlt}
            fill
            priority
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="street-rail__image"
          />
        </div>
      </aside>

      <div className="street-manifest-copy">
        <Link className="manifesto-page__back" href="/">
          <span aria-hidden="true">←</span>
          {copy.back}
        </Link>
        <h1>{copy.pageTitle}</h1>
        <p className="street-manifest-lead">{copy.intro}</p>

        <div className="street-principles">
          {copy.principles.map((principle) => (
            <article key={principle.title}>
              <details open>
                <summary>{principle.title}</summary>
                <p>{principle.text}</p>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
