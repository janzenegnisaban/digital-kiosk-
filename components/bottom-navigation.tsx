"use client"

import Link from "next/link"
import { Bell, HelpCircle, FileText, Calendar } from "lucide-react"

export function BottomNavigation() {
  const navItems = [
    { name: "Announcements", icon: <Bell className="h-6 w-6" />, href: "/category/announcements" },
    { name: "FAQs", icon: <HelpCircle className="h-6 w-6" />, href: "/category/faqs" },
    { name: "Services", icon: <FileText className="h-6 w-6" />, href: "/category/services" },
    { name: "Events", icon: <Calendar className="h-6 w-6" />, href: "/category/events" },
  ]

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="grid grid-cols-4 h-20">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center hover:bg-gray-50">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
              {item.icon}
            </div>
            <span className="mt-1 text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
