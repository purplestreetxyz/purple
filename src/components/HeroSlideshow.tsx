'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const slides = [
  {
    src: '/media/hero/hero-workshop-01.jpg',
    alt: 'Taller participativo de mapeo con infancia en el espacio público',
    position: 'center 62%',
  },
  {
    src: '/media/hero/hero-workshop-02.jpg',
    alt: 'Infancia y personas adultas dibujando propuestas sobre un mapa urbano',
    position: 'center',
  },
  {
    src: '/media/hero/hero-workshop-03.jpg',
    alt: 'Participante dibujando su calle ideal durante un taller urbano',
    position: 'center 56%',
  },
  {
    src: '/media/hero/hero-workshop-04.jpg',
    alt: 'Actividad participativa de Mejoramos el barrio en Barcelona',
    position: 'center',
  },
  {
    src: '/media/hero/hero-workshop-05.jpg',
    alt: 'Taller sobre urbanismo con mirada de género en una universidad',
    position: 'center',
  },
  {
    src: '/media/hero/hero-workshop-06.jpg',
    alt: 'Niñas, niños y personas cuidadoras participando sobre un gran mapa',
    position: 'center 58%',
  },
  {
    src: '/media/hero/hero-workshop-07.jpg',
    alt: 'Taller ciudadano al aire libre en una plaza de Barcelona',
    position: 'center 68%',
  },
  {
    src: '/media/hero/hero-workshop-08.jpg',
    alt: 'Taller infantil de dibujo y mapeo de recorridos cotidianos',
    position: 'center 62%',
  },
]

export function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion) return

    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="studio-hero__slides" aria-hidden="true">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`studio-hero__slide${index === activeSlide ? ' is-active' : ''}`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="studio-hero__image"
            style={{ objectPosition: slide.position }}
          />
        </div>
      ))}
    </div>
  )
}
