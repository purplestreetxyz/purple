import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export function ContactSection() {
  return (
    <Container className="">
      <FadeIn className="-mx-6 px-6 py-20 sm:mx-0 md:px-12">
        <div className="py-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-outline text-3xl mb-2 font-bold tracking-tight sm:text-4xl">
              Want to learn more?
            </h2>
            <p>
              Get in touch with us via email at{' '}
              <a href="mailto:laura@purplestreet.xyz" className="underline">laura@purplestreet.xyz</a>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="mailto:laura@purplestreet.xyz">
              <Button>Email us</Button>
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
