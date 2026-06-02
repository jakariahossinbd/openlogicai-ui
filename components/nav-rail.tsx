"use client"

import { MessageSquarePlus, Search, Clock, Settings, User } from "lucide-react"
import Image from "next/image"

interface NavRailProps {
  activeItem?: string
  onItemClick?: (id: string) => void
}

export function NavRail({ activeItem = "chat", onItemClick }: NavRailProps) {
  const navItems = [
    { id: "chat", icon: MessageSquarePlus, label: "New Chat" },
    { id: "search", icon: Search, label: "Search" },
    { id: "recent", icon: Clock, label: "Recent" },
  ]

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="flex h-full w-12 flex-col items-center border-r border-border bg-background-secondary py-3 shrink-0">
      {/* Logo */}
      <div className="mb-4 flex h-8 w-8 items-center justify-center">
        <Image
          src="/ol_logo.png"
          alt="OpenLogic AI"
          width={28}
          height={28}
          className="object-contain"
        />
      </div>

      {/* Divider */}
      <div className="mb-3 h-px w-6 bg-border" />

      {/* Main Navigation */}
      <div className="flex flex-1 flex-col items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            onClick={() => onItemClick?.(item.id)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              activeItem === item.id
                ? "bg-primary-muted text-primary"
                : "text-foreground-subtle hover:bg-hover hover:text-foreground-muted"
            }`}
          >
            <item.icon className="h-[18px] w-[18px]" />
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center gap-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            onClick={() => onItemClick?.(item.id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted"
          >
            <item.icon className="h-[18px] w-[18px]" />
          </button>
        ))}
      </div>
    </div>
  )
}
