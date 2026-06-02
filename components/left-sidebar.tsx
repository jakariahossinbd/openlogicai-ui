"use client"

import { useState, useRef, useEffect } from "react"
import {
  Plus,
  MessageSquare,
  LayoutTemplate,
  Search,
  MoreHorizontal,
  Moon,
  Sun,
  ChevronLeft,
  Paperclip,
  SendHorizonal,
  Mic,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/components/theme-context"

type Mode = "chat" | "image" | "voice" | "code"

interface ChatItem {
  id: string
  title: string
  time: string
}

interface LeftSidebarProps {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  activeMode?: Mode
  onModeChange?: (mode: Mode) => void
}

const MODES: { id: Mode; label: string }[] = [
  { id: "chat", label: "Chat" },
  { id: "image", label: "Image" },
  { id: "voice", label: "Voice" },
  { id: "code", label: "Code" },
]

export function LeftSidebar({
  isCollapsed = false,
  onToggleCollapse,
  activeMode = "chat",
  onModeChange,
}: LeftSidebarProps) {
  const { theme, setTheme } = useTheme()
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const todayChats: ChatItem[] = [
    { id: "futuristic-dashboard", title: "Futuristic Dashboard UI", time: "10:28 AM" },
    { id: "python-fibonacci", title: "Python Fibonacci Code", time: "10:28 AM" },
    { id: "ui-login", title: "UI Design: Login Page", time: "10:25 AM" },
    { id: "fataristic-city", title: "Image: Futuristic City", time: "10:25 AM" },
    { id: "voice-assistant", title: "Voice Assistant Test", time: "10:18 AM" },
  ]

  const yesterdayChats: ChatItem[] = [
    { id: "css-tailwind", title: "CSS to Tailwind", time: "Yesterday" },
    { id: "ai-assistant", title: "AI Assistant Features", time: "Yesterday" },
    { id: "file-analyzer", title: "File Analyzer", time: "Yesterday" },
  ]

  const [selectedChat, setSelectedChat] = useState("futuristic-dashboard")

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`
  }, [input])

  if (isCollapsed) return null

  return (
    <div className="relative flex h-full flex-col border-r border-border bg-card" style={{ width: "280px" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 shrink-0">
        <span className="text-[13px] font-semibold text-foreground">OpenLogic AI</span>
        <button
          onClick={onToggleCollapse}
          className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted"
          title="Collapse sidebar"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Mode Pills */}
      <div className="px-3 pb-3 shrink-0">
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => onModeChange?.(m.id)}
              className={`flex-1 rounded-md py-1.5 text-[12px] font-medium transition-all ${
                activeMode === m.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground-muted hover:text-foreground-secondary"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-3 pb-2 shrink-0">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card-elevated px-4 py-2 text-[13px] text-foreground transition-colors hover:bg-hover-elevated">
          <Plus className="h-3.5 w-3.5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Quick Nav */}
      <div className="px-3 pb-1 shrink-0">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] text-foreground-secondary transition-colors hover:bg-hover">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Chats</span>
        </button>
        <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] text-foreground-secondary transition-colors hover:bg-hover">
          <LayoutTemplate className="h-3.5 w-3.5" />
          <span>Templates</span>
        </button>
      </div>

      {/* Recent Chats Header */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0">
        <span className="text-[11px] font-medium text-foreground-muted">Recent Chats</span>
        <Search className="h-3.5 w-3.5 text-foreground-subtle" />
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 min-h-0">
        <div className="mb-1.5 px-2 py-0.5">
          <span className="text-[10px] font-medium text-foreground-subtle tracking-wide uppercase">Today</span>
        </div>
        {todayChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors ${
              selectedChat === chat.id
                ? "bg-primary-muted text-primary"
                : "text-foreground-secondary hover:bg-hover"
            }`}
          >
            <span className="flex-1 truncate text-[12.5px]">{chat.title}</span>
            <span className="text-[10px] text-foreground-subtle shrink-0">{chat.time}</span>
          </button>
        ))}

        <div className="mb-1.5 mt-3 px-2 py-0.5">
          <span className="text-[10px] font-medium text-foreground-subtle tracking-wide uppercase">Yesterday</span>
        </div>
        {yesterdayChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className="mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-foreground-secondary transition-colors hover:bg-hover"
          >
            <span className="flex-1 truncate text-[12.5px]">{chat.title}</span>
            <span className="text-[10px] text-foreground-subtle shrink-0">{chat.time}</span>
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-border p-3">
        <div className="rounded-xl border border-border bg-background p-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              activeMode === "chat"
                ? "Message..."
                : activeMode === "image"
                ? "Describe an image..."
                : activeMode === "voice"
                ? "Describe your voice request..."
                : "Describe the code you need..."
            }
            rows={1}
            className="w-full resize-none bg-transparent text-[13px] text-foreground-secondary placeholder:text-foreground-subtle focus:outline-none leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                setInput("")
              }
            }}
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <button className="rounded-md p-1.5 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
                <Paperclip className="h-3.5 w-3.5" />
              </button>
              <button className="rounded-md p-1.5 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
                <Mic className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                input.trim()
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted text-foreground-subtle cursor-not-allowed"
              }`}
              disabled={!input.trim()}
            >
              <SendHorizonal className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Model picker */}
        <div className="mt-2 flex items-center gap-1.5">
          <button className="flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[11px] text-foreground-secondary transition-colors hover:bg-hover">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Agent</span>
            <ChevronDown className="h-2.5 w-2.5 text-foreground-subtle" />
          </button>
          <button className="flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[11px] text-foreground-secondary transition-colors hover:bg-hover">
            <div className="h-3 w-3 rounded bg-gradient-to-br from-cyan-400 to-green-400" />
            <span>GPT 5.5 Codex</span>
            <ChevronDown className="h-2.5 w-2.5 text-foreground-subtle" />
          </button>
        </div>
      </div>

      {/* User Card */}
      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg p-1.5">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" />
            <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500 text-xs text-white">WK</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-foreground">William Kim</p>
            <p className="truncate text-[10px] text-foreground-subtle">william.design@gmail.com</p>
          </div>
          <button className="text-foreground-subtle hover:text-foreground-muted shrink-0">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="mt-2 flex items-center rounded-lg bg-card-elevated p-0.5">
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] transition-colors ${
              theme === "light"
                ? "bg-hover-elevated text-foreground-secondary"
                : "text-foreground-subtle hover:text-foreground-muted"
            }`}
          >
            <Sun className="h-3 w-3" />
            <span>Light</span>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] transition-colors ${
              theme === "dark"
                ? "bg-hover-elevated text-foreground-secondary"
                : "text-foreground-subtle hover:text-foreground-muted"
            }`}
          >
            <Moon className="h-3 w-3" />
            <span>Dark</span>
          </button>
        </div>
      </div>
    </div>
  )
}
