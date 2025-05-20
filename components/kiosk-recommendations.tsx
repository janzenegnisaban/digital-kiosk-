import Link from "next/link"
import type { ContentItem } from "@/types"

interface KioskRecommendationsProps {
  content: ContentItem[]
}

export function KioskRecommendations({ content }: KioskRecommendationsProps) {
  if (!content.length) return null

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {content.map((item) => (
            <Link
              key={item.id}
              href={`/content/${item.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col w-64"
            >
              <div className="relative aspect-video">
                {item.mediaType === "image" ? (
                  <img
                    src={item.mediaUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-blue-600 border-b-4 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 flex-1">
                <h3 className="font-bold text-base mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
