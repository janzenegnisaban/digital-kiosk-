"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"

interface ScrollControlsProps {
  targetId: string
  scrollAmount?: number
}

export function ScrollControls({ targetId, scrollAmount = 300 }: ScrollControlsProps) {
  const [showScrollUp, setShowScrollUp] = useState(false)
  const [showScrollDown, setShowScrollDown] = useState(true)

  useEffect(() => {
    const scrollableElement = document.getElementById(targetId)

    if (!scrollableElement) return

    const handleScroll = () => {
      if (!scrollableElement) return

      setShowScrollUp(scrollableElement.scrollTop > 10)
      setShowScrollDown(
        scrollableElement.scrollTop + scrollableElement.clientHeight < scrollableElement.scrollHeight - 10,
      )
    }

    scrollableElement.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      scrollableElement.removeEventListener("scroll", handleScroll)
    }
  }, [targetId])

  const scrollUp = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollBy({ top: -scrollAmount, behavior: "smooth" })
    }
  }

  const scrollDown = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollBy({ top: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
      {showScrollUp && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-white shadow-md"
          onClick={scrollUp}
          aria-label="Scroll up"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}

      {showScrollDown && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-white shadow-md"
          onClick={scrollDown}
          aria-label="Scroll down"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
