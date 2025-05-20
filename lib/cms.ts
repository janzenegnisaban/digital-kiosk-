import type { ContentItem, Category } from "@/types"

// This is a mock implementation that would be replaced with actual CMS API calls
// In a real application, you would integrate with a headless CMS like Sanity, Contentful, etc.

// Mock data
const categories: Category[] = [
  { id: "announcements", name: "Announcements", slug: "announcements", icon: "📢" },
  { id: "faqs", name: "FAQs", slug: "faqs", icon: "❓" },
  { id: "services", name: "Services", slug: "services", icon: "🛠️" },
  { id: "events", name: "Events", slug: "events", icon: "📅" },
]

const content: ContentItem[] = [
  {
    id: "1",
    title: "Welcome to Our New Digital Kiosk",
    description: "Learn about our new interactive information system",
    body: "<p>We're excited to introduce our new digital information kiosk! This interactive system provides you with all the information you need about our services, events, and more.</p><p>Feel free to explore the different sections and provide feedback on your experience.</p>",
    mediaType: "image",
    mediaUrl: "/placeholder.svg?height=400&width=600",
    categoryId: "announcements",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reactions: { thumbsUp: 12, thumbsDown: 2, love: 8, sad: 1 },
    displayType: "imageCarousel",
    galleryImages: [
      { url: "/placeholder.svg?height=400&width=600&text=Welcome", alt: "Welcome" },
      { url: "/placeholder.svg?height=400&width=600&text=New+Features", alt: "New Features" },
      { url: "/placeholder.svg?height=400&width=600&text=Interactive", alt: "Interactive" },
    ],
  },
  {
    id: "2",
    title: "Upcoming Maintenance Schedule",
    description: "View the schedule for upcoming system maintenance",
    body: "<p>We will be performing routine maintenance on our systems next week. Please note the following schedule:</p><ul><li>Monday: 2:00 AM - 4:00 AM</li><li>Wednesday: 1:00 AM - 3:00 AM</li><li>Friday: 12:00 AM - 2:00 AM</li></ul><p>We apologize for any inconvenience this may cause.</p>",
    mediaType: "image",
    mediaUrl: "/placeholder.svg?height=400&width=600",
    categoryId: "announcements",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reactions: { thumbsUp: 5, thumbsDown: 3, love: 2, sad: 7 },
    displayType: "timeline",
    timelineItems: [
      {
        date: "Monday",
        title: "Server Updates",
        description: "2:00 AM - 4:00 AM",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Server+Updates",
      },
      {
        date: "Wednesday",
        title: "Database Maintenance",
        description: "1:00 AM - 3:00 AM",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Database+Maintenance",
      },
      {
        date: "Friday",
        title: "System Cleanup",
        description: "12:00 AM - 2:00 AM",
        imageUrl: "/placeholder.svg?height=400&width=600&text=System+Cleanup",
      },
    ],
  },
  {
    id: "3",
    title: "How do I reset my password?",
    description: "Step-by-step guide to reset your account password",
    body: "<p>To reset your password, follow these steps:</p><ol><li>Click on the 'Forgot Password' link on the login page</li><li>Enter your email address</li><li>Check your email for a password reset link</li><li>Click the link and enter your new password</li><li>Log in with your new password</li></ol>",
    mediaType: "image",
    mediaUrl: "/placeholder.svg?height=400&width=600",
    categoryId: "faqs",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reactions: { thumbsUp: 24, thumbsDown: 1, love: 5, sad: 0 },
    displayType: "accordion",
    accordionSections: [
      {
        title: "Step 1: Forgot Password Link",
        content: "Click on the 'Forgot Password' link on the login page",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Step+1",
      },
      {
        title: "Step 2: Enter Email",
        content: "Enter your email address in the provided field",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Step+2",
      },
      {
        title: "Step 3: Check Email",
        content: "Check your email inbox for a password reset link",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Step+3",
      },
      {
        title: "Step 4: Reset Password",
        content: "Click the link and enter your new password",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Step+4",
      },
      {
        title: "Step 5: Login",
        content: "Log in with your new password",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Step+5",
      },
    ],
  },
  {
    id: "4",
    title: "Introduction to Our Services",
    description: "Overview of the services we offer",
    body: "<p>We offer a wide range of services to meet your needs. Our services include:</p><ul><li>Consultation</li><li>Implementation</li><li>Support</li><li>Training</li></ul><p>Contact us to learn more about how we can help you.</p>",
    mediaType: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    categoryId: "services",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reactions: { thumbsUp: 18, thumbsDown: 2, love: 15, sad: 0 },
    displayType: "videoPlaylist",
    videoPlaylist: [
      {
        title: "Introduction to Our Services",
        description: "Overview of the services we offer",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/placeholder.svg?height=400&width=600&text=Services+Intro",
      },
      {
        title: "Consultation Services",
        description: "Learn about our consultation services",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "/placeholder.svg?height=400&width=600&text=Consultation",
      },
      {
        title: "Implementation Process",
        description: "How we implement solutions for our clients",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "/placeholder.svg?height=400&width=600&text=Implementation",
      },
    ],
  },
  {
    id: "5",
    title: "Annual Conference 2025",
    description: "Information about our upcoming annual conference",
    body: "<p>Join us for our Annual Conference 2025! This year's theme is 'Innovation for the Future'.</p><p>Date: June 15-17, 2025</p><p>Location: Grand Convention Center</p><p>Registration is now open. Early bird pricing available until March 31.</p>",
    mediaType: "image",
    mediaUrl: "/placeholder.svg?height=400&width=600",
    categoryId: "events",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reactions: { thumbsUp: 9, thumbsDown: 0, love: 12, sad: 2 },
    displayType: "gridGallery",
    galleryImages: [
      { url: "/placeholder.svg?height=400&width=600&text=Conference+Hall", alt: "Conference Hall" },
      { url: "/placeholder.svg?height=400&width=600&text=Speakers", alt: "Speakers" },
      { url: "/placeholder.svg?height=400&width=600&text=Workshops", alt: "Workshops" },
      { url: "/placeholder.svg?height=400&width=600&text=Networking", alt: "Networking" },
      { url: "/placeholder.svg?height=400&width=600&text=Exhibition", alt: "Exhibition" },
      { url: "/placeholder.svg?height=400&width=600&text=Awards", alt: "Awards Ceremony" },
    ],
  },
  {
    id: "6",
    title: "Product Showcase",
    description: "Explore our latest products and innovations",
    body: "<p>Check out our latest products and innovations. We're constantly working to improve our offerings and provide you with the best solutions.</p>",
    mediaType: "image",
    mediaUrl: "/placeholder.svg?height=400&width=600&text=Products",
    categoryId: "services",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reactions: { thumbsUp: 15, thumbsDown: 1, love: 10, sad: 0 },
    displayType: "masonry",
    galleryImages: [
      { url: "/placeholder.svg?height=600&width=400&text=Product+1", alt: "Product 1" },
      { url: "/placeholder.svg?height=400&width=600&text=Product+2", alt: "Product 2" },
      { url: "/placeholder.svg?height=500&width=500&text=Product+3", alt: "Product 3" },
      { url: "/placeholder.svg?height=600&width=400&text=Product+4", alt: "Product 4" },
      { url: "/placeholder.svg?height=400&width=600&text=Product+5", alt: "Product 5" },
      { url: "/placeholder.svg?height=500&width=500&text=Product+6", alt: "Product 6" },
      { url: "/placeholder.svg?height=600&width=400&text=Product+7", alt: "Product 7" },
      { url: "/placeholder.svg?height=400&width=600&text=Product+8", alt: "Product 8" },
    ],
  },
  {
    id: "7",
    title: "Company History",
    description: "Learn about our journey from the beginning to now",
    body: "<p>Our company has a rich history of innovation and growth. Learn about our journey from our humble beginnings to where we are today.</p>",
    mediaType: "image",
    mediaUrl: "/placeholder.svg?height=400&width=600&text=History",
    categoryId: "announcements",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reactions: { thumbsUp: 20, thumbsDown: 0, love: 18, sad: 0 },
    displayType: "timeline",
    timelineItems: [
      {
        date: "2000",
        title: "Company Founded",
        description: "Our company was founded with a vision to revolutionize the industry",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Founded",
      },
      {
        date: "2005",
        title: "First Major Product",
        description: "We launched our first major product that gained significant market traction",
        imageUrl: "/placeholder.svg?height=400&width=600&text=First+Product",
      },
      {
        date: "2010",
        title: "International Expansion",
        description: "We expanded our operations to international markets",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Expansion",
      },
      {
        date: "2015",
        title: "Innovation Award",
        description: "We received the prestigious Innovation Award for our groundbreaking solutions",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Award",
      },
      {
        date: "2020",
        title: "Digital Transformation",
        description: "We underwent a complete digital transformation to better serve our clients",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Digital",
      },
      {
        date: "2025",
        title: "Future Vision",
        description: "Our vision for the future includes continued innovation and growth",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Future",
      },
    ],
  },
]

// Mock API functions
export async function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories)
    }, 300)
  })
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = categories.find((c) => c.slug === slug) || null
      resolve(category)
    }, 300)
  })
}

export async function getAllContent(): Promise<ContentItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...content])
    }, 300)
  })
}

export async function getContentByType(type: string, limit?: number): Promise<ContentItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = content.filter((item) => {
        const category = categories.find((c) => c.id === item.categoryId)
        return category?.slug === type || category?.id === type
      })

      if (limit) {
        filtered = filtered.slice(0, limit)
      }

      resolve(filtered)
    }, 300)
  })
}

export async function getCategoryContent(slug: string): Promise<ContentItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = categories.find((c) => c.slug === slug)
      if (!category) {
        resolve([])
        return
      }

      const filtered = content.filter((item) => item.categoryId === category.id)
      resolve(filtered)
    }, 300)
  })
}

export async function getContentById(id: string): Promise<ContentItem | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = content.find((c) => c.id === id) || null
      resolve(item)
    }, 300)
  })
}

export async function getFeaturedContent(): Promise<ContentItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, you might have a "featured" flag on content items
      // For this example, we'll just return the first 3 items
      resolve(content.slice(0, 3))
    }, 300)
  })
}

export async function getRecommendedContent(): Promise<ContentItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would be personalized based on user behavior
      // For this example, we'll return items 3-6
      resolve(content.slice(3, 7))
    }, 300)
  })
}

export async function getRelatedContent(id: string): Promise<ContentItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentItem = content.find((c) => c.id === id)
      if (!currentItem) {
        resolve([])
        return
      }

      // Get other content in the same category
      const related = content.filter((item) => item.id !== id && item.categoryId === currentItem.categoryId).slice(0, 2)

      resolve(related)
    }, 300)
  })
}

export async function createContent(item: ContentItem): Promise<ContentItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItem = {
        ...item,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      content.unshift(newItem)
      resolve(newItem)
    }, 300)
  })
}

export async function updateContent(id: string, updates: Partial<ContentItem>): Promise<ContentItem> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = content.findIndex((item) => item.id === id)
      if (index === -1) {
        reject(new Error("Content not found"))
        return
      }

      const updatedItem = {
        ...content[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      content[index] = updatedItem
      resolve(updatedItem)
    }, 300)
  })
}

export async function deleteContent(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = content.findIndex((item) => item.id === id)
      if (index === -1) {
        reject(new Error("Content not found"))
        return
      }

      content.splice(index, 1)
      resolve()
    }, 300)
  })
}
