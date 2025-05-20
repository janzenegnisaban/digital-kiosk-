"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ContentItem } from "@/types"

interface ImageCarouselProps {
  content: ContentItem
}

export function ImageCarousel({ content }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = content.galleryImages || [{ url: content.mediaUrl, alt: content.title }]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-white"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white" onClick={goToNext}>
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <img
        src={images[currentIndex].url || "/placeholder.svg"}
        alt={images[currentIndex].alt || "Gallery image"}
        className="object-contain w-full h-full"
      />

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
