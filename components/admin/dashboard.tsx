"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentManager } from "@/components/admin/content-manager"
import { CategoryManager } from "@/components/admin/category-manager"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { FeedbackViewer } from "@/components/admin/feedback-viewer"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("content")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <ContentManager />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <CategoryManager />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <FeedbackViewer />
        </TabsContent>
      </Tabs>
    </div>
  )
}
