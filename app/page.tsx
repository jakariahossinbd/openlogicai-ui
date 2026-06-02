"use client"

import { useState } from "react"
import { NavRail } from "@/components/nav-rail"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ConsumerCanvas } from "@/components/consumer-canvas"
import { IdeCanvas } from "@/components/ide-canvas"

export type Mode = "chat" | "image" | "voice" | "code"

export default function Home() {
  const [activeMode, setActiveMode] = useState<Mode>("chat")

  const isConsumerMode = activeMode !== "code"

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Slim Activity Bar (VS Code style) */}
      <NavRail activeMode={activeMode} onModeChange={setActiveMode} />

      {/* Dynamic Layout based on mode */}
      {isConsumerMode ? (
        /* Consumer Mode: Wide canvas with bottom input */
        <ConsumerCanvas activeMode={activeMode} onModeChange={setActiveMode} />
      ) : (
        /* Code Mode: IDE with sidebar chat */
        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar />
          <IdeCanvas />
        </div>
      )}
    </div>
  )
}
