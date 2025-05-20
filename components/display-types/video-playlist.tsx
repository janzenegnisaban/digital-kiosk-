"use client"

import { useState } from "react"
import type { ContentItem } from "@/types"
import { Play } from "lucide-react"

interface VideoPlaylistProps {
  content: ContentItem
}

export function VideoPlaylist({ content }: VideoPlaylistProps) {
  const [currentVideo, setCurrentVideo] = useState(0)
  const videos = content.videoPlaylist || [
    {
      title: content.title,
      description: content.description,
      url: content.mediaUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "/placeholder.svg",
    },
  ]

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <video src={videos[currentVideo].url} controls autoPlay className="w-full h-full object-contain">
              Your browser does not support the video tag.
            </video>
          </div>
          <h3 className="text-lg font-bold mt-2">{videos[currentVideo].title}</h3>
          <p className="text-gray-600">{videos[currentVideo].description}</p>
        </div>

        <div className="md:col-span-1">
          <h3 className="font-bold mb-2">Playlist</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {videos.map((video, index) => (
              <div
                key={index}
                className={`flex gap-2 p-2 rounded-md cursor-pointer ${
                  currentVideo === index ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                }`}
                onClick={() => setCurrentVideo(index)}
              >
                <div className="relative w-20 aspect-video flex-shrink-0">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
