export interface Category {
  id: string
  name: string
  slug: string
  icon: string
}

export interface Reactions {
  thumbsUp: number
  thumbsDown: number
  love: number
  sad: number
  [key: string]: number
}

export interface GalleryImage {
  url: string
  alt?: string
}

export interface VideoItem {
  title: string
  description: string
  url: string
  thumbnail: string
}

export interface AccordionSection {
  title: string
  content: string
  imageUrl: string
}

export interface TimelineItem {
  date: string
  title: string
  description: string
  imageUrl: string
}

export interface ContentItem {
  id: string
  title: string
  description: string
  body: string
  mediaType: "image" | "video"
  mediaUrl: string
  categoryId: string
  createdAt: string
  updatedAt: string
  reactions: Reactions
  displayType?: string
  galleryImages?: GalleryImage[]
  videoPlaylist?: VideoItem[]
  accordionSections?: AccordionSection[]
  timelineItems?: TimelineItem[]
  type?: string
}

export interface Comment {
  id: string
  contentId: string
  name: string
  text: string
  createdAt: string
}
