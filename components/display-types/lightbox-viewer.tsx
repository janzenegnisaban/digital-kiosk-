"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { ContentItem } from "@/types"

interface LightboxViewerProps {
  content: ContentItem
}

export function LightboxViewer({ content }: LightboxViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = content.galleryImages || [{ url: content.mediaUrl, alt: content.title }]

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded-md overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.alt || "Gallery image"}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={closeLightbox}>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6 text-white" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>

          <img
            src={images[currentIndex].url || "/placeholder.svg"}
            alt={images[currentIndex].alt || "Lightbox image"}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
