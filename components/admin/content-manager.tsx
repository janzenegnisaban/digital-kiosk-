"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, FileUp, ImageIcon, Video, Eye } from "lucide-react"
import { getAllContent, getCategories, createContent, updateContent, deleteContent } from "@/lib/cms"
import type { ContentItem, Category } from "@/types"
import { DisplayTypePreview } from "@/components/admin/display-type-preview"

export function ContentManager() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState<Partial<ContentItem>>({
    reactions: { thumbsUp: 0, thumbsDown: 0, love: 0, sad: 0 },
    displayType: "default",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contentData, categoriesData] = await Promise.all([getAllContent(), getCategories()])

        setContent(contentData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredContent = content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditing && currentItem.id) {
        const updated = await updateContent(currentItem.id, currentItem as ContentItem)
        setContent(content.map((item) => (item.id === updated.id ? updated : item)))
      } else {
        const newItem = await createContent(currentItem as ContentItem)
        setContent([newItem, ...content])
      }

      resetForm()
    } catch (error) {
      console.error("Error saving content:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      try {
        await deleteContent(id)
        setContent(content.filter((item) => item.id !== id))
      } catch (error) {
        console.error("Error deleting content:", error)
      }
    }
  }

  const handleEdit = (item: ContentItem) => {
    setCurrentItem(item)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentItem({
      reactions: { thumbsUp: 0, thumbsDown: 0, love: 0, sad: 0 },
      displayType: "default",
    })
    setIsEditing(false)
    setIsDialogOpen(false)
    setIsPreviewOpen(false)
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you would upload this file to your storage service
    // and get back a URL. For this example, we'll create a fake URL.
    const mediaType = file.type.startsWith("image/") ? "image" : "video"
    const fakeUrl = URL.createObjectURL(file)

    setCurrentItem({
      ...currentItem,
      mediaType,
      mediaUrl: fakeUrl,
    })
  }

  const displayTypeOptions = [
    { value: "default", label: "Default" },
    { value: "imageCarousel", label: "Image Carousel" },
    { value: "slideshow", label: "Slideshow" },
    { value: "gridGallery", label: "Grid Gallery" },
    { value: "lightbox", label: "Lightbox Viewer" },
    { value: "masonry", label: "Masonry Layout" },
    { value: "accordion", label: "Accordion Gallery" },
    { value: "videoPlaylist", label: "Video Playlist" },
    { value: "thumbnailSlider", label: "Thumbnail Slider" },
    { value: "timeline", label: "Timeline Slider" },
  ]

  if (isLoading) {
    return <div>Loading content...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentItem({
                  reactions: { thumbsUp: 0, thumbsDown: 0, love: 0, sad: 0 },
                  displayType: "default",
                })
                setIsEditing(false)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Content" : "Add New Content"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={currentItem.title || ""}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    placeholder="Enter title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={currentItem.categoryId}
                    onValueChange={(value) => setCurrentItem({ ...currentItem, categoryId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentItem.description || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                  placeholder="Enter a brief description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayType">Display Type</Label>
                <div className="flex gap-2">
                  <Select
                    value={currentItem.displayType}
                    onValueChange={(value) => setCurrentItem({ ...currentItem, displayType: value })}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select display type" />
                    </SelectTrigger>
                    <SelectContent>
                      {displayTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Media</Label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("media-upload")?.click()}
                      className="flex items-center gap-2"
                    >
                      <FileUp className="h-4 w-4" />
                      Upload Media
                    </Button>
                    <Input
                      id="media-upload"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />

                    {currentItem.mediaType && (
                      <div className="flex items-center gap-2 text-sm">
                        {currentItem.mediaType === "image" ? (
                          <ImageIcon className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Video className="h-4 w-4 text-blue-500" />
                        )}
                        <span>{currentItem.mediaType === "image" ? "Image" : "Video"} selected</span>
                      </div>
                    )}
                  </div>

                  {currentItem.mediaUrl && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                      {currentItem.mediaType === "image" ? (
                        <img
                          src={currentItem.mediaUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <video src={currentItem.mediaUrl} controls className="object-contain w-full h-full">
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Content Body</Label>
                <Textarea
                  id="body"
                  value={currentItem.body || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, body: e.target.value })}
                  placeholder="Enter the main content"
                  rows={8}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleCreateOrUpdate}>{isEditing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Display Type Preview</DialogTitle>
            </DialogHeader>
            <DisplayTypePreview content={currentItem as ContentItem} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ContentGrid items={filteredContent} onEdit={handleEdit} onDelete={handleDelete} />
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <ContentGrid
              items={filteredContent.filter((item) => item.categoryId === category.id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface ContentGridProps {
  items: ContentItem[]
  onEdit: (item: ContentItem) => void
  onDelete: (id: string) => void
}

function ContentGrid({ items, onEdit, onDelete }: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No content found. Create some new content to get started.</div>
    )
  }

  const getDisplayTypeName = (type: string) => {
    const displayTypes: Record<string, string> = {
      default: "Default",
      imageCarousel: "Image Carousel",
      slideshow: "Slideshow",
      gridGallery: "Grid Gallery",
      lightbox: "Lightbox Viewer",
      masonry: "Masonry Layout",
      accordion: "Accordion Gallery",
      videoPlaylist: "Video Playlist",
      thumbnailSlider: "Thumbnail Slider",
      timeline: "Timeline Slider",
    }
    return displayTypes[type] || "Default"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id}>
          <div className="relative aspect-video">
            {item.mediaType === "image" ? (
              <img
                src={item.mediaUrl || "/placeholder.svg"}
                alt={item.title}
                className="object-cover w-full h-full rounded-t-lg"
              />
            ) : (
              <video src={item.mediaUrl} className="object-cover w-full h-full rounded-t-lg">
                Your browser does not support the video tag.
              </video>
            )}
            {item.displayType && item.displayType !== "default" && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {getDisplayTypeName(item.displayType)}
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="line-clamp-1">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description}</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
