import Link from "next/link"
import type { ContentItem } from "@/types"
import { ReactionButtons } from "@/components/reaction-buttons"

interface ContentCardProps {
  content: ContentItem
}

export function ContentCard({ content }: ContentCardProps) {
  return (
    <Link
      href={`/content/${content.id}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
    >
      <div className="p-4 pb-2">
        <h3 className="font-bold text-lg line-clamp-1">{content.title}</h3>
      </div>
      <div className="relative w-full aspect-[16/9]">
        {content.mediaType === "image" ? (
          <img
            src={content.mediaUrl || "/placeholder.svg"}
            alt={content.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
              <div className="w-0 h-0 border-t-6 border-t-transparent border-l-8 border-l-blue-600 border-b-6 border-b-transparent ml-1"></div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 pt-2 flex-1">
        <p className="text-gray-600 text-sm line-clamp-2">{content.description}</p>
        <div className="mt-3">
          <ReactionButtons contentId={content.id} reactions={content.reactions} isPreview={true} />
        </div>
      </div>
    </Link>
  )
}
