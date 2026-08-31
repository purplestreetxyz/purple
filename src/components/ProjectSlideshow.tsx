'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function ProjectSlideshow({
  slides,
  label,
}: {
  slides: { src: string; alt: string; position?: string }[]
  label: string
}) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [slides.length])

  return (
    <div className="project-slideshow" aria-label={label}>
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`project-slideshow__slide${index === activeSlide ? ' is-active' : ''}`}
          aria-hidden={index !== activeSlide}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            style={{ objectPosition: slide.position ?? 'center' }}
          />
        </div>
      ))}
    </div>
  )
}
