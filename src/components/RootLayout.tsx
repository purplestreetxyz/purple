'use client'

import { MotionConfig, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useState } from 'react'
import logo from '@/images/icon.svg'

import { Footer } from '@/components/Footer'
import SlideOver from './SlideOver'
import Image from 'next/image'

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function Header() {
  const [slideOverOpen, setSlideOverOpen] = useState(false)

  return (
    <header className="fixed top-0 z-10 w-full w-full border-b bg-white">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="relative -mt-3 flex items-center gap-4">
          <Image src={logo} alt="Purple Street logo" width={25} height={25} />
        </Link>
        <div className="sm:hidden">
          <button
            onClick={() => setSlideOverOpen(true)}
            className="text-neutral-700"
          >
            Menu
          </button>
          <SlideOver
            open={slideOverOpen}
            onClose={() => setSlideOverOpen(false)}
            className=""
          >
            <nav>
              <ul
                className="gothic
            gap-y-6
            font-display
            text-sm
            uppercase
            tracking-wider
            text-neutral-700
          "
                onClick={() => setSlideOverOpen(false)}
              >
                <li>
                  <Link href="#workshops">Workshops</Link>
                </li>
                <li>
                  <Link href="#walks">Walks</Link>
                </li>
                <li>
                  <Link href="#courses">Courses</Link>
                </li>
                <li>
                  <Link href="#about-us">About us</Link>
                </li>
                <li>
                  <Link href="#contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </SlideOver>
        </div>
        <div className="hidden items-center space-x-6 sm:flex">
          <nav className="flex items-center gap-6">
            <ul
              className="gothic flex
            gap-x-6
            font-display
            text-sm
            uppercase
            tracking-wider
            text-neutral-700
          "
            >
              <li>
                <Link href="#workshops">Workshops</Link>
              </li>
              <li>
                <Link href="#walks">Walks</Link>
              </li>
              <li>
                <Link href="#courses">Courses</Link>
              </li>
              <li>
                <Link href="#about-us">About us</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  let shouldReduceMotion = useReducedMotion()

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <Header />
      <motion.div
        layout
        className="relative flex flex-auto overflow-hidden bg-white"
      >
        <motion.div layout className="relative isolate flex w-full flex-col">
          <main className="w-full">{children}</main>

          <Footer />
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname}>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
