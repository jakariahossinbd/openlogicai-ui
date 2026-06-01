"use client"

import { Search, Grid3X3, LayoutGrid, PanelRight, AppWindow, Bell, Settings, Minus, Square, X, ChevronLeft } from "lucide-react"

interface TopHeaderProps {
  isRightPanelCollapsed?: boolean
  onToggleRightPanel?: () => void
}

export function TopHeader({ isRightPanelCollapsed = false, onToggleRightPanel }: TopHeaderProps) {
  return (
    <header className="flex h-[54px] items-center justify-between border-b border-border bg-background px-4">
      {/* Left - Title Only (logo moved to NavRail) */}
      <div className="flex items-center gap-2 w-[260px]">
        <h1 className="text-[15px] font-semibold text-foreground">OpenLogic AI</h1>
      </div>

      {/* Center - Search */}
      <div className="flex flex-1 justify-center px-8">
        <div className="relative w-full max-w-[480px]">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-foreground-subtle" />
            <input
              type="text"
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-sm text-foreground-secondary placeholder:text-foreground-subtle focus:outline-none"
            />
            <div className="flex items-center gap-1 rounded border border-border-subtle bg-card-elevated px-1.5 py-0.5">
              <span className="text-[10px] text-foreground-subtle">Ctrl K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-1">
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <Grid3X3 className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button 
          onClick={onToggleRightPanel}
          className={`rounded-lg p-2 transition-colors hover:bg-hover hover:text-foreground-muted ${
            isRightPanelCollapsed ? "text-primary" : "text-foreground-subtle"
          }`}
          title={isRightPanelCollapsed ? "Show right panel" : "Hide right panel"}
        >
          <PanelRight className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <AppWindow className="h-4 w-4" />
        </button>
        <div className="mx-2 h-4 w-px bg-border" />
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <Bell className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-2 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <Settings className="h-4 w-4" />
        </button>
        <div className="mx-2 h-4 w-px bg-border" />
        {/* Window Controls */}
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
