"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { KioskHeader } from "@/components/kiosk-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [projectTitle, setProjectTitle] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load the saved project title if it exists
  useEffect(() => {
    const savedTitle = localStorage.getItem("kioskProjectTitle")
    if (savedTitle) {
      setProjectTitle(savedTitle)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // For demo purposes, hardcoded credentials
      if (email === "admin@example.com" && password === "password") {
        // Save the project title to localStorage
        if (projectTitle.trim()) {
          localStorage.setItem("kioskProjectTitle", projectTitle.trim())
        }
        router.push("/admin")
      } else {
        setError("Invalid credentials")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="h-screen flex flex-col bg-slate-50">
      <KioskHeader title="Admin Login" />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="projectTitle">Project Title</Label>
                <Input
                  id="projectTitle"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Enter your kiosk project title"
                />
                <p className="text-xs text-gray-500">This will be displayed in the kiosk header</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between pt-2">
                <Link href="/">
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Kiosk
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>

              <div className="text-sm text-gray-500 mt-4">
                <p>Demo credentials:</p>
                <p>Email: admin@example.com</p>
                <p>Password: password</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
