"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getComments, addComment } from "@/lib/actions"
import type { Comment } from "@/types"

interface CommentSectionProps {
  contentId: string
}

export function CommentSection({ contentId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadComments = async () => {
      const data = await getComments(contentId)
      setComments(data)
    }

    loadComments()
  }, [contentId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newComment = await addComment({
        contentId,
        name,
        text: comment,
      })

      setComments([newComment, ...comments])
      setName("")
      setComment("")
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Comments ({comments.length})</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Your Comment</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      <div className="space-y-4 mt-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{comment.name}</div>
                <div className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
                <div className="mt-2">{comment.text}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
