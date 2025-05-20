import Link from "next/link"
import { getContentByType } from "@/lib/cms"
import { ReactionButtons } from "@/components/reaction-buttons"

interface ContentSectionProps {
  title: string
  contentType: string
  className?: string
}

export async function ContentSection({ title, contentType, className = "" }: ContentSectionProps) {
  const content = await getContentByType(contentType, 3)

  return (
    <section className={`p-4 md:p-6 lg:p-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link href={`/category/${contentType}`} className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
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
                  <img
                    src={item.mediaUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-blue-600 border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 pt-2 flex-1">
                <p className="text-gray-600 line-clamp-2">{item.description}</p>
                <div className="mt-3">
                  <ReactionButtons contentId={item.id} reactions={item.reactions} isPreview={true} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
