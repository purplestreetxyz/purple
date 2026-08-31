'use client'

import { useState } from 'react'

export function ProjectVideo({
  src,
  poster,
}: {
  src: string
  poster: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <video
      className={isPlaying ? 'is-playing' : undefined}
      controls
      playsInline
      preload="metadata"
      poster={poster}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onEnded={() => setIsPlaying(false)}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
