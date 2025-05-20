import Link from "next/link"
import { KioskHeader } from "@/components/kiosk-header"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { getCategories, getFeaturedContent, getRecommendedContent } from "@/lib/cms"
import { KioskRecommendations } from "@/components/kiosk-recommendations"

export default async function KioskHome() {
  const categories = await getCategories()
  const featuredContent = await getFeaturedContent()
  const recommendedContent = await getRecommendedContent()

  return (
    <main className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <AnalyticsTracker pageId="home" />
      <KioskHeader title="Welcome to Our Information Kiosk" showAdminButton={true} />

      <div className="flex-1 overflow-auto scrollbar-hide">
        <div className="p-4 min-h-full">
          {/* Featured Content */}
          <div className="py-2">
            <FeaturedCarousel content={featuredContent} />
          </div>

          {/* Recommendations */}
          <div className="mt-6">
            <KioskRecommendations content={recommendedContent} />
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h2 className="text-lg font-bold">{category.name}</h2>
              </Link>
            ))}
          </div>

          {/* Featured Content Items */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Featured Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredContent.map((item) => (
                <Link
                  key={item.id}
                  href={`/content/${item.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex"
                >
                  <div className="relative w-1/3 aspect-square">
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
                  <div className="p-3 w-2/3">
                    <h3 className="font-bold text-base mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Spacer for bottom navigation */}
          <div className="h-20"></div>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
