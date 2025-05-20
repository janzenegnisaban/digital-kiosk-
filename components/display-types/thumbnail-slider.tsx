"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ContentItem } from "@/types"

interface ThumbnailSliderProps {
  content: ContentItem
}

export function ThumbnailSlider({ content }: ThumbnailSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = content.galleryImages || [{ url: content.mediaUrl, alt: content.title }]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="mb-6">
      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
        <img
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={images[currentIndex].alt || "Featured image"}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <Button variant="outline" size="icon" className="rounded-full" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <Button variant="outline" size="icon" className="rounded-full" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-hidden mx-10">
          <div className="flex gap-2 py-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-20 aspect-square rounded-md overflow-hidden cursor-pointer ${
                  index === currentIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || "Thumbnail"}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
