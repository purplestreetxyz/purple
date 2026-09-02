'use client'

import Image, { type StaticImageData } from 'next/image'

import laura from '@/images/laura.jpg'
import logoCantonDeValais from '@/images/clients/canton-de-valais.svg'
import logoEqualSaree from '@/images/clients/equal-saree.svg'
import logoAjuntamentBarcelona from '@/images/clients/ajuntament-barcelona.svg'
import logoBarcelona2026 from '@/images/clients/barcelona-2026.png'
import logoDiputacioBarcelona from '@/images/clients/diputacio-barcelona.svg'
import logoIsGlobal from '@/images/clients/isglobal.png'
import logoJanesWalk from '@/images/clients/janes-walk.svg'
import logoLares from '@/images/clients/lares.svg'
import logoPedestrianMobility from '@/images/clients/pedestrian-mobility.svg'
import logoReplantegem from '@/images/clients/replantegem.png'
import logoTerritorisXlm from '@/images/clients/territoris-xlm.svg'
import logoUia from '@/images/clients/uia.png'
import logoMinisterioVivienda from '@/images/clients/ministerio-vivienda.png'
import logoUniversityOfFribourg from '@/images/clients/university-of-fribourg.svg'
import logoUniversityOfGeneva from '@/images/clients/university-of-geneva.svg'
import logoUniversityOfZurich from '@/images/clients/university-of-zurich.svg'
import { HeroSlideshow } from '@/components/HeroSlideshow'
import { ProjectSlideshow } from '@/components/ProjectSlideshow'
import { ProjectVideo } from '@/components/ProjectVideo'
import { useLanguage } from '@/components/LanguageProvider'

const collaborators: [string, StaticImageData][] = [
  ['Université de Genève', logoUniversityOfGeneva],
  ['University of Zurich', logoUniversityOfZurich],
  ['Université de Fribourg', logoUniversityOfFribourg],
  ['Canton du Valais', logoCantonDeValais],
  ['Equal Saree', logoEqualSaree],
  ['Pedestrian Mobility Switzerland', logoPedestrianMobility],
  ["Jane's Walk", logoJanesWalk],
  ['Lares', logoLares],
  ['Territoris XLM', logoTerritorisXlm],
  ['Replantegem', logoReplantegem],
  ['ISGlobal', logoIsGlobal],
  ['Ajuntament de Barcelona', logoAjuntamentBarcelona],
  ['Diputació de Barcelona', logoDiputacioBarcelona],
  ['UIA', logoUia],
  ['Barcelona 2026 Capital Mundial de la Arquitectura', logoBarcelona2026],
  ['Ministerio de Vivienda y Agenda Urbana', logoMinisterioVivienda],
]

const collaboratorRows = [collaborators.slice(0, 8), collaborators.slice(8)]

const universitySlides = [
  {
    src: '/media/university/university-workshop-01.jpg',
    alt: 'Taller universitario sobre urbanismo con mirada de género',
  },
  {
    src: '/media/university/university-workshop-02.jpg',
    alt: 'Presentación de un taller universitario en colaboración con Equal Saree',
  },
  {
    src: '/media/university/university-workshop-03.jpg',
    alt: 'Observación de campo con participantes de un taller universitario',
  },
  {
    src: '/media/university/university-workshop-04.jpg',
    alt: 'Sesión universitaria sobre urbanismo con mirada de género',
  },
]

const fanzineSlides = [
  {
    src: '/media/fanzines/fanzines-workshop-01.jpg',
    alt: 'Colección de fanzines feministas creados en Berlín',
  },
  {
    src: '/media/fanzines/fanzines-workshop-02.jpg',
    alt: 'Introducción a referentes feministas durante el taller de fanzines',
  },
  {
    src: '/media/fanzines/fanzines-workshop-03.jpg',
    alt: 'Niñas y niños creando sus propios fanzines feministas',
  },
  {
    src: '/media/fanzines/fanzines-workshop-04.jpg',
    alt: 'Proceso creativo del taller de fanzines feministas en Berlín',
  },
]

const accessibilitySlides = [
  {
    src: '/media/accessibility/accessibility-workshop-01.jpg',
    alt: 'Taller de accesibilidad universal en el INS Cavall Bernat',
  },
  {
    src: '/media/accessibility/accessibility-workshop-02.jpg',
    alt: 'Análisis de la accesibilidad de un baño utilizando una silla de ruedas',
  },
  {
    src: '/media/accessibility/accessibility-workshop-03.jpg',
    alt: 'Recorrido por el instituto experimentando distintas formas de movilidad',
  },
]

const manresaSlides = [
  {
    src: '/media/manresa/janes-walk-manresa-01.png',
    alt: 'Jane’s Walk junto a un comercio local de Manresa',
  },
  {
    src: '/media/manresa/janes-walk-manresa-02.png',
    alt: 'Conversación sobre las transformaciones urbanas de Manresa',
  },
  {
    src: '/media/manresa/janes-walk-manresa-03.png',
    alt: 'Participantes de Jane’s Walk compartiendo experiencias en Manresa',
  },
]

const serviceLinks = [
  {
    key: 'outreach',
    href: 'https://www.instagram.com/purplestreetorg/',
  },
  {
    key: 'workshops',
    href: '#talleres',
  },
  {
    key: 'participation',
    href: '#participacion',
  },
  {
    key: 'walks',
    href: '#paseos',
  },
  {
    key: 'research',
    href: '#investigacion',
  },
  {
    key: 'apps',
    href: '#app-digital',
  },
] as const

const Arrow = () => <span className="ui-arrow" aria-hidden="true">↗︎</span>

function EditorialChapterHeading({
  index,
  title,
}: {
  index: string
  title: React.ReactNode
}) {
  return (
    <header className="editorial-chapter-heading">
      <p className="editorial-chapter-heading__index">{index}</p>
      <h2>{title}</h2>
    </header>
  )
}

function MediaCaption({ children }: { children: React.ReactNode }) {
  return <div className="media-caption">{children}</div>
}

function EditorialProject({
  index,
  title,
  caption,
  media,
  children,
  reverse = false,
  link,
  secondaryLink,
}: {
  index: string
  title: React.ReactNode
  caption: string
  media: React.ReactNode
  children: React.ReactNode
  reverse?: boolean
  link?: { href: string; label: string }
  secondaryLink?: { href: string; label: string }
}) {
  return (
    <article className={`editorial-project${reverse ? ' is-reverse' : ''}`}>
      <figure className="editorial-project__figure">
        <div className="editorial-project__media">{media}</div>
        <figcaption>{caption}</figcaption>
      </figure>
      <div className="editorial-project__copy">
        <div className="editorial-project__meta">
          <span>{index}</span>
        </div>
        <h3>{title}</h3>
        <div className="editorial-project__text">{children}</div>
        {(link || secondaryLink) && (
          <div className="editorial-project__links">
            {[link, secondaryLink].filter(Boolean).map((projectLink) => (
              <a
                key={projectLink!.href}
                className="editorial-project__link"
                href={projectLink!.href}
                target="_blank"
                rel="noreferrer"
              >
                {projectLink!.label} <Arrow />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const copy = t.home

  return (
    <>
      <section className="studio-hero">
        <HeroSlideshow />
        <div className="studio-hero__overlay" />
        <div className="studio-hero__content">
          <h1 className="studio-hero__brand-title" aria-label="Purple Street">
            <Image
              src="/media/purple-logo-cropped.png"
              alt=""
              width={771}
              height={968}
              priority
              className="studio-hero__wordmark"
            />
          </h1>
          <p className="studio-hero__intro">
            <span>{copy.hero.line1}</span>
            <span>{copy.hero.line2}</span>
          </p>
        </div>
      </section>

      <section className="worked-with-section" aria-labelledby="worked-with-title">
        <div className="worked-with-heading">
          <h2 id="worked-with-title">{copy.workedWith}</h2>
        </div>
        <div className="logo-marquees">
          {collaboratorRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`logo-marquee${rowIndex === 1 ? ' logo-marquee--reverse' : ''}`}
            >
              <div className="logo-marquee__track">
                <div className="logo-marquee__group">
                  {row.map(([name, logo]) => (
                    <div className="logo-marquee__item" key={name}>
                      <Image src={logo} alt={name} unoptimized />
                    </div>
                  ))}
                </div>
                <div className="logo-marquee__group" aria-hidden="true">
                  {row.map(([name, logo]) => (
                    <div className="logo-marquee__item" key={`${name}-copy`}>
                      <Image src={logo} alt="" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="que-hacemos" className="services-section">
        <div className="services-intro">
          <h2>{copy.services.title}</h2>
          <div className="services-intro__story">
            {copy.services.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="services-grid">
          {serviceLinks.map((serviceLink) => {
            const service = copy.services.items[serviceLink.key]
            const isExternal = serviceLink.href.startsWith('http')
            const content = (
              <>
                <span className="service-card__arrow" aria-hidden="true">
                  {isExternal ? '↗︎' : '↘︎'}
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-card__link">
                  {isExternal
                    ? copy.services.externalLabel
                    : copy.services.internalLabel}
                </span>
              </>
            )

            return (
              <a
                key={service.title}
                href={serviceLink.href}
                className="service-card"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                {content}
              </a>
            )
          })}
        </div>
      </section>

      <div className="project-flow">
        <section
          id="talleres"
          className="chapter chapter--paper chapter--editorial"
        >
          <EditorialChapterHeading
            index="1"
            title={copy.chapters.workshops.title}
          />

          <div className="editorial-project-list">
            <EditorialProject
              index="1.1"
              title={copy.chapters.workshops.university.title}
              caption={copy.chapters.workshops.university.caption}
              media={
                <ProjectSlideshow
                  slides={universitySlides}
                  label={copy.chapters.workshops.university.mediaLabel}
                />
              }
            >
              {copy.chapters.workshops.university.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </EditorialProject>

            <EditorialProject
              index="1.2"
              title={copy.chapters.workshops.mapping.title}
              caption={copy.chapters.workshops.mapping.caption}
              reverse
              media={
                <ProjectVideo
                  src="/media/video/millorem-el-barri.m4v"
                  poster="/media/millorem-video-poster-user.png"
                />
              }
              link={{
                href: 'https://www.barcelona.cat/capitalmundialarquitectura/ca/programa/millorem-el-barri-leixample',
                label: copy.chapters.workshops.mapping.link,
              }}
            >
              {copy.chapters.workshops.mapping.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </EditorialProject>

            <EditorialProject
              index="1.3"
              title={copy.chapters.workshops.fanzines.title}
              caption={copy.chapters.workshops.fanzines.caption}
              media={
                <ProjectSlideshow
                  slides={fanzineSlides}
                  label={copy.chapters.workshops.fanzines.mediaLabel}
                />
              }
            >
              {copy.chapters.workshops.fanzines.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </EditorialProject>

            <EditorialProject
              index="1.4"
              title={copy.chapters.workshops.accessibility.title}
              caption={copy.chapters.workshops.accessibility.caption}
              reverse
              link={{
                href: 'https://www.arquitectes.cat/ca/coac/arquiescola',
                label: copy.chapters.workshops.accessibility.link,
              }}
              media={
                <ProjectSlideshow
                  slides={accessibilitySlides}
                  label={copy.chapters.workshops.accessibility.mediaLabel}
                />
              }
            >
              {copy.chapters.workshops.accessibility.paragraphs.map(
                (paragraph) => <p key={paragraph}>{paragraph}</p>,
              )}
            </EditorialProject>
          </div>
        </section>

        <section
          id="paseos"
          className="chapter chapter--editorial chapter--editorial-tint"
        >
          <EditorialChapterHeading
            index="2"
            title={copy.chapters.walks.title}
          />
          <div className="editorial-project-list">
            <EditorialProject
              index="2.1"
              title={<>Jane’s Walk<br />{copy.chapters.walks.barcelona.city}</>}
              caption={copy.chapters.walks.barcelona.caption}
              link={{
                href: 'https://www.barcelona.cat/capitalmundialarquitectura/ca/programa/janes-walk-passejada-debat-inspirada-en-la-mirada-de-jane-jacobs-eixample',
                label: copy.chapters.walks.barcelona.link,
              }}
              media={
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/media/janes-walk-sants-poster-user.png"
                >
                  <source
                    src="/media/video/janes-walk-sants.m4v"
                    type="video/mp4"
                  />
                </video>
              }
            >
              {copy.chapters.walks.barcelona.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </EditorialProject>

            <EditorialProject
              index="2.2"
              title={<>Jane’s Walk<br />{copy.chapters.walks.manresa.city}</>}
              caption={copy.chapters.walks.manresa.caption}
              reverse
              media={
                <ProjectSlideshow
                  slides={manresaSlides}
                  label={copy.chapters.walks.manresa.mediaLabel}
                />
              }
            >
              {copy.chapters.walks.manresa.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </EditorialProject>

            <EditorialProject
              index="2.3"
              title={<>Jane’s Walk<br />{copy.chapters.walks.sion.city}</>}
              caption={copy.chapters.walks.sion.caption}
              link={{
                href: 'https://janeswalk.org/',
                label: copy.chapters.walks.sion.link,
              }}
              media={
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/media/janes-walk-sion-poster-clear.jpg"
                >
                  <source
                    src="/media/video/janes-walk-sion.m4v"
                    type="video/mp4"
                  />
                </video>
              }
            >
              {copy.chapters.walks.sion.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </EditorialProject>
          </div>
        </section>

        <section
          id="participacion"
          className="chapter chapter--editorial chapter--paper"
        >
          <EditorialChapterHeading
            index="3"
            title={copy.chapters.participation.title}
          />
          <div className="editorial-project-list">
            <EditorialProject
              index="3.1"
              title={copy.chapters.participation.municipal.title}
              caption={copy.chapters.participation.municipal.caption}
              media={
                <Image
                  src="/media/participation-olesa.jpg"
                  alt={copy.chapters.participation.municipal.alt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              }
            >
              {copy.chapters.participation.municipal.paragraphs.map(
                (paragraph) => <p key={paragraph}>{paragraph}</p>,
              )}
            </EditorialProject>

            <EditorialProject
              index="3.2"
              title={copy.chapters.participation.territorial.title}
              caption={copy.chapters.participation.territorial.caption}
              reverse
              media={
                <Image
                  src="/media/participation-territorial-planning.png"
                  alt={copy.chapters.participation.territorial.alt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              }
            >
              {copy.chapters.participation.territorial.paragraphs.map(
                (paragraph) => <p key={paragraph}>{paragraph}</p>,
              )}
            </EditorialProject>

            <EditorialProject
              index="3.3"
              title={copy.chapters.participation.ecosystemic.title}
              caption={copy.chapters.participation.ecosystemic.caption}
              link={{
                href: 'https://replantegem.cat/biowater/',
                label: copy.chapters.participation.ecosystemic.link,
              }}
              media={
                <Image
                  src="/media/biowater-seniors.jpg"
                  alt={copy.chapters.participation.ecosystemic.alt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              }
            >
              {copy.chapters.participation.ecosystemic.paragraphs.map(
                (paragraph) => <p key={paragraph}>{paragraph}</p>,
              )}
            </EditorialProject>
          </div>
        </section>

        <section
          id="investigacion"
          className="chapter chapter--editorial chapter--editorial-tint"
        >
          <EditorialChapterHeading
            index="4"
            title={copy.chapters.research.title}
          />
          <div className="editorial-project-list">
            <EditorialProject
              index="4.1"
              title={copy.chapters.research.project.title}
              caption={copy.chapters.research.project.caption}
              media={
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/media/cuerpas-poster-user.png"
                  aria-label={copy.chapters.research.project.videoLabel}
                >
                  <source src="/media/cuerpas-colombia.mp4" type="video/mp4" />
                </video>
              }
              link={{
                href: 'https://www.instagram.com/cuerpasdocu/',
                label: copy.chapters.research.project.link,
              }}
            >
              {copy.chapters.research.project.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </EditorialProject>
          </div>
        </section>

        <section
          id="app-digital"
          className="chapter chapter--editorial chapter--paper"
        >
          <EditorialChapterHeading
            index="5"
            title={copy.chapters.apps.title}
          />
          <div className="editorial-project-list">
            <EditorialProject
              index="5.1"
              title={copy.chapters.apps.project.title}
              caption={copy.chapters.apps.project.caption}
              media={
                <Image
                  src="/media/xibarri/xibarri-four-screens-transparent.png"
                  alt={copy.chapters.apps.project.alt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="xibarri-four-screens"
                />
              }
              link={{
                href: 'https://xibarri.com/es/',
                label: copy.chapters.apps.project.link,
              }}
            >
              {copy.chapters.apps.project.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </EditorialProject>
          </div>
        </section>
      </div>

      <section id="sobre-mi" className="about-section">
        <div className="about-photo">
          <Image
            src={laura}
            alt={copy.about.photoAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover grayscale"
          />
        </div>
        <div className="about-copy">
          <h2>{copy.about.title}</h2>
          <div>
            {copy.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href="/manifesto"
            className="text-link editorial-project__link"
          >
            {copy.about.manifestoLink} <Arrow />
          </a>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <h2>{copy.contact}</h2>
        <div className="contact-links">
          <a href="mailto:laura@purplestreet.xyz">laura@purplestreet.xyz</a>
          <a
            href="https://www.instagram.com/purplestreetorg/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram <Arrow />
          </a>
          <a
            href="https://www.linkedin.com/in/lauramayermarcen/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow />
          </a>
        </div>
      </section>
    </>
  )
}
