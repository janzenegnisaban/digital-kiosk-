"use client"

import { useState } from "react"
import type { ContentItem } from "@/types"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AccordionGalleryProps {
  content: ContentItem
}

export function AccordionGallery({ content }: AccordionGalleryProps) {
  const [openSection, setOpenSection] = useState<number | null>(0)
  const sections = content.accordionSections || [
    {
      title: "Main Image",
      content: "Main content image",
      imageUrl: content.mediaUrl,
    },
  ]

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index)
  }

  return (
    <div className="mb-6 border rounded-lg overflow-hidden">
      {sections.map((section, index) => (
        <div key={index} className="border-b last:border-b-0">
          <button
            className="flex justify-between items-center w-full p-4 text-left font-medium bg-gray-50 hover:bg-gray-100"
            onClick={() => toggleSection(index)}
          >
            <span>{section.title}</span>
            {openSection === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openSection === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4">
              <div className="aspect-video rounded-md overflow-hidden mb-4">
                <img
                  src={section.imageUrl || "/placeholder.svg"}
                  alt={section.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <p>{section.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
