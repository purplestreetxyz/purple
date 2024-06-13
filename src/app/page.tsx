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
    <div className="bg-black py-20 sm:mt-8">
      <Container>
        <FadeIn className="flex items-center justify-center gap-x-8">
          <h2 className="text-center font-display text-lg tracking-wider text-white">
            We’ve worked with universities, companies and public entities ッ
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
                    className="mx-auto"
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
      <Container className="mt-24">
        <div className="relative flex h-[500px] items-center  justify-between text-center">
          <FadeIn>
            <h2 className="text-md font-bold">Did you know</h2>
            <h1 className="helvetica font-outline font-display text-3xl text-neutral-950 sm:text-7xl">
              Urban Planning can improve gender equality
            </h1>
            <h2 className="text-md mt-10 text-center sm:text-xl">
              At Purple Street, we analyse public spaces with a gender and
              intersectional approach through our walks, workshops, and
              educational materials.
            </h2>
          </FadeIn>
        </div>
      </Container>
      <Clients />
      <Container>
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
              <div className="w-full space-y-2 p-6 sm:w-1/2 sm:p-10">
                <h2 className="font-outline text-4xl tracking-tight text-neutral-950">
                  Workshops
                </h2>
                <p>
                  Workshops aim to merge theory and practical field observation
                  to inspire participants in{' '}
                  <strong className="font-medium">
                    creating ideas for potential solutions
                  </strong>
                  applicable to various environments. Targeted mainly at
                  university students, it focuses on architecture, urban
                  planning, sociology, and geography.
                </p>
                <div>
                  <a
                    href="/workshop.pdf"
                    download="Purple Street Workshop Information"
                  >
                    <Button invert>Get more info</Button>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <div id="walks">
          <FadeIn>
            <div className="flex w-full flex-col items-center justify-center sm:flex-row">
              <div className="order-2 w-full space-y-2 p-6 sm:w-1/2 sm:p-10">
                <h2 className="font-outline text-4xl tracking-tight text-neutral-950">
                  Walks
                </h2>
                <p>
                  Inspired by Jane Jacobs, an American activist known for her
                  influence on urban studies, exploratory walks are a{' '}
                  <strong className="font-medium">
                    feminist participatory methodology
                  </strong>{' '}
                  that has evolved and adapted over the years to various
                  contexts. These walks involve groups of local residents, who
                  walk through their neighborhoods to assess different aspects
                  that affect their perception of safety and urban quality.
                </p>
                <div>
                  <a
                    href="/walks.pdf"
                    download="Purple Street Walks Information"
                  >
                    <Button invert>Get more info</Button>
                  </a>
                </div>
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
              <div className="w-full space-y-2 p-6 sm:w-1/2 sm:p-10">
                <h2 className="font-outline text-4xl tracking-tight text-neutral-950">
                  Courses
                </h2>
                <p>
                  Our educational materials are designed to integrate urban
                  planning and gender perspectives into school curricula,
                  fostering awareness and understanding among students. These
                  resources include comprehensive course modules, engaging
                  presentations, and practical worksheets.
                </p>
                <a href="#contact">
                  <Button invert>Get in touch</Button>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      <div id="about-us" className="bg-black py-20 sm:mt-8">
        <Container>
          <FadeIn>
            <div className="w-full gap-8 space-y-4 text-white sm:flex sm:space-y-0">
              <div className="w-full sm:w-1/3">
                <Image
                  className="aspect-[3/2] w-full object-cover grayscale"
                  src={laura}
                  alt="Laura Mayer"
                />
                <h3 className="mt-6 inline-flex items-center text-lg font-semibold leading-8">
                  Laura Mayer, Founder
                </h3>
                <p className="pre text-base leading-7">
                  laura@purplestreet.xyz
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href="https://www.linkedin.com/in/lauramayermarcen/"
                    className=""
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="white"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/purplestreet.xyz/"
                    className=""
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="white"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.104 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 0 1-1.153 1.772c-.5.509-1.104.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63Zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.096 3.096 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058ZM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27Zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666Zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-2/3">
                <p className="text-base leading-7">
                  Laura began her journey by leading exploratory walks inspired
                  by the work and life of Jane Jacobs. These walks focused on
                  observing and understanding everyday urban life from a unique
                  perspective. As her passion for gender-inclusive urban
                  planning grew, Laura partnered with Equal Saree, a team of
                  feminist architects and urban planners. Together, they
                  developed the Urbanism & Gender Equality workshops.
                </p>
                <p className="mt-4 text-base leading-7">
                  Laura&apos;s goal is to promote a gender intersectional
                  perspective in public spaces and educational fields. She
                  believes it&apos;s crucial to educate the next generation
                  about the importance of gender equality in urban planning to
                  create more inclusive, safe, and vibrant communities. Join
                  Laura in her mission to transform our cities and schools for a
                  better future.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>

      <Testimonial
        className="mt-10"
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

      <div id="contact">
        <ContactSection />
      </div>
    </>
  )
}
