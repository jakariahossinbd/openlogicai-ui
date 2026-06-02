"use client"

import { Search, Bell, Settings, Minus, Square, X, PanelLeft } from "lucide-react"

interface TopHeaderProps {
  isSidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export function TopHeader({ isSidebarCollapsed = false, onToggleSidebar }: TopHeaderProps) {
  return (
    <header className="flex h-[48px] items-center justify-between border-b border-border bg-background px-3 shrink-0">
      {/* Left - sidebar toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          title={isSidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
          className={`rounded-lg p-2 transition-colors hover:bg-hover ${
            isSidebarCollapsed ? "text-primary" : "text-foreground-subtle hover:text-foreground-muted"
          }`}
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Center - Search */}
      <div className="flex flex-1 justify-center px-6">
        <div className="relative w-full max-w-[440px]">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-foreground-subtle shrink-0" />
            <input
              type="text"
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-[13px] text-foreground-secondary placeholder:text-foreground-subtle focus:outline-none"
            />
            <div className="flex items-center gap-1 rounded border border-border-subtle bg-card-elevated px-1.5 py-0.5">
              <span className="text-[10px] text-foreground-subtle">Ctrl K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - actions + window controls */}
      <div className="flex items-center gap-0.5">
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <Bell className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <Settings className="h-4 w-4" />
        </button>
        <div className="mx-2 h-4 w-px bg-border" />
        {/* Window controls */}
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <Minus className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <Square className="h-3.5 w-3.5" />
        </button>
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-red-400">
          <X className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
