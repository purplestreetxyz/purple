'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export function GlassesCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')

    if (!finePointer.matches || !cursorRef.current) return

    const cursor = cursorRef.current

    const moveCursor = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX + 34}px`
      cursor.style.top = `${event.clientY + 18}px`
      cursor.classList.add('is-visible')
    }

    const updateHover = (event: PointerEvent) => {
      const target = event.target
      const interactive =
        target instanceof Element &&
        Boolean(target.closest('a, button, summary, input, textarea, select, video'))

      cursor.classList.toggle('is-active', interactive)
    }

    const hideCursor = () => cursor.classList.remove('is-visible')

    window.addEventListener('pointermove', moveCursor)
    window.addEventListener('pointerover', updateHover)
    document.documentElement.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('pointermove', moveCursor)
      window.removeEventListener('pointerover', updateHover)
      document.documentElement.removeEventListener('mouseleave', hideCursor)
    }
  }, [])

  return (
    <div ref={cursorRef} className="glasses-cursor" aria-hidden="true">
      <Image
        className="glasses-cursor__image"
        src="/media/purple-glasses-cursor.png"
        alt=""
        width={160}
        height={49}
        priority
      />
    </div>
  )
}
