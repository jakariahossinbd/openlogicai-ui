"use client"

import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  Terminal,
  Maximize2,
  X,
  Play,
  RotateCcw,
  Split,
  MoreHorizontal,
  Search,
  GitBranch,
  Circle,
} from "lucide-react"

// ─── File Tree Data ──────────────────────────────────────────────────────────
const FILES = [
  { name: "src", type: "folder", children: [
    { name: "app", type: "folder", children: [
      { name: "page.tsx", type: "file" },
      { name: "layout.tsx", type: "file" },
      { name: "globals.css", type: "file" },
    ]},
    { name: "components", type: "folder", children: [
      { name: "Button.tsx", type: "file" },
      { name: "Card.tsx", type: "file" },
      { name: "Input.tsx", type: "file" },
    ]},
    { name: "lib", type: "folder", children: [
      { name: "utils.ts", type: "file" },
    ]},
  ]},
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
  { name: "tailwind.config.ts", type: "file" },
]

type FileNode = { name: string; type: "file" | "folder"; children?: FileNode[] }

function FileTree({ nodes, depth = 0 }: { nodes: FileNode[]; depth?: number }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ src: true, app: true, components: true })

  const getFileIcon = (name: string) => {
    if (name.endsWith(".tsx")) return "text-cyan-400"
    if (name.endsWith(".ts")) return "text-blue-400"
    if (name.endsWith(".css")) return "text-pink-400"
    if (name.endsWith(".json")) return "text-yellow-400"
    return "text-foreground-subtle"
  }

  return (
    <div>
      {nodes.map((node) => (
        <div key={node.name}>
          <button
            onClick={() => node.type === "folder" && setOpen((o) => ({ ...o, [node.name]: !o[node.name] }))}
            className="flex w-full items-center gap-1.5 rounded-md px-2 py-[5px] text-[12px] text-foreground-secondary transition-colors hover:bg-hover group"
            style={{ paddingLeft: `${10 + depth * 12}px` }}
          >
            {node.type === "folder" ? (
              <>
                {open[node.name] ? (
                  <ChevronDown className="h-3 w-3 text-foreground-subtle shrink-0" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-foreground-subtle shrink-0" />
                )}
                {open[node.name] ? (
                  <FolderOpen className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                ) : (
                  <Folder className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                )}
              </>
            ) : (
              <>
                <span className="w-3 shrink-0" />
                <File className={`h-3.5 w-3.5 shrink-0 ${getFileIcon(node.name)}`} />
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

// ─── Sample Code ─────────────────────────────────────────────────────────────
const SAMPLE_CODE = `import { useState } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  onClick,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false)

  const handleClick = () => {
    if (loading) return
    setPressed(true)
    onClick?.()
    setTimeout(() => setPressed(false), 150)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "primary",
          "border border-border bg-card text-foreground hover:bg-hover": variant === "secondary",
          "text-foreground-secondary hover:bg-hover": variant === "ghost",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
          "scale-95": pressed,
          "opacity-60 cursor-not-allowed": loading,
        }
      )}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}`

// ─── Syntax Highlighting ─────────────────────────────────────────────────────
function highlightLine(line: string): React.ReactNode {
  const keywordRe = /\b(import|export|from|const|let|var|function|return|interface|type|extends|default|if|else|true|false|null|undefined|class|new|typeof|async|await|for|of|in)\b/g
  const stringRe = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g
  const commentRe = /(\/\/.*)/g
  const typeRe = /\b(React|ReactNode|string|number|boolean|void)\b/g

  if (commentRe.test(line)) {
    return <span className="text-foreground-subtle">{line}</span>
  }

  const parts: React.ReactNode[] = []
  let last = 0
  const combined = new RegExp(`${stringRe.source}|${keywordRe.source}|${typeRe.source}`, "g")
  let match

  combined.lastIndex = 0
  while ((match = combined.exec(line)) !== null) {
    if (match.index > last) {
      parts.push(<span key={last} className="text-foreground-secondary">{line.slice(last, match.index)}</span>)
    }
    const isString = /^["'`]/.test(match[0])
    const isKeyword = /^(import|export|from|const|let|var|function|return|interface|type|extends|default|if|else|true|false|null|undefined|class|new|typeof|async|await|for|of|in)$/.test(match[0])
    parts.push(
      <span 
        key={match.index} 
        className={isString ? "text-green-400" : isKeyword ? "text-purple-400" : "text-cyan-400"}
      >
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

// ─── Main IDE Canvas ─────────────────────────────────────────────────────────
export function IdeCanvas() {
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [activeFile] = useState("Button.tsx")

  const lines = SAMPLE_CODE.split("\n")

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border/50 bg-card/30 backdrop-blur-xl px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[12px] text-foreground-muted">
            <GitBranch className="h-3.5 w-3.5" />
            <span>main</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-[12px] text-foreground-subtle">
            <Circle className="h-2 w-2 fill-green-400 text-green-400" />
            <span>Ready</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] text-foreground-muted transition-colors hover:bg-hover">
            <Play className="h-3 w-3" />
            <span>Run</span>
          </button>
          <button className="rounded-md p-1.5 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
            <Search className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-md p-1.5 text-foreground-subtle transition-colors hover:bg-hover hover:text-foreground-muted">
            <Split className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <div className="flex w-52 shrink-0 flex-col border-r border-border/50 bg-card/20 backdrop-blur-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
            <span className="text-[10px] font-semibold text-foreground-subtle uppercase tracking-wider">Explorer</span>
            <button className="rounded p-0.5 text-foreground-subtle hover:bg-hover hover:text-foreground-muted">
              <MoreHorizontal className="h-3 w-3" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            <FileTree nodes={FILES} />
          </div>
        </div>

        {/* Editor + Terminal */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center border-b border-border/50 bg-card/20 backdrop-blur-sm shrink-0">
            <div className="flex items-center border-r border-border/50 bg-background/50">
              <button className="flex items-center gap-2 px-4 py-2 text-[12px] text-foreground-secondary">
                <File className="h-3 w-3 text-cyan-400" />
                <span>{activeFile}</span>
                <span className="ml-1 h-1.5 w-1.5 rounded-full bg-amber-400" title="Modified" />
              </button>
            </div>
          </div>

          {/* Code editor */}
          <div className="flex flex-1 overflow-auto bg-background/50 backdrop-blur-sm font-mono text-[13px] leading-relaxed min-h-0">
            {/* Line numbers */}
            <div className="shrink-0 select-none border-r border-border/30 bg-card/10 px-4 py-4 text-right text-[12px] text-foreground-subtle">
              {lines.map((_, i) => (
                <div key={i} className="leading-[1.7rem]">{i + 1}</div>
              ))}
            </div>
            {/* Code */}
            <pre className="flex-1 overflow-auto px-4 py-4 text-foreground-secondary">
              <code>
                {lines.map((line, i) => (
                  <div key={i} className="leading-[1.7rem] hover:bg-hover/50 px-1 -mx-1 rounded">
                    {highlightLine(line)}
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Terminal panel */}
          {terminalOpen && (
            <div className="shrink-0 border-t border-border/50 bg-card/20 backdrop-blur-sm" style={{ height: "180px" }}>
              <div className="flex items-center justify-between border-b border-border/50 px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-foreground-subtle" />
                  <span className="text-[11px] font-medium text-foreground-secondary">Terminal</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="rounded p-1 text-foreground-subtle hover:bg-hover hover:text-foreground-muted">
                    <RotateCcw className="h-3 w-3" />
                  </button>
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
              <div className="overflow-auto p-4 font-mono text-[12px] leading-relaxed" style={{ height: "calc(100% - 36px)" }}>
                <div className="text-green-400">$ npm run dev</div>
                <div className="text-foreground-muted mt-1.5">
                  <span className="text-cyan-400 font-medium"> Next.js 16.0.0</span>
                </div>
                <div className="text-foreground-muted">   - Local: <span className="text-cyan-400 underline">http://localhost:3000</span></div>
                <div className="text-foreground-muted">   - Network: <span className="text-cyan-400">http://192.168.1.5:3000</span></div>
                <div className="text-foreground-muted mt-1"> Ready in <span className="text-green-400">842ms</span></div>
                <div className="mt-3 flex items-center gap-1 text-foreground-secondary">
                  <span className="text-green-400">$</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          )}

          {!terminalOpen && (
            <div className="shrink-0 border-t border-border/50">
              <button
                onClick={() => setTerminalOpen(true)}
                className="flex w-full items-center gap-2 px-4 py-1.5 text-[11px] text-foreground-subtle hover:bg-hover"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Terminal</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
