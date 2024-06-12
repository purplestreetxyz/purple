import { type Metadata } from 'next'
import Image from 'next/image'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Testimonial } from '@/components/Testimonial'
import logoJanesWalk from '@/images/clients/janes-walk.svg'
import logoUniversityOfZurich from '@/images/clients/university-of-zurich.svg'
import logoPedestriansMobility from '@/images/clients/pedestrian-mobility.svg'
import logoEqualSaree from '@/images/clients/equal-saree.svg'
import logoCantonDeValais from '@/images/clients/canton-de-valais.svg'
import logoUniversityOfGeneva from '@/images/clients/university-of-geneva.svg'
import logoUniversityOfFribourg from '@/images/clients/university-of-fribourg.svg'
import logoLares from '@/images/clients/lares.svg'
import workshopInFribourg from '@/images/workshop-fribourg.jpeg'
import workshopInGeneva from '@/images/workshop-geneva.jpg'
import laura from '@/images/laura.jpeg'
import { Button } from '@/components/Button'

const clients = [
  ['University of Geneva', logoUniversityOfGeneva],
  ['University of Zurich', logoUniversityOfZurich],
  ['University of Fribourg', logoUniversityOfFribourg],
  ['Canton de Valais', logoCantonDeValais],
  ['Equal Saree', logoEqualSaree],
  ['Pedestrians Mobility', logoPedestriansMobility],
  ['Janes Walk', logoJanesWalk],
  ['Lares', logoLares],
]

function Clients() {
  return (
    <div className=" py-20 sm:mt-8 sm:py-32">
      <Container>
        <FadeIn className="flex items-center justify-center gap-x-8">
          <h2 className="text-center font-display text-sm tracking-wider">
            We’ve worked with amazing people
          </h2>
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image
                    src={logo}
                    alt={client}
                    unoptimized
                    className="mx-auto invert"
                  />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  description:
    'At Purple Street, we create inclusive urban spaces through workshops and educational content. We empower universities, schools, companies, and public entities to adopt an intersectional and feminist approach to urbanism and education. Together, we can build cities for everyone.',
}

export default async function Home() {
  return (
    <>
      <Container className="mt-24 text-center sm:mt-32 md:mt-56">
        <FadeIn>
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
          <h1 className="helvetica font-outline font-display text-5xl uppercase tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Did you know...
          </h1>
          <p className="mt-6 text-4xl text-neutral-950">
            that Urban Planning can improve gender equality?
          </p>
          <h1 className="helvetica font-outline font-display text-5xl uppercase tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Have you ever thought of...
          </h1>
          <p className="mt-6 text-4xl text-neutral-950">
            that Urban Planning can improve gender equality?
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <div id="workshops">
        <FadeIn>
          <div className="w-full items-center justify-center sm:flex">
            <div className="w-full sm:w-1/2">
              <Image
                src={workshopInGeneva}
                alt="University of Geneva"
                className="grayscale"
              />
            </div>
            <div className="w-full p-6 sm:w-1/2 sm:p-10">
              <h2 className="font-display text-3xl tracking-tight text-neutral-950">
                Workshops
              </h2>
              <p>
                Interactive and engaging workshops designed to educate
                participants on feminist urbanism and intersectional approaches.
              </p>
              <Button>Get in touch</Button>
            </div>
          </div>
        </FadeIn>
      </div>
      <div id="walks">
        <FadeIn>
          <div className="flex w-full flex-col items-center justify-center sm:flex-row">
            <div className="order-2 w-full p-6 sm:w-1/2 sm:p-10">
              <h2 className="font-display text-3xl tracking-tight text-neutral-950">
                Walks
              </h2>
              <p>
                Guided walks that explore urban spaces through a feminist and
                intersectional lens, highlighting areas for improvement and best
                practices.
              </p>
              <Button>Get in touch</Button>
            </div>
            <div className="order-1 w-full sm:order-2 sm:w-1/2">
              <Image
                src={workshopInFribourg}
                alt="University of Zurich"
                className="grayscale"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      <div id="courses">
        <FadeIn>
          <div className="w-full items-center justify-center sm:flex">
            <div className="w-full sm:w-1/2">
              <Image
                src={workshopInGeneva}
                alt="University of Geneva"
                className="grayscale"
              />{' '}
            </div>
            <div className="w-full p-6 sm:w-1/2 sm:p-10">
              <h2 className="font-display text-3xl tracking-tight text-neutral-950">
                Courses
              </h2>
              <p>
                Interactive and engaging workshops designed to educate
                participants on feminist urbanism and intersectional approaches.
              </p>
              <Button>Get in touch</Button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div id="about-us">
        <FadeIn>
          <div className="w-full items-center justify-center sm:flex">
            <div className="w-full sm:w-1/2">
              <Image src={laura} alt="Laura Mayer" className="grayscale" />
            </div>
            <div className="w-full p-6 sm:w-1/2 sm:p-10">
              <h2 className="font-display text-3xl tracking-tight text-neutral-950">
                Hi there! I&apos;m Laura
              </h2>
              <p>
                Interactive and engaging workshops designed to educate
                participants on feminist urbanism and intersectional approaches.
              </p>
              <Button>Get in touch</Button>
            </div>
          </div>
        </FadeIn>
      </div>

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{
          name: 'University of Fribourg',
          logo: logoUniversityOfFribourg,
        }}
      >
        Having Laura Mayer in my MA-seminar on Built Communities here at the
        Social Anthropology Unit of the University of Fribourg was a great
        experience for me and my students. Laura’s enthusiastic, knowledgeable
        and engaged way of leading the 3-hour session on gender and urbanism was
        fantastic!
      </Testimonial>

      <ContactSection />
    </>
  )
}
