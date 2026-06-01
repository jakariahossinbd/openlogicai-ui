"use client"

import { MessageSquarePlus, Search, Clock, Settings, User, ChevronRight } from "lucide-react"
import Image from "next/image"

interface NavRailProps {
  activeItem?: string
  isSidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export function NavRail({ activeItem = "recent", isSidebarCollapsed = false, onToggleSidebar }: NavRailProps) {
  const navItems = [
    { id: "new-chat", icon: MessageSquarePlus, label: "New Chat" },
    { id: "search", icon: Search, label: "Search Chats" },
    { id: "recent", icon: Clock, label: "Recent" },
  ]

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="flex h-full w-[60px] flex-col items-center border-r border-border bg-background-secondary py-3">
      {/* Official Logo */}
      <div className="relative mb-4 flex h-10 w-10 items-center justify-center">
        <Image 
          src="/ol_logo.png" 
          alt="OpenLogic AI Logo" 
          width={36} 
          height={36} 
          className="object-contain"
        />
      </div>

      {/* Expand Sidebar Button - Only shown when sidebar is collapsed */}
      {isSidebarCollapsed && (
        <button 
          onClick={onToggleSidebar}
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted"
          title="Expand sidebar"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Main Navigation */}
      <div className="flex flex-1 flex-col items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`group flex flex-col items-center gap-1 rounded-lg p-2 transition-colors ${
              activeItem === item.id
                ? "text-primary"
                : "text-foreground-muted hover:text-foreground-secondary"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[9px] leading-tight">{item.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center gap-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            className="group flex flex-col items-center gap-1 rounded-lg p-2 text-foreground-muted transition-colors hover:text-foreground-secondary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[9px] leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
