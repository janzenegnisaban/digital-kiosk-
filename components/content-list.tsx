import Link from "next/link"
import type { ContentItem } from "@/types"
import { ReactionButtons } from "@/components/reaction-buttons"

interface ContentListProps {
  items: ContentItem[]
}

export function ContentList({ items }: ContentListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/content/${item.id}`}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
        >
          <div className="p-4 pb-2">
            <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
          </div>
          <div className="relative w-full aspect-[16/9]">
            {item.mediaType === "image" ? (
              <img src={item.mediaUrl || "/placeholder.svg"} alt={item.title} className="object-cover w-full h-full" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-blue-600 border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 pt-2 flex-1">
            <p className="text-gray-600 line-clamp-3">{item.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <ReactionButtons contentId={item.id} reactions={item.reactions} isPreview={true} />
              <div className="text-blue-600 font-medium">Read More</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
