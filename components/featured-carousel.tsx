"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ReactionButtons } from "@/components/reaction-buttons"
import type { ContentItem } from "@/types"
import Link from "next/link"

interface FeaturedCarouselProps {
  content: ContentItem[]
}

export function FeaturedCarousel({ content }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? content.length - 1 : prevIndex - 1))
  }

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === content.length - 1 ? 0 : prevIndex + 1))
  }

  if (!content.length) {
    return <div className="text-center">No featured content available</div>
  }

  const currentItem = content[currentIndex]

  return (
    <div className="relative w-full">
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

      <Link href={`/content/${currentItem.id}`} className="block">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 pb-2">
            <h2 className="text-xl font-bold">{currentItem.title}</h2>
          </div>

          <div className="relative" style={{ height: "calc(80vh - 250px)", maxHeight: "400px" }}>
            {currentItem.mediaType === "image" ? (
              <img
                src={currentItem.mediaUrl || "/placeholder.svg"}
                alt={currentItem.title}
                className="object-contain w-full h-full"
              />
            ) : (
              <video src={currentItem.mediaUrl} controls className="object-contain w-full h-full">
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="p-4">
            <p className="text-gray-600 mb-3">{currentItem.description}</p>
            <ReactionButtons contentId={currentItem.id} reactions={currentItem.reactions} isPreview={true} />
          </div>
        </div>
      </Link>

      <div className="flex justify-center mt-4">
        {content.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
