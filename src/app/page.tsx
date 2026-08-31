import { type Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Urbanismo feminista y participativo',
  description:
    'Purple Street es la práctica de Laura Mayer: talleres, marchas urbanas, investigación y herramientas digitales para crear ciudades más inclusivas y cuidadoras.',
}

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

const services = [
  {
    title: 'Divulgación',
    href: 'https://www.instagram.com/purplestreet.xyz/',
    text: 'Acercamos el urbanismo y la mirada de género a públicos y contextos diversos.',
  },
  {
    title: 'Talleres',
    href: '#talleres',
    text: 'Diseñamos experiencias de aprendizaje para universidades, institutos e infancia.',
  },
  {
    title: 'Participación ciudadana',
    href: '#participacion',
    text: 'Facilitamos procesos ciudadanos que convierten experiencias cotidianas en propuestas.',
  },
  {
    title: 'Marchas urbanas',
    href: '#paseos',
    text: 'Leemos la ciudad caminando, compartiendo memorias, cuidados y necesidades.',
  },
  {
    title: 'Investigación',
    href: '#investigacion',
    text: 'Exploramos relaciones entre cuerpxs, espacio público, memoria y representación.',
  },
  {
    title: 'Apps sociales',
    href: '#app-digital',
    text: 'Creamos herramientas digitales que hacen más fácil participar, compartir y cuidar lo común.',
  },
]

const Arrow = () => <span aria-hidden="true">↗</span>

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
            <span>Estudio de arquitectura y urbanismo</span>
            <span>con mirada de género interseccional.</span>
          </p>
        </div>
      </section>

      <section className="worked-with-section" aria-labelledby="worked-with-title">
        <div className="worked-with-heading">
          <h2 id="worked-with-title">Hemos trabajado con</h2>
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
          <h2>Qué hacemos</h2>
          <div className="services-intro__story">
            <p>
              Purple Street empezó como un proyecto de divulgación sobre el
              espacio público desde una mirada de género interseccional. A
              través de contenidos y marchas urbanas con personas vinculadas
              al territorio, fue creciendo una comunidad con ganas de observar
              y transformar la ciudad de otra manera.
            </p>
            <p>
              Hoy combinamos procesos de participación con colectivas y
              administraciones, talleres para universidades, profesionales,
              adolescencia e infancia —una etapa que nos interesa especialmente
              porque permite mirar el entorno sin tantas capas aprendidas— y el
              desarrollo de herramientas digitales sociales. En paralelo,
              investigamos cómo los cuerpos de las mujeres habitan y son
              condicionados por el espacio urbano.
            </p>
          </div>
        </div>
        <div className="services-grid">
          {services.map((service) => {
            const isExternal = service.href.startsWith('http')
            const content = (
              <>
                <span className="service-card__arrow" aria-hidden="true">
                  {isExternal ? '↗' : '↘'}
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-card__link">
                  {isExternal ? 'Ver Instagram' : 'Ver proyectos'}
                </span>
              </>
            )

            return (
              <a
                key={service.title}
                href={service.href}
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
            title="Talleres"
          />

          <div className="editorial-project-list">
            <EditorialProject
              index="1.1"
              title="Urbanism & Gender Equality Workshop"
              caption="Universidades de Ginebra, Lausana, Friburgo y Zúrich · Desde 2022"
              media={
                <ProjectSlideshow
                  slides={universitySlides}
                  label="Talleres en universidades"
                />
              }
            >
              <p>
                Desde 2022, en colaboración con la cooperativa Equal Saree,
                facilitamos talleres de urbanismo con mirada de género en las
                universidades de Ginebra, Lausana, Friburgo y Zúrich. Combinamos
                teoría del urbanismo feminista con herramientas de observación
                y reflexión individual y colectiva. A partir de experiencias
                cotidianas, el alumnado comparte perspectivas diversas, analiza
                los espacios que habita y formula propuestas para transformarlos.
              </p>
            </EditorialProject>

            <EditorialProject
              index="1.2"
              title="Mapeo participativo con infancia"
              caption="Millorem el barri · Barcelona 2026"
              reverse
              media={
                <ProjectVideo
                  src="/media/video/millorem-el-barri.m4v"
                  poster="/media/millorem-video-poster-user.png"
                />
              }
              link={{
                href: 'https://www.barcelona.cat/capitalmundialarquitectura/ca/programa/millorem-el-barri-leixample',
                label: 'Ver programa oficial',
              }}
            >
              <p>
                En el marco del festival «Capital Mundial de l’Arquitectura» en
                Barcelona, se han planteado talleres participativos dirigidos a
                la infancia. La actividad se centra en el mapeo colaborativo: a
                partir de un gran plano, se describen los itinerarios cotidianos
                y se registran los puntos fuertes y débiles del entorno según su
                experiencia. El resultado es un conjunto de propuestas que pone
                en valor la mirada de la infancia, refuerza su vínculo con el
                entorno y fomenta una lectura crítica del espacio construido.
              </p>
            </EditorialProject>

            <EditorialProject
              index="1.3"
              title="Fanzines feministas"
              caption="Fanzines feministas · Berlín 2025"
              media={
                <ProjectSlideshow
                  slides={fanzineSlides}
                  label="Fanzines feministas"
                />
              }
            >
              <p>
                Taller de expresión creativa realizado con niñas, niños y
                adolescentes de 7 a 16 años en el marco del Día de la Mujer
                Trabajadora. A través del dibujo, la pintura y el collage,
                descubren referentes feministas, construyen relatos propios y
                los transforman en publicaciones manuales individuales o
                colectivas que posteriormente se exponen.
              </p>
            </EditorialProject>

            <EditorialProject
              index="1.4"
              title="Arquitectura a les Aules"
              caption="INS Cavall Bernat · Terrassa 2025"
              reverse
              link={{
                href: 'https://www.arquitectes.cat/ca/coac/arquiescola',
                label: 'Ver proyecto Arquiescola',
              }}
              media={
                <ProjectSlideshow
                  slides={accessibilitySlides}
                  label="Arquitectura en las aulas: accesibilidad"
                />
              }
            >
              <p>
                En el marco de Arquiescola, un programa que acerca la
                arquitectura a escuelas e institutos, esta edición abordó las
                barreras arquitectónicas. A través de diferentes recorridos por
                su centro educativo, el alumnado analizó la accesibilidad de los
                espacios y desarrolló colectivamente propuestas para mejorarlos.
              </p>
            </EditorialProject>
          </div>
        </section>

        <section
          id="paseos"
          className="chapter chapter--editorial chapter--editorial-tint"
        >
          <EditorialChapterHeading
            index="2"
            title="Marchas urbanas"
          />
          <div className="editorial-project-list">
            <EditorialProject
              index="2.1"
              title={<>Jane’s Walk<br />Barcelona</>}
              caption="Jane’s Walk · Barcelona 2026"
              link={{
                href: 'https://www.barcelona.cat/capitalmundialarquitectura/ca/programa/janes-walk-passejada-debat-inspirada-en-la-mirada-de-jane-jacobs-eixample',
                label: 'Ver programa oficial',
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
              <p>
                En el marco del festival «Capital Mundial de l’Arquitectura» se
                han organizado Jane’s Walks en los diez distritos de Barcelona.
              </p>
              <p>
                Cada itinerario promueve la conversación y la exploración
                compartida del entorno. La propuesta sitúa en el centro la vida
                cotidiana —el espacio público, los cuidados, el comercio local
                y la memoria— y fomenta la pluralidad de miradas para construir
                un relato colectivo.
              </p>
            </EditorialProject>

            <EditorialProject
              index="2.2"
              title={<>Jane’s Walk<br />Manresa</>}
              caption="Jane’s Walk · Manresa 2025"
              reverse
              media={
                <ProjectSlideshow
                  slides={manresaSlides}
                  label="Jane’s Walk Manresa"
                />
              }
            >
              <p>
                En 2025 celebramos una Jane’s Walk en Manresa. Tuvimos la suerte
                de caminar junto a quien había ejercido como urbanista municipal
                de la ciudad durante muchos años y conversar sobre sus
                transformaciones urbanas, su memoria y los retos que todavía
                permanecen abiertos.
              </p>
            </EditorialProject>

            <EditorialProject
              index="2.3"
              title={<>Jane’s Walk<br />Sion</>}
              caption="Jane’s Walk · Sion 2021–2023"
              link={{
                href: 'https://janeswalk.org/',
                label: 'Conocer Jane’s Walk',
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
              <p>
                Jane’s Walk es un movimiento ciudadano de paseos conversados
                gratuitos inspirado en Jane Jacobs. En 2021, 2022 y 2023
                organizamos varias ediciones en Sion, Suiza. Cada recorrido se
                construyó junto a comercios locales, centros de arte, artesanas
                y artesanos, poniendo en valor su conocimiento y su relación
                cotidiana con el territorio. Estas colaboraciones permitieron
                compartir experiencias, detectar necesidades y construir una
                lectura colectiva de la ciudad.
              </p>
            </EditorialProject>
          </div>
        </section>

        <section
          id="participacion"
          className="chapter chapter--editorial chapter--paper"
        >
          <EditorialChapterHeading
            index="3"
            title="Participación ciudadana"
          />
          <div className="editorial-project-list">
            <EditorialProject
              index="3.1"
              title="Transformación de espacios públicos"
              caption="Espacios de uso cotidiano · Sesión abierta"
              media={
                <Image
                  src="/media/participation-olesa.jpg"
                  alt="Sesión abierta sobre espacios cotidianos"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              }
            >
              <p>
                Convertimos experiencias sobre calles, plazas y recorridos
                habituales en prioridades y propuestas concretas.
              </p>
            </EditorialProject>

            <EditorialProject
              index="3.2"
              title="Planificación territorial"
              caption="Planificación territorial · Mapeo colectivo"
              reverse
              media={
                <Image
                  src="/media/participation-territorial-planning.png"
                  alt="Mapa territorial trabajado colectivamente"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              }
            >
              <p>
                Mapas y recorridos incorporan el conocimiento cotidiano de la
                ciudadanía a los procesos de planificación.
              </p>
            </EditorialProject>

            <EditorialProject
              index="3.3"
              title="Espacios verdes urbanos"
              caption="Biowater · Taller intergeneracional"
              link={{
                href: 'https://replantegem.cat/biowater/',
                label: 'Ver proyecto Biowater',
              }}
              media={
                <Image
                  src="/media/biowater-seniors.jpg"
                  alt="Taller intergeneracional sobre espacios verdes"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              }
            >
              <p>
                Procesos intergeneracionales para pensar agua, biodiversidad,
                bienestar y adaptación climática desde experiencias diversas.
              </p>
            </EditorialProject>
          </div>
        </section>

        <section
          id="investigacion"
          className="chapter chapter--editorial chapter--editorial-tint"
        >
          <EditorialChapterHeading
            index="4"
            title="Investigación"
          />
          <div className="editorial-project-list">
            <EditorialProject
              index="4.1"
              title="Cuerpa, ciudad y relato urbano"
              caption="CUERPAS · Colombia 2023"
              media={
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/media/cuerpas-poster-user.png"
                  aria-label="Fragmento audiovisual del proyecto CUERPAS"
                >
                  <source src="/media/cuerpas-colombia.mp4" type="video/mp4" />
                </video>
              }
              link={{
                href: 'https://www.instagram.com/cuerpasdocu/',
                label: 'Ver CUERPAS en Instagram',
              }}
            >
              <p>
                Conversaciones y recorridos con grafiteras, poetas y artistas
                sobre cómo las mujeres habitan, narran y transforman la ciudad.
              </p>
            </EditorialProject>
          </div>
        </section>

        <section
          id="app-digital"
          className="chapter chapter--editorial chapter--paper"
        >
          <EditorialChapterHeading
            index="5"
            title="Apps sociales"
          />
          <div className="editorial-project-list">
            <EditorialProject
              index="5.1"
              title="xibarri"
              caption="xibarri · App ciudadana"
              media={
                <Image
                  src="/media/xibarri/xibarri-four-screens-white.png"
                  alt="Cuatro pantallas de xibarri: incidencia, mapa, ranking y perfil"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="xibarri-four-screens"
                />
              }
              link={{
                href: 'https://xibarri.com/es/',
                label: 'Descubrir xibarri',
              }}
            >
              <p>
                Diseñamos herramientas digitales que conectan ciudadanía y
                territorio. xibarri permite localizar, compartir y seguir
                propuestas e incidencias del barrio.
              </p>
            </EditorialProject>
          </div>
        </section>
      </div>

      <section id="sobre-mi" className="about-section">
        <div className="about-photo">
          <Image
            src={laura}
            alt="Laura Mayer, arquitecta y urbanista"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover grayscale"
          />
        </div>
        <div className="about-copy">
          <h2>Arquitecta y urbanista feminista</h2>
          <div>
            <p>
              Me formé en arquitectura y urbanismo y cursé un máster en estudios
              de género para trabajar la ciudad desde una mirada feminista
              interseccional.
            </p>
            <p>
              He desarrollado proyectos en España, Alemania, Suiza y Colombia
              junto a equipos de arquitectura, arte, ecología, instituciones
              públicas y organizaciones comunitarias.
            </p>
          </div>
          <a
            href="/manifesto"
            className="text-link editorial-project__link"
          >
            Leer el manifiesto <Arrow />
          </a>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <h2>Contacto</h2>
        <div className="contact-links">
          <a href="mailto:laura@purplestreet.xyz">laura@purplestreet.xyz</a>
          <a
            href="https://www.instagram.com/purplestreet.xyz/"
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
