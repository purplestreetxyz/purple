import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Manifesto · Purple Street',
  description:
    'Los principios de Purple Street para una ciudad accesible, cuidadora, segura y representativa.',
}

const principles = [
  {
    title: 'Accesibilidad',
    text: 'Todas las personas pueden orientarse y circular con autonomía, independientemente de su movilidad, edad o diversidad funcional. El espacio indica dónde estás, hacia dónde vas y cómo llegar.',
  },
  {
    title: 'Seguridad informal',
    text: 'La seguridad aparece cuando hay ojos en la calle: plantas bajas activas, usos diversos, buena iluminación, recorridos visibles y ausencia de rincones oscuros.',
  },
  {
    title: 'Cuidados',
    text: 'La calle permite cuidar, acompañar y descansar. Hay bancos, sombra, baños públicos accesibles y espacios cómodos para la infancia y para quienes cuidan.',
  },
  {
    title: 'Confort',
    text: 'Vegetación, agua potable, sombra y materiales permeables ayudan a estar mejor, drenar lluvias fuertes y evitar superficies que queman. El confort es salud urbana.',
  },
  {
    title: 'Memoria y representación',
    text: 'Murales, historia cotidiana, arte local y lugares de encuentro sin consumo hacen sitio a mujeres, colectivos disidentes y otras vidas históricamente invisibilizadas.',
  },
  {
    title: 'Participación',
    text: 'La ciudad se construye con quienes la habitan. Las soluciones deben situarse en un territorio concreto y responder a las necesidades de una población concreta.',
  },
]

export default function ManifestoPage() {
  return (
    <section className="street-manifest-layout manifesto-page">
      <aside className="street-rail" aria-label="Una purple street">
        <div className="street-rail__sticky">
          <Image
            src="/media/interactive-street.png"
            alt="Ilustración de una calle con vegetación, juego, cuidados y espacios colectivos"
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
          Volver a Purple Street
        </Link>
        <h1>Manifiesto</h1>
        <p className="street-manifest-lead">
          Cuando nos ponemos las «gafas lilas», activamos una mirada de género
          interseccional sobre los espacios: observamos si responden a las
          necesidades de las personas que los usan, si son inclusivos, respetan
          distintos ritmos, facilitan los cuidados y reconocen la diversidad.
          Estos indicadores nos ayudan a leerlos, cuestionarlos y transformarlos.
        </p>

        <div className="street-principles">
          {principles.map((principle) => (
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
