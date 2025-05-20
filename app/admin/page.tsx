"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ContentManager } from "@/components/admin/content-manager"
import { CategoryManager } from "@/components/admin/category-manager"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { FeedbackViewer } from "@/components/admin/feedback-viewer"
import { LogOut, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("content")
  const [projectTitle, setProjectTitle] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter()

  // Load the project title from localStorage on component mount
  useEffect(() => {
    const savedTitle = localStorage.getItem("kioskProjectTitle")
    if (savedTitle) {
      setProjectTitle(savedTitle)
    }
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  const saveProjectTitle = () => {
    if (projectTitle.trim()) {
      localStorage.setItem("kioskProjectTitle", projectTitle.trim())
      setIsSaved(true)

      // Reset the saved indicator after 2 seconds
      setTimeout(() => {
        setIsSaved(false)
      }, 2000)
    }
  }

  return (
    <main className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <div className="flex justify-between items-center bg-blue-600 text-white p-4">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2 ml-6">
            <Label htmlFor="projectTitle" className="text-white">
              Project Title:
            </Label>
            <Input
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter project title"
              className="w-64 bg-blue-700 text-white border-blue-500 focus-visible:ring-blue-400"
            />
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-blue-700"
              onClick={saveProjectTitle}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaved ? "Saved!" : "Save"}
            </Button>
          </div>
        </div>
        <Button variant="outline" className="text-white border-white hover:bg-blue-700" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white border-b">
            <TabsList className="w-full justify-start p-0 h-auto bg-transparent">
              <TabsTrigger
                value="content"
                className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                Content
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                Feedback
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="content" className="mt-0 h-full">
              <ContentManager />
            </TabsContent>

            <TabsContent value="categories" className="mt-0 h-full">
              <CategoryManager />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0 h-full">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="feedback" className="mt-0 h-full">
              <FeedbackViewer />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}
