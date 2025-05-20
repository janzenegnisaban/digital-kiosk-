"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Heart, Frown } from "lucide-react"
import { cn } from "@/lib/utils"
import { updateReaction } from "@/lib/actions"
import type { Reactions } from "@/types"

interface ReactionButtonsProps {
  contentId: string
  reactions: Reactions
  isPreview?: boolean
}

export function ReactionButtons({ contentId, reactions, isPreview = false }: ReactionButtonsProps) {
  const [currentReactions, setCurrentReactions] = useState<Reactions>(
    reactions || {
      thumbsUp: 0,
      thumbsDown: 0,
      love: 0,
      sad: 0,
    },
  )
  const [userReaction, setUserReaction] = useState<string | null>(null)

  const handleReaction = async (type: string) => {
    if (isPreview) {
      return // Don't allow reactions in preview mode
    }

    // If user already reacted with this type, remove their reaction
    if (userReaction === type) {
      const updatedReactions = {
        ...currentReactions,
        [type]: Math.max(0, (currentReactions[type as keyof Reactions] || 0) - 1),
      }
      setCurrentReactions(updatedReactions)
      setUserReaction(null)
      await updateReaction(contentId, type, false)
    } else {
      // If user reacted with a different type before, remove that reaction first
      let updatedReactions = { ...currentReactions }

      if (userReaction) {
        updatedReactions = {
          ...updatedReactions,
          [userReaction]: Math.max(0, (updatedReactions[userReaction as keyof Reactions] || 0) - 1),
        }
        await updateReaction(contentId, userReaction, false)
      }

      // Add the new reaction
      updatedReactions = {
        ...updatedReactions,
        [type]: (updatedReactions[type as keyof Reactions] || 0) + 1,
      }

      setCurrentReactions(updatedReactions)
      setUserReaction(type)
      await updateReaction(contentId, type, true)
    }
  }

  const buttonSize = isPreview ? "sm" : "default"
  const iconSize = isPreview ? 16 : 20
  const textSize = isPreview ? "text-xs" : "text-sm"

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size={buttonSize}
        className={cn(
          "flex items-center gap-1",
          userReaction === "thumbsUp" && "bg-blue-50 border-blue-200 text-blue-600",
        )}
        onClick={(e) => {
          e.preventDefault()
          handleReaction("thumbsUp")
        }}
        disabled={isPreview}
      >
        <ThumbsUp size={iconSize} />
        <span className={textSize}>{currentReactions.thumbsUp || 0}</span>
      </Button>

      <Button
        variant="outline"
        size={buttonSize}
        className={cn(
          "flex items-center gap-1",
          userReaction === "thumbsDown" && "bg-blue-50 border-blue-200 text-blue-600",
        )}
        onClick={(e) => {
          e.preventDefault()
          handleReaction("thumbsDown")
        }}
        disabled={isPreview}
      >
        <ThumbsDown size={iconSize} />
        <span className={textSize}>{currentReactions.thumbsDown || 0}</span>
      </Button>

      <Button
        variant="outline"
        size={buttonSize}
        className={cn("flex items-center gap-1", userReaction === "love" && "bg-red-50 border-red-200 text-red-600")}
        onClick={(e) => {
          e.preventDefault()
          handleReaction("love")
        }}
        disabled={isPreview}
      >
        <Heart size={iconSize} className={userReaction === "love" ? "fill-red-600" : ""} />
        <span className={textSize}>{currentReactions.love || 0}</span>
      </Button>

      <Button
        variant="outline"
        size={buttonSize}
        className={cn(
          "flex items-center gap-1",
          userReaction === "sad" && "bg-yellow-50 border-yellow-200 text-yellow-600",
        )}
        onClick={(e) => {
          e.preventDefault()
          handleReaction("sad")
        }}
        disabled={isPreview}
      >
        <Frown size={iconSize} />
        <span className={textSize}>{currentReactions.sad || 0}</span>
      </Button>
    </div>
  )
}
