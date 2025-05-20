"use client"

import { useState } from "react"
import type { ContentItem } from "@/types"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface GridGalleryProps {
  content: ContentItem
}

export function GridGallery({ content }: GridGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const images = content.galleryImages || [{ url: content.mediaUrl, alt: content.title }]

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded-md overflow-hidden cursor-pointer"
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

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <img src={selectedImage || "/placeholder.svg"} alt="Enlarged view" className="w-full h-auto object-contain" />
        </DialogContent>
      </Dialog>
    </div>
  )
}
