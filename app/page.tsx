"use client"

import { useState } from "react"
import { NavRail } from "@/components/nav-rail"
import { LeftSidebar } from "@/components/left-sidebar"
import { TopHeader } from "@/components/top-header"
import { CenterWorkspace } from "@/components/center-workspace"
import { RightPanel } from "@/components/right-panel"

export default function Home() {
  // Panel state management for collapse/expand and resize
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)
  const [leftWidth, setLeftWidth] = useState(260)
  const [rightWidth, setRightWidth] = useState(240)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Top Header */}
      <TopHeader 
        isRightPanelCollapsed={rightCollapsed}
        onToggleRightPanel={() => setRightCollapsed(!rightCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Rail */}
        <NavRail 
          isSidebarCollapsed={leftCollapsed}
          onToggleSidebar={() => setLeftCollapsed(!leftCollapsed)}
        />
        
        {/* Left Sidebar */}
        <LeftSidebar 
          isCollapsed={leftCollapsed}
          onToggleCollapse={() => setLeftCollapsed(!leftCollapsed)}
          width={leftWidth}
          onWidthChange={setLeftWidth}
        />
        
        {/* Center Workspace - Always centered regardless of panel states */}
        <CenterWorkspace />
        
        {/* Right Panel */}
        <RightPanel 
          isCollapsed={rightCollapsed}
          onToggleCollapse={() => setRightCollapsed(!rightCollapsed)}
          width={rightWidth}
          onWidthChange={setRightWidth}
        />
      </div>
    </div>
  )
}
