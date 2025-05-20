"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, MessageSquare, ImageIcon } from "lucide-react"

// Mock feedback data
const mockFeedback = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    message: "The kiosk is very intuitive and easy to use. I found all the information I needed quickly.",
    hasMedia: true,
    mediaType: "image",
    mediaUrl: "/placeholder.svg?height=400&width=600",
    createdAt: "2025-05-15T14:30:00Z",
    status: "new",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    message: "I had trouble finding the events section. Maybe make the navigation buttons larger?",
    hasMedia: false,
    createdAt: "2025-05-14T10:15:00Z",
    status: "read",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    message: "The video quality is excellent, but it would be nice to have captions for accessibility.",
    hasMedia: true,
    mediaType: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    createdAt: "2025-05-13T16:45:00Z",
    status: "new",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    message: "I love the new design! Much more modern and user-friendly than the old system.",
    hasMedia: false,
    createdAt: "2025-05-12T09:20:00Z",
    status: "read",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    message:
      "The FAQ section was very helpful. I would suggest adding a search feature to find specific questions more easily.",
    hasMedia: false,
    createdAt: "2025-05-11T13:10:00Z",
    status: "read",
  },
]

export function FeedbackViewer() {
  const [feedback, setFeedback] = useState(mockFeedback)
  const [filter, setFilter] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredFeedback = filter === "all" ? feedback : feedback.filter((item) => item.status === filter)

  const markAsRead = (id: string) => {
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, status: "read" } : item)))
  }

  const viewFeedback = (item: any) => {
    setSelectedFeedback(item)
    setIsDialogOpen(true)

    if (item.status === "new") {
      markAsRead(item.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">User Feedback</h2>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2">
              {feedback.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="new">
            New
            <Badge variant="secondary" className="ml-2">
              {feedback.filter((item) => item.status === "new").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="read">
            Read
            <Badge variant="secondary" className="ml-2">
              {feedback.filter((item) => item.status === "read").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="space-y-4">
            {filteredFeedback.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No feedback found.</p>
            ) : (
              filteredFeedback.map((item) => (
                <Card key={item.id} className={item.status === "new" ? "border-blue-500" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{item.name}</CardTitle>
                          <div className="text-xs text-gray-500">{item.email}</div>
                        </div>
                      </div>
                      {item.status === "new" && <Badge>New</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2 mb-3">{item.message}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        {item.hasMedia && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            {item.mediaType === "image" ? (
                              <ImageIcon className="h-3 w-3" />
                            ) : (
                              <MessageSquare className="h-3 w-3" />
                            )}
                            Media
                          </Badge>
                        )}
                        <Button size="sm" variant="outline" onClick={() => viewFeedback(item)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedFeedback && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Feedback from {selectedFeedback.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{selectedFeedback.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedFeedback.name}</div>
                  <div className="text-sm text-gray-500">{selectedFeedback.email}</div>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Submitted on {new Date(selectedFeedback.createdAt).toLocaleString()}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">{selectedFeedback.message}</div>

              {selectedFeedback.hasMedia && (
                <div>
                  <div className="font-medium mb-2">Attached Media:</div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                    {selectedFeedback.mediaType === "image" ? (
                      <img
                        src={selectedFeedback.mediaUrl || "/placeholder.svg"}
                        alt="Feedback media"
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <video src={selectedFeedback.mediaUrl} controls className="object-contain w-full h-full">
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
