"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Send } from "lucide-react"
import { submitFeedback } from "@/lib/actions"

export function FeedbackForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      setMediaFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setMediaPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setMediaFile(null)
      setMediaPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitFeedback({
        name,
        email,
        message,
        mediaFile,
      })

      setIsSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
      setMediaFile(null)
      setMediaPreview(null)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSuccess && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          Thank you for your feedback! We appreciate your input.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your Feedback</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please share your thoughts or questions..."
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="media">Add Photo or Video (Optional)</Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("media")?.click()}
            className="flex items-center gap-2"
          >
            <Camera className="h-5 w-5" />
            {mediaFile ? "Change Media" : "Add Media"}
          </Button>
          <Input id="media" type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
        </div>

        {mediaPreview && (
          <div className="mt-4 relative w-full max-w-md aspect-video rounded-lg overflow-hidden">
            {mediaFile?.type.startsWith("image/") ? (
              <img src={mediaPreview || "/placeholder.svg"} alt="Preview" className="object-contain w-full h-full" />
            ) : (
              <video src={mediaPreview} controls className="object-contain w-full h-full">
                Your browser does not support the video tag.
              </video>
            )}
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                setMediaFile(null)
                setMediaPreview(null)
              }}
            >
              Remove
            </Button>
          </div>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto flex items-center gap-2" size="lg">
        <Send className="h-5 w-5" />
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  )
}
