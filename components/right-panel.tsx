"use client"

import { ChevronUp, ChevronRight, ChevronLeft, Stethoscope, Box, Volume2, Link2 } from "lucide-react"

interface RightPanelProps {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  width?: number
  onWidthChange?: (width: number) => void
}

export function RightPanel({ 
  isCollapsed = false, 
  onToggleCollapse,
  width = 240,
  onWidthChange
}: RightPanelProps) {
  const systemStatus = [
    { 
      id: "router", 
      label: "Router", 
      status: "Online", 
      statusColor: "text-primary", 
      model: "gpt-4-turbo",
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted border border-primary-border">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )
    },
    { 
      id: "local-model", 
      label: "Local Model", 
      status: "Loaded", 
      statusColor: "text-primary", 
      model: "Qwen2.5-1.5B",
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-400/10 border border-purple-400/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-400">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )
    },
    { 
      id: "voice-engine", 
      label: "Voice Engine", 
      status: "Neady", 
      statusColor: "text-primary", 
      model: "NabanitaNeural",
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/10 border border-red-400/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-400">
            <path d="M12 2V22M8 6V18M16 6V18M4 10V14M20 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )
    },
    { 
      id: "ocr-engine", 
      label: "OCR Engine", 
      status: "Ready", 
      statusColor: "text-primary", 
      model: "RapidGCR",
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-icon-bg border border-border">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-foreground-muted">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 7H9M15 7H17M7 17H9M15 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )
    },
    { 
      id: "groq", 
      label: "Groq", 
      status: "Online", 
      statusColor: "text-green-400", 
      model: "llama-3.1-8b",
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/10 border border-yellow-400/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-yellow-400">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    },
  ]

  const quickActions = [
    { id: "system-doctor", label: "System Doctor", icon: Stethoscope },
    { id: "model-manager", label: "Model Manager", icon: Box },
    { id: "voice-settings", label: "Voice Settings", icon: Volume2 },
    { id: "api-connections", label: "API Connections", icon: Link2 },
  ]

  const usageMetrics = [
    { label: "CPU Usage", value: "18%", percentage: 18, color: "bg-red-400" },
    { label: "Memory", value: "2.1 GB / 8 GB", percentage: 26, color: "bg-red-400" },
    { label: "Disk", value: "45 GB / 256 GB", percentage: 18, color: "bg-blue-400" },
    { label: "Network", value: "12 req/s", percentage: 40, color: "bg-blue-400" },
  ]

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = width

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.min(400, Math.max(180, startWidth - (e.clientX - startX)))
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
    // When collapsed, the entire right panel disappears - workspace expands automatically
    return null
  }

  return (
    <div 
      className="relative flex h-full flex-col gap-4 p-4 bg-background"
      style={{ width: `${width}px` }}
    >
      {/* Resize Handle */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/20 transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* Header with Collapse Button */}
      <div className="flex items-center justify-end mb-2">
        <button 
          onClick={onToggleCollapse}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted"
          title="Collapse panel"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* System Status Card */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">System Status</h3>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs text-primary">All Good</span>
          </div>
        </div>
        <div className="space-y-3">
          {systemStatus.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {item.icon}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-foreground">{item.label}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <div className={`h-1.5 w-1.5 rounded-full ${item.id === "groq" ? "bg-green-400" : "bg-primary"}`} />
                  <span className={`text-xs ${item.statusColor}`}>{item.status}</span>
                </div>
                <p className="text-[10px] text-foreground-subtle">{item.model}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Quick Actions</h3>
          <ChevronUp className="h-4 w-4 text-foreground-subtle" />
        </div>
        <div className="space-y-1">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-hover"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                <action.icon className="h-4 w-4 text-foreground-muted" />
              </div>
              <span className="flex-1 text-[13px] text-foreground-secondary">{action.label}</span>
              <ChevronRight className="h-4 w-4 text-foreground-subtle" />
            </button>
          ))}
        </div>
      </div>

      {/* Usage Overview Card */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-medium text-foreground">Usage Overview</h3>
        <div className="space-y-3">
          {usageMetrics.map((metric, index) => (
            <div key={index}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[11px] text-foreground-muted">{metric.label}</span>
                <span className="text-[11px] text-foreground-secondary">{metric.value}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-hover-elevated">
                <div
                  className={`h-full rounded-full ${metric.color}`}
                  style={{ width: `${metric.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Network Graph */}
        <div className="mt-4 h-10">
          <svg className="h-full w-full" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path
              d="M0 30 Q 20 25, 40 28 T 80 22 T 120 26 T 160 20 T 200 24"
              fill="none"
              stroke="rgba(168, 85, 247, 0.4)"
              strokeWidth="2"
            />
            <path
              d="M0 32 Q 30 28, 60 30 T 100 26 T 140 28 T 180 22 T 200 26"
              fill="none"
              stroke="rgba(168, 85, 247, 0.2)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
