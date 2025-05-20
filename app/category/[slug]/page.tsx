import { KioskHeader } from "@/components/kiosk-header"
import { BackButton } from "@/components/back-button"
import { ContentList } from "@/components/content-list"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { getCategoryBySlug, getCategoryContent } from "@/lib/cms"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug)
  const content = await getCategoryContent(params.slug)

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <AnalyticsTracker pageId={`category-${params.slug}`} />
      <KioskHeader title={category.name} />
      <div className="p-4 md:p-6 lg:p-8">
        <BackButton />
        <div className="mt-6">
          <ContentList items={content} />
        </div>
      </div>
    </main>
  )
}
