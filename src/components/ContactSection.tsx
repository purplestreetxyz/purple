import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import Image from 'next/image'
import logo from '@/images/icon.svg'

export function ContactSection() {
  return (
    <Container className="">
      <FadeIn className="-mx-6 px-6 py-20 sm:mx-0 md:px-12">
        <div className="py-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start learning today.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button>Get in touch</Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
