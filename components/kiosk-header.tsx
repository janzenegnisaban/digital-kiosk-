"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock } from "@/components/clock"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

interface KioskHeaderProps {
  title: string
  showAdminButton?: boolean
}

export function KioskHeader({ title, showAdminButton = false }: KioskHeaderProps) {
  const [projectTitle, setProjectTitle] = useState<string>("Digital Information Kiosk")

  // Load the project title from localStorage on component mount
  useEffect(() => {
    const savedTitle = localStorage.getItem("kioskProjectTitle")
    if (savedTitle) {
      setProjectTitle(savedTitle)
    }
  }, [])

  return (
    <header className="bg-blue-600 text-white p-3">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:underline">
          {projectTitle}
        </Link>
        <div className="flex items-center gap-4">
          <Clock />
          {showAdminButton && (
            <Link href="/admin/login">
              <Button variant="outline" className="text-white border-white hover:bg-blue-700">
                <LogIn className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </Link>
          )}
        </div>
      </div>
      <h1 className="text-xl font-bold mt-1">{title}</h1>
    </header>
  )
}
