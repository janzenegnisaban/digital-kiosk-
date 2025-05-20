"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { getCategories } from "@/lib/cms"
import type { Category } from "@/types"

// This would be implemented with real API calls in a production app
const createCategory = async (category: Partial<Category>): Promise<Category> => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    name: category.name || "",
    slug: category.slug || category.name?.toLowerCase().replace(/\s+/g, "-") || "",
    icon: category.icon || "📁",
  }
}

const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
  return {
    id,
    name: category.name || "",
    slug: category.slug || category.name?.toLowerCase().replace(/\s+/g, "-") || "",
    icon: category.icon || "📁",
  }
}

const deleteCategory = async (id: string): Promise<void> => {
  // This would delete the category in a real app
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({})

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Error loading categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditing && currentCategory.id) {
        const updated = await updateCategory(currentCategory.id, currentCategory)
        setCategories(categories.map((cat) => (cat.id === updated.id ? updated : cat)))
      } else {
        const newCategory = await createCategory(currentCategory)
        setCategories([...categories, newCategory])
      }

      resetForm()
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id)
        setCategories(categories.filter((cat) => cat.id !== id))
      } catch (error) {
        console.error("Error deleting category:", error)
      }
    }
  }

  const handleEdit = (category: Category) => {
    setCurrentCategory(category)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentCategory({})
    setIsEditing(false)
    setIsDialogOpen(false)
  }

  if (isLoading) {
    return <div>Loading categories...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Categories</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentCategory({})
                setIsEditing(false)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Category" : "Add New Category"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={currentCategory.name || ""}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={currentCategory.slug || ""}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, slug: e.target.value })}
                  placeholder="Enter slug (or leave blank to auto-generate)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={currentCategory.icon || ""}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, icon: e.target.value })}
                  placeholder="Enter icon (emoji or icon name)"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">Slug: {category.slug}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
