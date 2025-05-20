"use client"

import type { ContentItem } from "@/types"
import { ContentDisplay } from "@/components/content-display"

interface DisplayTypePreviewProps {
  content: ContentItem
}

export function DisplayTypePreview({ content }: DisplayTypePreviewProps) {
  // Create a temporary content item with mock gallery images if needed
  const previewContent = {
    ...content,
    id: content.id || "preview",
    title: content.title || "Preview Title",
    description: content.description || "Preview Description",
    mediaUrl: content.mediaUrl || "/placeholder.svg",
    mediaType: content.mediaType || "image",
    // Add mock data for different display types
    galleryImages: [
      { url: content.mediaUrl || "/placeholder.svg?height=400&width=600", alt: "Image 1" },
      { url: "/placeholder.svg?height=400&width=600&text=Image+2", alt: "Image 2" },
      { url: "/placeholder.svg?height=400&width=600&text=Image+3", alt: "Image 3" },
      { url: "/placeholder.svg?height=400&width=600&text=Image+4", alt: "Image 4" },
    ],
    videoPlaylist: [
      {
        title: content.title || "Video 1",
        description: content.description || "Video description",
        url: content.mediaUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/placeholder.svg",
      },
      {
        title: "Video 2",
        description: "Another video description",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "/placeholder.svg?text=Video+2",
      },
    ],
    accordionSections: [
      {
        title: "Section 1",
        content: "This is the content for section 1",
        imageUrl: content.mediaUrl || "/placeholder.svg",
      },
      {
        title: "Section 2",
        content: "This is the content for section 2",
        imageUrl: "/placeholder.svg?text=Section+2",
      },
      {
        title: "Section 3",
        content: "This is the content for section 3",
        imageUrl: "/placeholder.svg?text=Section+3",
      },
    ],
    timelineItems: [
      {
        date: "2020",
        title: "First Event",
        description: "Description of the first event",
        imageUrl: content.mediaUrl || "/placeholder.svg?text=2020",
      },
      {
        date: "2021",
        title: "Second Event",
        description: "Description of the second event",
        imageUrl: "/placeholder.svg?text=2021",
      },
      {
        date: "2022",
        title: "Third Event",
        description: "Description of the third event",
        imageUrl: "/placeholder.svg?text=2022",
      },
      {
        date: "2023",
        title: "Fourth Event",
        description: "Description of the fourth event",
        imageUrl: "/placeholder.svg?text=2023",
      },
    ],
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-bold mb-4">
        Preview:{" "}
        {content.displayType ? content.displayType.charAt(0).toUpperCase() + content.displayType.slice(1) : "Default"}
      </h2>
      <ContentDisplay content={previewContent} />
    </div>
  )
}
