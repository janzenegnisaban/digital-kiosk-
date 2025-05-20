"use client"

import { useState } from "react"
import type { ContentItem } from "@/types"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MasonryLayoutProps {
  content: ContentItem
}

export function MasonryLayout({ content }: MasonryLayoutProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const images = content.galleryImages || [{ url: content.mediaUrl, alt: content.title }]

  // Create columns for masonry layout
  const getColumns = () => {
    const columns: Array<typeof images> = [[], [], []]

    images.forEach((image, index) => {
      columns[index % 3].push(image)
    })

    return columns
  }

  const columns = getColumns()

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-2">
            {column.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className={`rounded-md overflow-hidden cursor-pointer ${
                  imgIndex % 2 === 0 ? "aspect-square" : "aspect-[3/4]"
                }`}
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || "Gallery image"}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <img src={selectedImage || "/placeholder.svg"} alt="Enlarged view" className="w-full h-auto object-contain" />
        </DialogContent>
      </Dialog>
    </div>
  )
}
