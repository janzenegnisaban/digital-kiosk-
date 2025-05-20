"use client"
import type { ContentItem } from "@/types"
import { ImageCarousel } from "@/components/display-types/image-carousel"
import { Slideshow } from "@/components/display-types/slideshow"
import { GridGallery } from "@/components/display-types/grid-gallery"
import { LightboxViewer } from "@/components/display-types/lightbox-viewer"
import { MasonryLayout } from "@/components/display-types/masonry-layout"
import { AccordionGallery } from "@/components/display-types/accordion-gallery"
import { VideoPlaylist } from "@/components/display-types/video-playlist"
import { ThumbnailSlider } from "@/components/display-types/thumbnail-slider"
import { TimelineSlider } from "@/components/display-types/timeline-slider"

interface ContentDisplayProps {
  content: ContentItem
}

export function ContentDisplay({ content }: ContentDisplayProps) {
  // For simplicity, we'll implement a few display types and use a default for others
  switch (content.displayType) {
    case "imageCarousel":
      return <ImageCarousel content={content} />
    case "slideshow":
      return <Slideshow content={content} />
    case "gridGallery":
      return <GridGallery content={content} />
    case "lightbox":
      return <LightboxViewer content={content} />
    case "masonry":
      return <MasonryLayout content={content} />
    case "accordion":
      return <AccordionGallery content={content} />
    case "videoPlaylist":
      return <VideoPlaylist content={content} />
    case "thumbnailSlider":
      return <ThumbnailSlider content={content} />
    case "timeline":
      return <TimelineSlider content={content} />
    default:
      // Default display for content without a specific display type
      return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
          {content.mediaType === "image" ? (
            <img
              src={content.mediaUrl || "/placeholder.svg"}
              alt={content.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <video src={content.mediaUrl} controls className="object-cover w-full h-full">
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )
  }
}
