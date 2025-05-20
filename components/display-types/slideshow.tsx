"use client"

import { useState, useEffect } from "react"
import type { ContentItem } from "@/types"

interface SlideshowProps {
  content: ContentItem
}

export function Slideshow({ content }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = content.galleryImages || [{ url: content.mediaUrl, alt: content.title }]

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.url || "/placeholder.svg"}
            alt={image.alt || "Slideshow image"}
            className="object-contain w-full h-full"
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-white/60"}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
