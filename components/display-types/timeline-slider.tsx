"use client"

import { useState } from "react"
import type { ContentItem } from "@/types"

interface TimelineSliderProps {
  content: ContentItem
}

export function TimelineSlider({ content }: TimelineSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timelineItems = content.timelineItems || [
    {
      date: "2023",
      title: content.title,
      description: content.description,
      imageUrl: content.mediaUrl,
    },
  ]

  return (
    <div className="mb-6">
      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
        <img
          src={timelineItems[currentIndex].imageUrl || "/placeholder.svg"}
          alt={timelineItems[currentIndex].title}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="relative pt-6">
        <div className="absolute left-0 right-0 top-0 h-1 bg-gray-200 rounded-full">
          {timelineItems.map((_, index) => (
            <div
              key={index}
              className={`absolute top-0 bottom-0 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-400"
              }`}
              style={{
                left: `${(index / (timelineItems.length - 1)) * 100}%`,
                width: "10px",
                transform: "translateX(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="flex justify-between mt-4">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`text-center cursor-pointer ${
                index === currentIndex ? "text-blue-600 font-bold" : "text-gray-500"
              }`}
              style={{ width: `${100 / timelineItems.length}%` }}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="text-sm">{item.date}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-lg">{timelineItems[currentIndex].title}</h3>
          <p className="text-gray-600 mt-2">{timelineItems[currentIndex].description}</p>
        </div>
      </div>
    </div>
  )
}
