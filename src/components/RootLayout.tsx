'use client'

import { MotionConfig, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useState } from 'react'

import { Footer } from '@/components/Footer'

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function Header() {
  return (
    <header className="fixed top-0 z-10 w-full w-full border-b bg-white">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="relative -mt-3 flex items-center gap-4">
          <h1 className="mt-2 text-3xl font-medium">Purple</h1>
          <span className="absolute -bottom-3 right-0 text-sm">street</span>
        </Link>
        <div className="hidden items-center space-x-6 sm:flex">
          <nav>
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
          <main className="w-full flex-auto">{children}</main>

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
