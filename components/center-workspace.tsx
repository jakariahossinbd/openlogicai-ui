"use client"

import { MessageSquare, Image, Video, Code2, Mic, Layout, FileText, Plus, Paperclip, Smile, ChevronDown } from "lucide-react"

export function CenterWorkspace() {
  // Shortcut buttons with original accent colors:
  // Chat: Blue, Image: Cyan, Video: Orange, Code: Blue/Cyan, Voice: Purple, UI Design: Purple, File: Neutral White
  const shortcuts = [
    { id: "chat", label: "Chat", icon: MessageSquare, active: true, iconColor: "text-blue-400" },
    { id: "image", label: "Image", icon: Image, iconColor: "text-cyan-400" },
    { id: "video", label: "Video", icon: Video, iconColor: "text-orange-400" },
    { id: "code", label: "Code", icon: Code2, iconColor: "text-cyan-400" },
    { id: "voice", label: "Voice", icon: Mic, iconColor: "text-purple-400" },
    { id: "ui-design", label: "UI Design", icon: Layout, iconColor: "text-purple-400" },
    { id: "file", label: "File", icon: FileText, iconColor: "text-foreground-secondary" },
  ]

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Top Section with Shortcut Card - Near top, not vertically centered */}
      <div className="flex flex-col items-center pt-16">
        {/* Shortcut Card - Positioned near top */}
        <div className="rounded-xl border border-border bg-card px-6 py-4 backdrop-blur-sm">
          <p className="mb-3 text-center text-sm text-foreground-secondary">
            Ask me anything or use the shortcuts below
          </p>
          <div className="flex items-center gap-2">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut.id}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  shortcut.active
                    ? "bg-primary-muted text-primary border border-primary-border"
                    : "border border-border bg-card text-foreground-secondary hover:bg-hover"
                }`}
              >
                <shortcut.icon className={`h-4 w-4 ${shortcut.active ? "" : shortcut.iconColor}`} />
                <span>{shortcut.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Spacer to push composer to bottom */}
      <div className="flex-1" />

      {/* Bottom Composer */}
      <div className="p-4">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-card p-4 backdrop-blur-sm">
            {/* Input Area */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Type a message or command..."
                className="w-full bg-transparent text-sm text-foreground-secondary placeholder:text-foreground-subtle focus:outline-none"
              />
            </div>

            {/* Tools Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
                  <Smile className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
                  <span className="text-sm">/</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground-secondary transition-colors hover:bg-hover-elevated">
                  <Mic className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  <AudioWave />
                </button>
              </div>
            </div>
          </div>

          {/* Dropdowns Row */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground-secondary transition-colors hover:bg-hover">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Agent</span>
              <ChevronDown className="h-3 w-3 text-foreground-subtle" />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground-secondary transition-colors hover:bg-hover">
              <div className="h-4 w-4 rounded bg-gradient-to-br from-cyan-400 to-green-400" />
              <span>GPT 5.5 Codex</span>
              <ChevronDown className="h-3 w-3 text-foreground-subtle" />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground-secondary transition-colors hover:bg-hover">
              <span>Default</span>
              <ChevronDown className="h-3 w-3 text-foreground-subtle" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AudioWave() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 12V10M8 12V8M12 12V6M16 12V8M20 12V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 12V14M8 12V16M12 12V18M16 12V16M20 12V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
