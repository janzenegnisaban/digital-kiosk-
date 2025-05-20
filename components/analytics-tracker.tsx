"use client"

import { useEffect } from "react"
import { trackPageView, trackEvent } from "@/lib/analytics"

interface AnalyticsTrackerProps {
  pageId: string
  contentType?: string
}

export function AnalyticsTracker({ pageId, contentType }: AnalyticsTrackerProps) {
  useEffect(() => {
    // Track page view when component mounts
    trackPageView({
      pageId,
      contentType,
      timestamp: new Date().toISOString(),
    })

    // Set up interaction tracking
    const trackInteraction = (element: string) => {
      trackEvent({
        type: "interaction",
        element,
        pageId,
        contentType,
        timestamp: new Date().toISOString(),
      })
    }

    // Track video interactions
    const videos = document.querySelectorAll("video")
    videos.forEach((video) => {
      video.addEventListener("play", () => trackInteraction("video_play"))
      video.addEventListener("pause", () => trackInteraction("video_pause"))
      video.addEventListener("ended", () => trackInteraction("video_complete"))
    })

    // Track image interactions (clicks)
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.addEventListener("click", () => trackInteraction("image_click"))
    })

    // Cleanup event listeners
    return () => {
      videos.forEach((video) => {
        video.removeEventListener("play", () => trackInteraction("video_play"))
        video.removeEventListener("pause", () => trackInteraction("video_pause"))
        video.removeEventListener("ended", () => trackInteraction("video_complete"))
      })

      images.forEach((img) => {
        img.removeEventListener("click", () => trackInteraction("image_click"))
      })
    }
  }, [pageId, contentType])

  // This component doesn't render anything
  return null
}
