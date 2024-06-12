import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export function ContactSection() {
  return (
    <Container className="">
      <FadeIn className="-mx-6 px-6 py-20 sm:mx-0 md:px-12">
        <div className="py-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get in touch with us
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button>Email us</Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
