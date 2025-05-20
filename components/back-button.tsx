"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant="outline" size="lg" onClick={() => router.back()} className="flex items-center gap-2 text-lg">
      <ChevronLeft className="h-5 w-5" />
      Back
    </Button>
  )
}
