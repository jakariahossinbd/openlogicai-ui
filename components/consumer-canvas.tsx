"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Bot,
  Sparkles,
  Mic,
  MicOff,
  Paperclip,
  ArrowUp,
  ImageIcon,
  Wand2,
  Code2,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  PanelRightClose,
  PanelRightOpen,
  Zap,
  Clock,
  BookOpen,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  User,
  Play,
  Square,
  Maximize2,
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
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`
  }, [input])

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Center column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation Pills */}
        <div className="flex items-center justify-between py-4 px-6 shrink-0">
          <div className="flex items-center gap-1 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 p-1.5 shadow-lg mx-auto">
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

          {/* Right panel toggle */}
          <button
            onClick={() => setRightPanelOpen((v) => !v)}
            title={rightPanelOpen ? "Close panel" : "Open panel"}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted"
          >
            {rightPanelOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Voice mode gets its own full-screen layout */}
        {activeMode === "voice" ? (
          <VoiceCanvas />
        ) : (
          /* Chat / Image main canvas + composer */
          <div className="flex flex-1 flex-col items-center overflow-hidden px-6 pb-6">
            <div className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center">
              {activeMode === "chat" && <ChatContent />}
              {activeMode === "image" && <ImageContent />}
            </div>

            {/* Bottom Composer */}
            <div className="w-full max-w-3xl mt-auto">
              <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative p-4">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      activeMode === "chat"
                        ? "Message OpenLogic AI..."
                        : "Describe the image you want to create..."
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

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                    <div className="flex items-center gap-1">
                      <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] text-foreground-muted transition-colors hover:bg-hover hover:text-foreground-secondary">
                        <Paperclip className="h-4 w-4" />
                        <span>Attach</span>
                      </button>
                      <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] text-foreground-muted transition-colors hover:bg-hover hover:text-foreground-secondary">
                        <Mic className="h-4 w-4" />
                        <span>Voice</span>
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
                        <ChevronDown className="h-3 w-3 text-foreground-subtle" />
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
        )}
      </div>

      {/* Contextual Right Panel */}
      <RightPanel activeMode={activeMode} open={rightPanelOpen} />
    </div>
  )
}

// ─── Chat Content ─────────────────────────────────────────────────────────────
function ChatContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      {/* Premium smooth cinematic glow icon */}
      <div className="relative flex items-center justify-center">
        {/* Ultra-diffused outer glow — cinematic, no banding */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "280px",
            height: "280px",
            background: "radial-gradient(circle at center, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.06) 40%, rgba(56,189,248,0) 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Soft inner accent glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "140px",
            height: "140px",
            background: "radial-gradient(circle at center, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0) 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl">
          <Bot className="h-8 w-8 text-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-lg font-medium text-foreground-secondary text-balance">How can I help you today?</h1>
        <p className="max-w-md text-sm text-foreground-muted/80 text-pretty leading-relaxed">
          Ask me anything — writing, analysis, coding, math, and more.
        </p>
      </div>

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
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative flex items-center justify-center">
        {/* Ultra-diffused outer glow — cinematic, no banding */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "280px",
            height: "280px",
            background: "radial-gradient(circle at center, rgba(56,189,248,0.12) 0%, rgba(168,85,247,0.08) 35%, rgba(168,85,247,0) 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Soft inner accent glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "140px",
            height: "140px",
            background: "radial-gradient(circle at center, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0) 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl">
          <Sparkles className="h-8 w-8 text-cyan-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-lg font-medium text-foreground-secondary text-balance">Create stunning images</h1>
        <p className="max-w-md text-sm text-foreground-muted/80 text-pretty leading-relaxed">
          Describe what you envision and it will be generated in seconds.
        </p>
      </div>

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

// ─── Voice Canvas (full dedicated layout) ─────────────────────────────────────
function VoiceCanvas() {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState<{ id: number; speaker: "ai" | "user"; text: string }[]>([
    { id: 1, speaker: "ai", text: "Hello! I'm ready to have a conversation. Press the button below to start speaking." },
  ])
  const animFrameRef = useRef<number>(0)
  const barsRef = useRef<number[]>(Array.from({ length: 48 }, () => 4))
  const [bars, setBars] = useState<number[]>(barsRef.current)

  const animateBars = useCallback(() => {
    barsRef.current = barsRef.current.map((_, i) => {
      // Simulate a natural voice waveform: center bars tallest
      const center = 23.5
      const distFromCenter = Math.abs(i - center) / center
      const envelope = 1 - distFromCenter * 0.6
      const wave = Math.sin(Date.now() * 0.008 + i * 0.5) * 0.5 + 0.5
      const noise = Math.random() * 0.4
      return Math.max(3, Math.round(envelope * (wave * 0.6 + noise * 0.4) * 64))
    })
    setBars([...barsRef.current])
    animFrameRef.current = requestAnimationFrame(animateBars)
  }, [])

  useEffect(() => {
    if (listening) {
      animFrameRef.current = requestAnimationFrame(animateBars)
    } else {
      cancelAnimationFrame(animFrameRef.current)
      setBars(Array.from({ length: 48 }, (_, i) => {
        const center = 23.5
        const dist = Math.abs(i - center) / center
        return Math.round((1 - dist) * 18 + 3)
      }))
    }
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [listening, animateBars])

  const handleToggle = () => {
    setListening((v) => {
      if (!v) {
        // Simulate AI responding after 2.5s
        setTimeout(() => {
          setTranscript((t) => [
            ...t,
            { id: Date.now(), speaker: "user", text: "Tell me something interesting about the universe." },
          ])
          setTimeout(() => {
            setTranscript((t) => [
              ...t,
              { id: Date.now() + 1, speaker: "ai", text: "The observable universe contains over 2 trillion galaxies. Each one holds hundreds of billions of stars — and around many of those stars orbit planets that could host life." },
            ])
          }, 1200)
        }, 2500)
      }
      return !v
    })
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-between overflow-hidden pb-10 px-6">
      {/* Top ambient glow + waveform */}
      <div className="flex flex-1 flex-col items-center justify-center w-full max-w-2xl gap-10">
        {/* Central orb + glow */}
        <div className="relative flex items-center justify-center">
          {/* Ultra-diffused outer glow — cinematic, no banding */}
          <div
            className="absolute rounded-full transition-all duration-500 pointer-events-none"
            style={{
              width: listening ? "360px" : "280px",
              height: listening ? "360px" : "280px",
              background: listening
                ? "radial-gradient(circle at center, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.06) 40%, rgba(168,85,247,0) 70%)"
                : "radial-gradient(circle at center, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.03) 45%, rgba(168,85,247,0) 70%)",
              filter: "blur(100px)",
            }}
          />
          {/* Soft inner accent glow */}
          <div
            className="absolute rounded-full transition-all duration-500 pointer-events-none"
            style={{
              width: listening ? "180px" : "140px",
              height: listening ? "180px" : "140px",
              background: "radial-gradient(circle at center, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0) 70%)",
              filter: "blur(60px)",
            }}
          />
          {/* Orb */}
          <div
            className={`relative flex h-24 w-24 items-center justify-center rounded-full border transition-all duration-500 shadow-2xl ${
              listening
                ? "border-purple-400/40 bg-purple-500/20 backdrop-blur-xl"
                : "border-border/50 bg-card/80 backdrop-blur-xl"
            }`}
          >
            {listening ? (
              <MicOff className="h-10 w-10 text-purple-300" />
            ) : (
              <Mic className="h-10 w-10 text-purple-400" />
            )}
          </div>
        </div>

        {/* Animated waveform bars */}
        <div className="flex h-24 w-full max-w-md items-center justify-center gap-[3px]">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                listening ? "bg-purple-400" : "bg-border/60"
              }`}
              style={{
                width: "4px",
                height: `${h}px`,
                transitionDuration: listening ? "60ms" : "300ms",
              }}
            />
          ))}
        </div>

        {/* Status */}
        <div className="text-center space-y-1">
          <p className={`text-[15px] font-medium transition-colors ${listening ? "text-purple-300" : "text-foreground-muted"}`}>
            {listening ? "Listening..." : "Ready to listen"}
          </p>
          <p className="text-[13px] text-foreground-subtle">
            {listening ? "Speak now — release to send" : "Press the microphone to start"}
          </p>
        </div>

        {/* Big mic button */}
        <button
          onClick={handleToggle}
          className={`relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 shadow-xl ${
            listening
              ? "bg-purple-500 shadow-purple-500/30 scale-110 hover:bg-purple-600"
              : "bg-card border border-border/60 hover:bg-hover hover:scale-105"
          }`}
        >
          {listening ? (
            <Square className="h-6 w-6 text-white fill-white" />
          ) : (
            <Mic className="h-7 w-7 text-foreground-secondary" />
          )}
          {listening && (
            <span className="absolute -inset-2 rounded-full border-2 border-purple-400/30 animate-ping" />
          )}
        </button>
      </div>

      {/* Transcription / subtitle panel */}
      <div className="w-full max-w-2xl rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-4 space-y-3 max-h-52 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-subtle mb-2">Live Transcription</p>
        {transcript.map((line) => (
          <div key={line.id} className={`flex items-start gap-3 ${line.speaker === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              line.speaker === "ai" ? "bg-purple-500/20 border border-purple-500/30" : "bg-primary/15 border border-primary/20"
            }`}>
              {line.speaker === "ai" ? (
                <Volume2 className="h-3.5 w-3.5 text-purple-400" />
              ) : (
                <User className="h-3.5 w-3.5 text-primary" />
              )}
            </div>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed ${
              line.speaker === "ai"
                ? "bg-card border border-border/50 text-foreground-secondary"
                : "bg-primary/15 border border-primary/20 text-foreground-secondary"
            }`}>
              {line.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Contextual Right Panel ───────────────────────────────────────────────────
interface RightPanelProps {
  activeMode: Mode
  open: boolean
}

function RightPanel({ activeMode, open }: RightPanelProps) {
  if (!open) return null

  return (
    <div
      className="flex h-full w-64 shrink-0 flex-col border-l border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden transition-all duration-300"
      style={{ animation: "slideInFromRight 0.25s ease" }}
    >
      {activeMode === "chat" && <ChatPanel />}
      {activeMode === "image" && <ImagePanel />}
      {activeMode === "voice" && <VoicePanel />}
    </div>
  )
}

// Chat right panel
function ChatPanel() {
  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 gap-6">
      {/* Quick Prompts */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">Quick Prompts</span>
        </div>
        <div className="space-y-1.5">
          {[
            "Summarize this article",
            "Fix my code",
            "Explain like I'm 5",
            "Make it more concise",
            "Translate to Spanish",
          ].map((p) => (
            <button
              key={p}
              className="w-full text-left rounded-lg border border-border/40 bg-card/50 px-3 py-2 text-[12px] text-foreground-secondary transition-all hover:bg-hover hover:border-primary/30 hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* System Status */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3.5 w-3.5 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-green-400" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">System Status</span>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-3 space-y-2.5">
          {[
            { label: "API", value: "Operational", color: "text-green-400" },
            { label: "Inference", value: "Fast", color: "text-green-400" },
            { label: "Model", value: "GPT 5.5 Codex", color: "text-foreground-secondary" },
            { label: "Context", value: "128k tokens", color: "text-foreground-secondary" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-[11px] text-foreground-subtle">{item.label}</span>
              <span className={`text-[11px] font-medium ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Artifacts */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-3.5 w-3.5 text-foreground-subtle" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">Recent Artifacts</span>
        </div>
        <div className="space-y-1.5">
          {[
            { name: "Button component", type: "Code", time: "2m ago" },
            { name: "Marketing copy", type: "Text", time: "14m ago" },
            { name: "SQL query", type: "Code", time: "1h ago" },
          ].map((a) => (
            <div
              key={a.name}
              className="flex items-center gap-2.5 rounded-lg border border-border/40 bg-card/50 px-3 py-2 cursor-pointer hover:bg-hover transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-foreground-subtle shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-foreground-secondary truncate">{a.name}</p>
                <p className="text-[10px] text-foreground-subtle">{a.type} · {a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Image generation right panel
function ImagePanel() {
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [style, setStyle] = useState("Photorealistic")
  const [resolution, setResolution] = useState("1024x1024")

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 gap-6">
      <div className="flex items-center gap-2 mb-1">
        <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">Generation Settings</span>
      </div>

      {/* Aspect Ratio */}
      <section>
        <p className="text-[11px] font-medium text-foreground-secondary mb-2">Aspect Ratio</p>
        <div className="grid grid-cols-3 gap-1.5">
          {["1:1", "16:9", "9:16", "4:3", "3:2", "2:3"].map((r) => (
            <button
              key={r}
              onClick={() => setAspectRatio(r)}
              className={`rounded-lg border py-2 text-[11px] font-medium transition-all ${
                aspectRatio === r
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border/40 bg-card/50 text-foreground-secondary hover:bg-hover"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      {/* Style */}
      <section>
        <p className="text-[11px] font-medium text-foreground-secondary mb-2">Style</p>
        <div className="space-y-1.5">
          {["Photorealistic", "Digital Art", "Watercolor", "Oil Painting", "Anime", "Sketch"].map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`w-full text-left rounded-lg border px-3 py-2 text-[12px] transition-all ${
                style === s
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border/40 bg-card/50 text-foreground-secondary hover:bg-hover"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Resolution */}
      <section>
        <p className="text-[11px] font-medium text-foreground-secondary mb-2">Resolution</p>
        <div className="space-y-1.5">
          {["512x512", "1024x1024", "1536x1536", "2048x2048"].map((res) => (
            <button
              key={res}
              onClick={() => setResolution(res)}
              className={`w-full text-left rounded-lg border px-3 py-2 text-[12px] transition-all ${
                resolution === res
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border/40 bg-card/50 text-foreground-secondary hover:bg-hover"
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

// Voice settings right panel
function VoicePanel() {
  const [voiceActor, setVoiceActor] = useState("Nova")
  const [speed, setSpeed] = useState(1.0)
  const [pitch, setPitch] = useState(0)

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 gap-6">
      <div className="flex items-center gap-2 mb-1">
        <Volume2 className="h-3.5 w-3.5 text-purple-400" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">Voice Settings</span>
      </div>

      {/* Voice Actor */}
      <section>
        <p className="text-[11px] font-medium text-foreground-secondary mb-2">Voice Actor</p>
        <div className="space-y-1.5">
          {[
            { name: "Nova", desc: "Warm & friendly" },
            { name: "Alloy", desc: "Neutral & clear" },
            { name: "Echo", desc: "Deep & authoritative" },
            { name: "Fable", desc: "Expressive & dramatic" },
            { name: "Onyx", desc: "Rich & resonant" },
            { name: "Shimmer", desc: "Bright & energetic" },
          ].map((v) => (
            <button
              key={v.name}
              onClick={() => setVoiceActor(v.name)}
              className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 transition-all ${
                voiceActor === v.name
                  ? "border-purple-400/50 bg-purple-500/10 text-purple-300"
                  : "border-border/40 bg-card/50 text-foreground-secondary hover:bg-hover"
              }`}
            >
              <span className="text-[12px] font-medium">{v.name}</span>
              <span className="text-[10px] text-foreground-subtle">{v.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Speed */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-foreground-secondary">Speed</p>
          <span className="text-[11px] text-foreground-subtle">{speed.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full accent-purple-400 cursor-pointer"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-foreground-subtle">0.5x</span>
          <span className="text-[10px] text-foreground-subtle">2.0x</span>
        </div>
      </section>

      {/* Pitch */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-medium text-foreground-secondary">Pitch</p>
          <span className="text-[11px] text-foreground-subtle">{pitch > 0 ? `+${pitch}` : pitch}</span>
        </div>
        <input
          type="range"
          min="-10"
          max="10"
          step="1"
          value={pitch}
          onChange={(e) => setPitch(parseInt(e.target.value))}
          className="w-full accent-purple-400 cursor-pointer"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-foreground-subtle">Low</span>
          <span className="text-[10px] text-foreground-subtle">High</span>
        </div>
      </section>

      {/* Mute toggle */}
      <section>
        <p className="text-[11px] font-medium text-foreground-secondary mb-2">Output</p>
        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-purple-400/40 bg-purple-500/10 py-2 text-[12px] text-purple-300 hover:bg-purple-500/15 transition-colors">
            <Volume2 className="h-3.5 w-3.5" />
            <span>Speaker</span>
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border/40 bg-card/50 py-2 text-[12px] text-foreground-muted hover:bg-hover transition-colors">
            <VolumeX className="h-3.5 w-3.5" />
            <span>Mute</span>
          </button>
        </div>
      </section>
    </div>
  )
}
