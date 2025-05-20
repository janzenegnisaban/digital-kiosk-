"use server"

import { revalidatePath } from "next/cache"
import type { Comment } from "@/types"

// Mock comments data
const comments: Comment[] = [
  {
    id: "1",
    contentId: "1",
    name: "John Doe",
    text: "This is really helpful information!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    contentId: "1",
    name: "Jane Smith",
    text: "I appreciate the clear explanation.",
    createdAt: new Date().toISOString(),
  },
]

// Mock feedback data
const feedback: any[] = []

// Mock reports data
const reports: any[] = []

export async function getComments(contentId: string): Promise<Comment[]> {
  // In a real app, this would fetch from a database
  return comments.filter((comment) => comment.contentId === contentId)
}

export async function addComment(data: {
  contentId: string
  name: string
  text: string
}): Promise<Comment> {
  // In a real app, this would save to a database
  const newComment: Comment = {
    id: Math.random().toString(36).substring(2, 9),
    contentId: data.contentId,
    name: data.name,
    text: data.text,
    createdAt: new Date().toISOString(),
  }

  comments.unshift(newComment)
  revalidatePath(`/content/${data.contentId}`)

  return newComment
}

export async function submitFeedback(data: {
  name: string
  email: string
  message: string
  mediaFile: File | null
}): Promise<void> {
  // In a real app, this would save to a database and handle file upload
  const newFeedback = {
    id: Math.random().toString(36).substring(2, 9),
    name: data.name,
    email: data.email,
    message: data.message,
    hasMedia: !!data.mediaFile,
    createdAt: new Date().toISOString(),
  }

  feedback.push(newFeedback)
  revalidatePath("/")
}

export async function updateReaction(contentId: string, reactionType: string, isAdd: boolean): Promise<void> {
  // In a real app, this would update the reaction in the database
  // For this example, we'll just log the action
  console.log(`${isAdd ? "Adding" : "Removing"} ${reactionType} reaction for content ${contentId}`)

  // We would typically update the database here
  // For the mock implementation, we're handling the state client-side

  revalidatePath(`/content/${contentId}`)
}

export async function reportContent(data: {
  contentId: string
  reason: string
  details: string
}): Promise<void> {
  // In a real app, this would save to a database
  const newReport = {
    id: Math.random().toString(36).substring(2, 9),
    contentId: data.contentId,
    reason: data.reason,
    details: data.details,
    status: "new",
    createdAt: new Date().toISOString(),
  }

  reports.push(newReport)
  console.log("Content reported:", newReport)

  revalidatePath(`/content/${data.contentId}`)
}
