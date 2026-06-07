"use client"

import { MessageSquarePlus, Search, Clock, Settings, User, Code2, ImageIcon, Mic, MessageCircle } from "lucide-react"
import Image from "next/image"
import type { Mode } from "@/app/page"

interface NavRailProps {
  activeMode: Mode
  onModeChange: (mode: Mode) => void
}

export function NavRail({ activeMode, onModeChange }: NavRailProps) {
  const modeItems: { id: Mode; icon: React.ElementType; label: string }[] = [
    { id: "chat", icon: MessageCircle, label: "Chat" },
    { id: "image", icon: ImageIcon, label: "Image" },
    { id: "voice", icon: Mic, label: "Voice" },
    { id: "code", icon: Code2, label: "Code" },
  ]

  const utilityItems = [
    { id: "search", icon: Search, label: "Search" },
    { id: "recent", icon: Clock, label: "Recent" },
  ]

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="flex h-full w-12 flex-col items-center border-r border-border bg-background-secondary/50 backdrop-blur-xl py-3 shrink-0">
      {/* Logo */}
      <div className="mb-3 flex h-8 w-8 items-center justify-center">
        <Image
          src="/ol_logo.png"
          alt="OpenLogic AI"
          width={26}
          height={26}
          className="object-contain"
        />
      </div>

      {/* Mode Navigation */}
      <div className="flex flex-col items-center gap-0.5 mb-2">
        {modeItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            onClick={() => onModeChange(item.id)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
              activeMode === item.id
                ? "bg-primary/15 text-primary shadow-sm"
                : "text-foreground-subtle hover:bg-hover hover:text-foreground-muted"
            }`}
          >
            {activeMode === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
            )}
            <item.icon className="h-[18px] w-[18px]" />
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="my-2 h-px w-6 bg-border" />

      {/* Utility Navigation */}
      <div className="flex flex-1 flex-col items-center gap-0.5">
        {utilityItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted"
          >
            <item.icon className="h-[18px] w-[18px]" />
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center gap-0.5">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted"
          >
            <item.icon className="h-[18px] w-[18px]" />
          </button>
        ))}
      </div>
    </div>
  )
}
