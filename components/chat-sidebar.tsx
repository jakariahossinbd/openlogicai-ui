"use client"

import { useState, useRef, useEffect } from "react"
import {
  Plus,
  MessageSquare,
  Search,
  MoreHorizontal,
  Paperclip,
  SendHorizonal,
  Mic,
  ChevronDown,
  Bot,
  User,
  Code2,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  time: string
}

const SAMPLE_MESSAGES: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Create a React component for a button with loading state",
    time: "2:34 PM",
  },
  {
    id: "2",
    role: "assistant",
    content: "I'll create a Button component with loading state for you. Here's the implementation:",
    time: "2:34 PM",
  },
]

export function ChatSidebar() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${Math.min(ta.scrollHeight, 100)}px`
  }, [input])

  return (
    <div className="flex h-full w-72 flex-col border-r border-border/50 bg-card/50 backdrop-blur-xl shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="text-[13px] font-semibold text-foreground">AI Assistant</span>
        </div>
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
              msg.role === "user" 
                ? "bg-primary/15" 
                : "bg-card border border-border/50"
            }`}>
              {msg.role === "user" ? (
                <User className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Bot className="h-3.5 w-3.5 text-foreground-muted" />
              )}
            </div>
            <div className={`flex-1 rounded-xl px-3 py-2 ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-card/80 border border-border/50 text-foreground-secondary"
            }`}>
              <p className="text-[12px] leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-border/50 p-3">
        <div className="rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm p-2.5">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to help with your code..."
            rows={1}
            className="w-full resize-none bg-transparent text-[12px] text-foreground-secondary placeholder:text-foreground-subtle focus:outline-none leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (input.trim()) {
                  setMessages([...messages, {
                    id: Date.now().toString(),
                    role: "user",
                    content: input,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  }])
                  setInput("")
                }
              }
            }}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-0.5">
              <button className="rounded-md p-1.5 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
                <Paperclip className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              className={`flex h-6 w-6 items-center justify-center rounded-lg transition-colors ${
                input.trim()
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted text-foreground-subtle cursor-not-allowed"
              }`}
              disabled={!input.trim()}
            >
              <SendHorizonal className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Model picker */}
        <div className="mt-2 flex items-center gap-1.5">
          <button className="flex items-center gap-1 rounded-md border border-border/50 bg-card/50 px-2 py-1 text-[10px] text-foreground-secondary transition-colors hover:bg-hover">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Agent</span>
            <ChevronDown className="h-2.5 w-2.5 text-foreground-subtle" />
          </button>
        </div>
      </div>

      {/* User */}
      <div className="shrink-0 border-t border-border/50 p-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" />
            <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500 text-[10px] text-white">WK</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate">William Kim</p>
          </div>
          <button className="text-foreground-subtle hover:text-foreground-muted shrink-0">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
