import { KioskHeader } from "@/components/kiosk-header"
import { BackButton } from "@/components/back-button"
import { CommentSection } from "@/components/comment-section"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { getContentById, getRelatedContent } from "@/lib/cms"
import { ContentCard } from "@/components/content-card"
import { ReactionButtons } from "@/components/reaction-buttons"
import { ContentDisplay } from "@/components/content-display"
import { ReportButton } from "@/components/report-button"

export default async function ContentPage({ params }: { params: { id: string } }) {
  const content = await getContentById(params.id)
  const relatedContent = await getRelatedContent(params.id)

  if (!content) {
    return <div>Content not found</div>
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <AnalyticsTracker pageId={`content-${params.id}`} contentType={content.type} />
      <KioskHeader title={content.title} />
      <div className="p-4 md:p-6 lg:p-8">
        <BackButton />

        <article className="mt-6 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{content.title}</h1>
            <ReportButton contentId={params.id} />
          </div>

          <ContentDisplay content={content} />

          <div className="my-6">
            <ReactionButtons contentId={params.id} reactions={content.reactions} isPreview={false} />
          </div>

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.body }} />

          <div className="mt-8">
            <CommentSection contentId={params.id} />
          </div>
        </article>

        {relatedContent.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Related Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedContent.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
