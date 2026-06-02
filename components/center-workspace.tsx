"use client"

import { useState } from "react"
import {
  ImageIcon,
  Mic,
  Volume2,
  Play,
  Pause,
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  Terminal,
  Maximize2,
  X,
  Bot,
  Sparkles,
} from "lucide-react"

type Mode = "chat" | "image" | "voice" | "code"

interface CenterWorkspaceProps {
  activeMode?: Mode
}

// ─── Chat Canvas ─────────────────────────────────────────────────────────────
function ChatCanvas() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card-elevated">
          <Bot className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground text-balance">How can I help you today?</h2>
        <p className="max-w-sm text-sm text-foreground-muted text-pretty leading-relaxed">
          Start a conversation in the sidebar. Your responses and artifacts will appear here.
        </p>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-lg">
        {[
          "Explain quantum computing",
          "Write a React component",
          "Debug my code",
          "Summarize a document",
          "Plan my project",
          "Generate an image",
        ].map((suggestion) => (
          <button
            key={suggestion}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] text-foreground-secondary transition-colors hover:bg-hover hover:border-primary-border hover:text-primary"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Image Canvas ─────────────────────────────────────────────────────────────
function ImageCanvas() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card-elevated">
          <Sparkles className="h-7 w-7 text-cyan-400" />
        </div>
        <h2 className="text-xl font-semibold text-foreground text-balance">Image Generation</h2>
        <p className="max-w-sm text-sm text-foreground-muted text-pretty leading-relaxed">
          Describe what you want to create in the sidebar and your generated images will appear here.
        </p>
      </div>

      {/* Preview grid */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
        {[
          { label: "Futuristic city", bg: "from-cyan-950 to-slate-900" },
          { label: "Abstract art", bg: "from-purple-950 to-indigo-950" },
          { label: "Nature scene", bg: "from-emerald-950 to-teal-950" },
          { label: "Portrait", bg: "from-rose-950 to-orange-950" },
          { label: "Architecture", bg: "from-slate-900 to-zinc-950" },
          { label: "Landscape", bg: "from-sky-950 to-blue-950" },
        ].map((item) => (
          <div
            key={item.label}
            className={`relative aspect-square rounded-xl bg-gradient-to-br ${item.bg} border border-border flex items-end p-3 cursor-pointer hover:opacity-90 transition-opacity`}
          >
            <div className="rounded-md bg-black/40 px-2 py-1 backdrop-blur-sm">
              <span className="text-[11px] text-white/80">{item.label}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Voice Canvas ─────────────────────────────────────────────────────────────
function VoiceCanvas() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card-elevated">
          <Volume2 className="h-7 w-7 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-foreground text-balance">Voice Studio</h2>
        <p className="max-w-sm text-sm text-foreground-muted text-pretty leading-relaxed">
          Speak or type your prompt in the sidebar. Audio will be synthesized and played back here.
        </p>
      </div>

      {/* Audio player */}
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
            <Mic className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-foreground">Voice Response</p>
            <p className="text-[11px] text-foreground-subtle">Ready to play</p>
          </div>
        </div>

        {/* Waveform visualizer (static) */}
        <div className="mb-4 flex h-12 items-center justify-center gap-0.5">
          {Array.from({ length: 48 }).map((_, i) => {
            const h = Math.sin(i * 0.4) * 0.5 + 0.5
            return (
              <div
                key={i}
                className={`w-1 rounded-full transition-all ${playing ? "bg-purple-400" : "bg-border"}`}
                style={{ height: `${Math.max(4, h * 44)}px` }}
              />
            )
          })}
        </div>

        {/* Progress */}
        <div className="mb-4 flex items-center gap-2 text-[11px] text-foreground-subtle">
          <span>0:00</span>
          <div className="flex-1 h-1 rounded-full bg-border">
            <div className="h-full w-0 rounded-full bg-purple-400" />
          </div>
          <span>0:32</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white shadow transition-opacity hover:opacity-90"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Code Canvas (mini-IDE) ───────────────────────────────────────────────────
const FILES = [
  { name: "src", type: "folder", children: [
    { name: "app", type: "folder", children: [
      { name: "page.tsx", type: "file" },
      { name: "layout.tsx", type: "file" },
    ]},
    { name: "components", type: "folder", children: [
      { name: "Button.tsx", type: "file" },
      { name: "Card.tsx", type: "file" },
    ]},
    { name: "lib", type: "folder", children: [
      { name: "utils.ts", type: "file" },
    ]},
  ]},
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
]

type FileNode = { name: string; type: "file" | "folder"; children?: FileNode[] }

function FileTree({ nodes, depth = 0 }: { nodes: FileNode[]; depth?: number }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ src: true, app: true })

  return (
    <div>
      {nodes.map((node) => (
        <div key={node.name}>
          <button
            onClick={() => node.type === "folder" && setOpen((o) => ({ ...o, [node.name]: !o[node.name] }))}
            className="flex w-full items-center gap-1.5 rounded px-2 py-[3px] text-[12px] text-foreground-secondary transition-colors hover:bg-hover"
            style={{ paddingLeft: `${8 + depth * 12}px` }}
          >
            {node.type === "folder" ? (
              <>
                {open[node.name] ? (
                  <ChevronDown className="h-3 w-3 text-foreground-subtle shrink-0" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-foreground-subtle shrink-0" />
                )}
                {open[node.name] ? (
                  <FolderOpen className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                ) : (
                  <Folder className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                )}
              </>
            ) : (
              <>
                <span className="w-3 shrink-0" />
                <File className="h-3.5 w-3.5 text-foreground-subtle shrink-0" />
              </>
            )}
            <span className="truncate">{node.name}</span>
          </button>
          {node.type === "folder" && open[node.name] && node.children && (
            <FileTree nodes={node.children} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  )
}

const SAMPLE_CODE = `import { useState } from "react"

interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  const [pressed, setPressed] = useState(false)

  const handleClick = () => {
    setPressed(true)
    onClick?.()
    setTimeout(() => setPressed(false), 150)
  }

  return (
    <button
      onClick={handleClick}
      className={\`rounded-lg px-4 py-2 text-sm font-medium transition-all \${
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-card text-foreground"
      } \${pressed ? "scale-95" : "scale-100"}\`}
    >
      {label}
    </button>
  )
}`

function CodeCanvas() {
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [activeFile, setActiveFile] = useState("Button.tsx")

  const lines = SAMPLE_CODE.split("\n")

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* File Explorer */}
      <div className="flex w-44 shrink-0 flex-col border-r border-border bg-background-secondary">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border">
          <span className="text-[10px] font-semibold text-foreground-subtle uppercase tracking-wider">Explorer</span>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          <FileTree nodes={FILES} />
        </div>
      </div>

      {/* Editor + Terminal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center border-b border-border bg-background-secondary shrink-0">
          <div className="flex items-center gap-0 border-r border-border bg-background">
            <button className="flex items-center gap-2 px-4 py-2 text-[12px] text-foreground-secondary">
              <File className="h-3 w-3 text-cyan-400" />
              <span>{activeFile}</span>
              <X className="h-2.5 w-2.5 text-foreground-subtle hover:text-foreground ml-1" />
            </button>
          </div>
        </div>

        {/* Code editor */}
        <div className="flex flex-1 overflow-auto bg-background font-mono text-[12.5px] leading-relaxed min-h-0">
          {/* Line numbers */}
          <div className="shrink-0 select-none border-r border-border bg-background-secondary px-3 py-4 text-right text-[11px] text-foreground-subtle">
            {lines.map((_, i) => (
              <div key={i} className="leading-[1.6rem]">{i + 1}</div>
            ))}
          </div>
          {/* Code */}
          <pre className="flex-1 overflow-auto px-4 py-4 text-foreground-secondary">
            <code>
              {lines.map((line, i) => (
                <div key={i} className="leading-[1.6rem] hover:bg-hover px-1 -mx-1 rounded-sm">
                  {highlightLine(line)}
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Terminal panel */}
        {terminalOpen && (
          <div className="shrink-0 border-t border-border bg-background-secondary" style={{ height: "160px" }}>
            <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-foreground-subtle" />
                <span className="text-[11px] font-medium text-foreground-secondary">Terminal</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded p-1 text-foreground-subtle hover:bg-hover hover:text-foreground-muted">
                  <Maximize2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="rounded p-1 text-foreground-subtle hover:bg-hover hover:text-foreground-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="overflow-auto p-3 font-mono text-[12px] leading-relaxed" style={{ height: "calc(100% - 32px)" }}>
              <div className="text-green-400">$ npm run dev</div>
              <div className="text-foreground-muted mt-1">
                <span className="text-cyan-400"> ▲ Next.js 16.0.0</span>
              </div>
              <div className="text-foreground-muted">   - Local: <span className="text-cyan-400 underline">http://localhost:3000</span></div>
              <div className="text-foreground-muted">   - Ready in 842ms</div>
              <div className="mt-2 flex items-center gap-1 text-foreground-secondary">
                <span className="text-green-400">$</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        )}

        {!terminalOpen && (
          <div className="shrink-0 border-t border-border">
            <button
              onClick={() => setTerminalOpen(true)}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] text-foreground-subtle hover:bg-hover"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Terminal</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Minimal syntax highlight using spans
function highlightLine(line: string): React.ReactNode {
  // Keywords
  const keywordRe = /\b(import|export|from|const|let|var|function|return|interface|type|extends|default|if|else|true|false|null|undefined|class|new|typeof|async|await|for|of|in)\b/g
  // Strings
  const stringRe = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g
  // Comments
  const commentRe = /(\/\/.*)/g

  if (commentRe.test(line)) {
    return <span className="text-foreground-subtle">{line}</span>
  }

  // Split and colorize
  const parts: React.ReactNode[] = []
  let last = 0
  const combined = new RegExp(`${stringRe.source}|${keywordRe.source}`, "g")
  let match

  combined.lastIndex = 0
  while ((match = combined.exec(line)) !== null) {
    if (match.index > last) {
      parts.push(<span key={last} className="text-foreground-secondary">{line.slice(last, match.index)}</span>)
    }
    const isString = /^["'`]/.test(match[0])
    parts.push(
      <span key={match.index} className={isString ? "text-green-400" : "text-cyan-400"}>
        {match[0]}
      </span>
    )
    last = match.index + match[0].length
  }
  if (last < line.length) {
    parts.push(<span key={last} className="text-foreground-secondary">{line.slice(last)}</span>)
  }

  return parts.length > 0 ? parts : <span className="text-foreground-secondary">{line}</span>
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function CenterWorkspace({ activeMode = "chat" }: CenterWorkspaceProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      {/* Mode label strip */}
      <div className="flex items-center border-b border-border px-5 py-2 shrink-0 gap-2">
        <span className="text-[11px] font-semibold text-foreground-subtle uppercase tracking-wider">
          {activeMode === "chat" && "Chat"}
          {activeMode === "image" && "Image Generation"}
          {activeMode === "voice" && "Voice Studio"}
          {activeMode === "code" && "Code Editor"}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Dynamic canvas */}
      <div className="flex flex-1 overflow-hidden">
        {activeMode === "chat" && <ChatCanvas />}
        {activeMode === "image" && <ImageCanvas />}
        {activeMode === "voice" && <VoiceCanvas />}
        {activeMode === "code" && <CodeCanvas />}
      </div>
    </div>
  )
}
