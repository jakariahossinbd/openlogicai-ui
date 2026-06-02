"use client"

import { useState } from "react"
import { NavRail } from "@/components/nav-rail"
import { LeftSidebar } from "@/components/left-sidebar"
import { TopHeader } from "@/components/top-header"
import { CenterWorkspace } from "@/components/center-workspace"

type Mode = "chat" | "image" | "voice" | "code"

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMode, setActiveMode] = useState<Mode>("chat")

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Top Header */}
      <TopHeader
        isSidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Slim Activity Bar */}
        <NavRail activeItem={activeMode} onItemClick={(id) => {
          if (id === "chat" || id === "image" || id === "voice" || id === "code") {
            setActiveMode(id as Mode)
          }
        }} />

        {/* Persistent Chat Sidebar */}
        <LeftSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeMode={activeMode}
          onModeChange={setActiveMode}
        />

        {/* Dynamic Central Canvas */}
        <CenterWorkspace activeMode={activeMode} />
      </div>
    </div>
  )
}
