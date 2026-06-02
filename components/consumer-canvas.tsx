"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bot,
  Sparkles,
  Mic,
  Volume2,
  Play,
  Pause,
  Paperclip,
  SendHorizonal,
  ArrowUp,
  ImageIcon,
  Wand2,
  Code2,
  MessageCircle,
  Plus,
} from "lucide-react"
import type { Mode } from "@/app/page"

interface ConsumerCanvasProps {
  activeMode: Mode
  onModeChange: (mode: Mode) => void
}

const MODES: { id: Mode; label: string; icon: React.ElementType }[] = [
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "voice", label: "Voice", icon: Mic },
  { id: "code", label: "Code", icon: Code2 },
]

export function ConsumerCanvas({ activeMode, onModeChange }: ConsumerCanvasProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`
  }, [input])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Top Navigation Pills */}
      <div className="flex items-center justify-center py-4 px-6 shrink-0">
        <div className="flex items-center gap-1 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 p-1.5 shadow-lg">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                activeMode === m.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground-muted hover:text-foreground-secondary hover:bg-hover"
              }`}
            >
              <m.icon className="h-4 w-4" />
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-6 pb-6">
        {/* Content Area */}
        <div className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center">
          {activeMode === "chat" && <ChatContent />}
          {activeMode === "image" && <ImageContent />}
          {activeMode === "voice" && <VoiceContent />}
        </div>

        {/* Bottom Composer */}
        <div className="w-full max-w-3xl mt-auto">
          <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Glassmorphism glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative p-4">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  activeMode === "chat"
                    ? "Message OpenLogic AI..."
                    : activeMode === "image"
                    ? "Describe the image you want to create..."
                    : "Describe what you want to say..."
                }
                rows={1}
                className="w-full resize-none bg-transparent text-[15px] text-foreground placeholder:text-foreground-subtle focus:outline-none leading-relaxed pr-12"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    if (input.trim()) setInput("")
                  }
                }}
              />

              {/* Actions Row */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1">
                  <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] text-foreground-muted transition-colors hover:bg-hover hover:text-foreground-secondary">
                    <Paperclip className="h-4 w-4" />
                    <span>Attach</span>
                  </button>
                  {activeMode === "chat" && (
                    <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] text-foreground-muted transition-colors hover:bg-hover hover:text-foreground-secondary">
                      <Wand2 className="h-4 w-4" />
                      <span>Templates</span>
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-card px-3 py-1.5 text-[11px] text-foreground-secondary transition-colors hover:bg-hover">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>GPT 5.5 Codex</span>
                  </button>
                  
                  <button
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                      input.trim()
                        ? "bg-primary text-primary-foreground shadow-lg hover:opacity-90"
                        : "bg-muted text-foreground-subtle cursor-not-allowed"
                    }`}
                    disabled={!input.trim()}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-[11px] text-foreground-subtle mt-3">
            OpenLogic AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Chat Content ─────────────────────────────────────────────────────────────
function ChatContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl">
          <Bot className="h-10 w-10 text-primary" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-foreground text-balance">How can I help you today?</h1>
        <p className="max-w-md text-[15px] text-foreground-muted text-pretty leading-relaxed">
          Ask me anything, get help with writing, analysis, coding, math, and more.
        </p>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {[
          "Explain quantum computing simply",
          "Write a React component",
          "Debug my Python code",
          "Summarize a research paper",
          "Plan a marketing strategy",
          "Create a meal plan",
        ].map((suggestion) => (
          <button
            key={suggestion}
            className="rounded-full border border-border/50 bg-card/60 backdrop-blur-sm px-4 py-2 text-[13px] text-foreground-secondary transition-all hover:bg-hover hover:border-primary/30 hover:text-primary hover:shadow-md"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Image Content ────────────────────────────────────────────────────────────
function ImageContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full scale-150" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl">
          <Sparkles className="h-10 w-10 text-cyan-400" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-foreground text-balance">Create stunning images</h1>
        <p className="max-w-md text-[15px] text-foreground-muted text-pretty leading-relaxed">
          Describe what you envision and I&apos;ll generate it for you in seconds.
        </p>
      </div>

      {/* Preview grid */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
        {[
          { label: "Futuristic city", gradient: "from-cyan-900/80 to-slate-900/80" },
          { label: "Abstract art", gradient: "from-purple-900/80 to-indigo-900/80" },
          { label: "Nature scene", gradient: "from-emerald-900/80 to-teal-900/80" },
          { label: "Portrait", gradient: "from-rose-900/80 to-orange-900/80" },
          { label: "Architecture", gradient: "from-slate-800/80 to-zinc-900/80" },
          { label: "Landscape", gradient: "from-sky-900/80 to-blue-900/80" },
        ].map((item) => (
          <div
            key={item.label}
            className={`relative aspect-square rounded-2xl bg-gradient-to-br ${item.gradient} border border-border/30 backdrop-blur-sm flex items-end p-3 cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="rounded-lg bg-black/40 px-2.5 py-1.5 backdrop-blur-md">
              <span className="text-[12px] font-medium text-white/90">{item.label}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
              <ImageIcon className="h-12 w-12 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Voice Content ────────────────────────────────────────────────────────────
function VoiceContent() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-150" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl">
          <Volume2 className="h-10 w-10 text-purple-400" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-foreground text-balance">Voice Studio</h1>
        <p className="max-w-md text-[15px] text-foreground-muted text-pretty leading-relaxed">
          Have natural conversations or generate speech from text.
        </p>
      </div>

      {/* Audio player card */}
      <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 shadow-xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-500/20">
            <Mic className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-foreground">Voice Response</p>
            <p className="text-[12px] text-foreground-subtle">Ready to play</p>
          </div>
        </div>

        {/* Waveform visualizer */}
        <div className="mb-5 flex h-16 items-center justify-center gap-0.5">
          {Array.from({ length: 60 }).map((_, i) => {
            const h = Math.sin(i * 0.3) * 0.5 + 0.5
            return (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${playing ? "bg-purple-400" : "bg-border"}`}
                style={{ height: `${Math.max(6, h * 56)}px` }}
              />
            )
          })}
        </div>

        {/* Progress */}
        <div className="mb-5 flex items-center gap-3 text-[12px] text-foreground-subtle">
          <span>0:00</span>
          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
            <div className="h-full w-0 rounded-full bg-purple-400 transition-all" />
          </div>
          <span>0:32</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
          >
            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
