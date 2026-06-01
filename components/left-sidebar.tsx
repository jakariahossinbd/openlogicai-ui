"use client"

import { Plus, MessageSquare, LayoutTemplate, Search, MoreHorizontal, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/components/theme-context"

interface ChatItem {
  id: string
  title: string
  time: string
  icon?: React.ReactNode
}

interface LeftSidebarProps {
  selectedChat?: string
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  width?: number
  onWidthChange?: (width: number) => void
}

export function LeftSidebar({ 
  selectedChat = "futuristic-dashboard",
  isCollapsed = false,
  onToggleCollapse,
  width = 260,
  onWidthChange
}: LeftSidebarProps) {
  const { theme, setTheme } = useTheme()

  const todayChats: ChatItem[] = [
    { id: "futuristic-dashboard", title: "Futuristic Dashboard UI", time: "10:28 AM" },
    { id: "python-fibonacci", title: "Python Fibonacei Code", time: "10:28 AM" },
    { id: "ui-login", title: "UI Design: Login Page", time: "10:25 AM" },
    { id: "fataristic-city", title: "Image: Fataristic City", time: "10:25 AM" },
    { id: "voice-assistant", title: "Voice Assistant Test", time: "10:18 AM" },
  ]

  const yesterdayChats: ChatItem[] = [
    { id: "css-tailwind", title: "CSS to Tailwind", time: "Yesterday" },
    { id: "ai-assistant", title: "AI Assistant Features", time: "Yesterday" },
    { id: "file-analyzer", title: "File Analyzer", time: "Yesterday" },
  ]

  const getChatIcon = (id: string) => {
    switch (id) {
      case "futuristic-dashboard":
        return <div className="h-4 w-4 rounded bg-primary-muted flex items-center justify-center"><span className="text-[8px] text-primary">UI</span></div>
      case "python-fibonacci":
        return <div className="h-4 w-4 rounded bg-icon-bg flex items-center justify-center"><span className="text-[8px] text-foreground-subtle">Py</span></div>
      case "ui-login":
        return <div className="h-4 w-4 rounded bg-icon-bg flex items-center justify-center"><span className="text-[8px] text-foreground-subtle">UI</span></div>
      case "fataristic-city":
        return <div className="h-4 w-4 rounded bg-icon-bg flex items-center justify-center"><span className="text-[8px] text-foreground-subtle">Im</span></div>
      case "voice-assistant":
        return <div className="h-4 w-4 rounded bg-icon-bg flex items-center justify-center"><span className="text-[8px] text-foreground-subtle">Vc</span></div>
      default:
        return <div className="h-4 w-4 rounded bg-icon-bg flex items-center justify-center"><span className="text-[8px] text-foreground-subtle">Ch</span></div>
    }
  }

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = width

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.min(400, Math.max(200, startWidth + (e.clientX - startX)))
      onWidthChange?.(newWidth)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  if (isCollapsed) {
    // When collapsed, the entire sidebar disappears - only NavRail remains visible
    return null
  }

  return (
    <div 
      className="relative flex h-full flex-col border-r border-border bg-card"
      style={{ width: `${width}px` }}
    >
      {/* Resize Handle */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/20 transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* Header with Toggle Button */}
      <div className="flex items-center justify-between p-3 pb-2">
        <button 
          onClick={onToggleCollapse}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted"
          title="Collapse sidebar"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-3 pb-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card-elevated px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-hover-elevated">
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Menu Items */}
      <div className="px-3 py-1">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground-secondary transition-colors hover:bg-hover">
          <MessageSquare className="h-4 w-4" />
          <span>Chats</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground-secondary transition-colors hover:bg-hover">
          <LayoutTemplate className="h-4 w-4" />
          <span>Templates</span>
        </button>
      </div>

      {/* Recent Chats Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs font-medium text-foreground-muted">Recent Chats</span>
        <Search className="h-3.5 w-3.5 text-foreground-subtle" />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 min-h-0">
        {/* Today */}
        <div className="mb-2 px-2 py-1">
          <span className="text-[10px] font-medium text-foreground-subtle">Today</span>
        </div>
        {todayChats.map((chat) => (
          <button
            key={chat.id}
            className={`mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
              selectedChat === chat.id
                ? "bg-primary-muted text-primary"
                : "text-foreground-secondary hover:bg-hover"
            }`}
          >
            {getChatIcon(chat.id)}
            <span className="flex-1 truncate text-[13px]">{chat.title}</span>
            <span className="text-[10px] text-foreground-subtle shrink-0">{chat.time}</span>
          </button>
        ))}

        {/* Yesterday */}
        <div className="mb-2 mt-4 px-2 py-1">
          <span className="text-[10px] font-medium text-foreground-subtle">Yesterday</span>
        </div>
        {yesterdayChats.map((chat) => (
          <button
            key={chat.id}
            className="mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-foreground-secondary transition-colors hover:bg-hover"
          >
            {getChatIcon(chat.id)}
            <span className="flex-1 truncate text-[13px]">{chat.title}</span>
            <span className="text-[10px] text-foreground-subtle shrink-0">{chat.time}</span>
          </button>
        ))}
      </div>

      {/* User Card - Fixed at bottom */}
      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" />
            <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500 text-xs text-white">WK</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-foreground">William Kim</p>
            <p className="truncate text-[11px] text-foreground-subtle">william.design@gmail.com</p>
          </div>
          <button className="text-foreground-subtle hover:text-foreground-muted shrink-0">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="mt-2 flex items-center rounded-lg bg-card-elevated p-1">
          <button 
            onClick={() => setTheme("light")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] transition-colors ${
              theme === "light"
                ? "bg-hover-elevated text-foreground-secondary"
                : "text-foreground-subtle hover:text-foreground-muted"
            }`}
          >
            <Sun className="h-3.5 w-3.5" />
            <span>Light</span>
          </button>
          <button 
            onClick={() => setTheme("dark")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] transition-colors ${
              theme === "dark"
                ? "bg-hover-elevated text-foreground-secondary"
                : "text-foreground-subtle hover:text-foreground-muted"
            }`}
          >
            <Moon className="h-3.5 w-3.5" />
            <span>Dark</span>
          </button>
        </div>
      </div>
    </div>
  )
}
