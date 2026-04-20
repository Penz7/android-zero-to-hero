"use client";

import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, Maximize2, Minimize2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePlaygroundProps {
  code: string;
  language?: string;
  height?: number;
  readOnly?: boolean;
}

export function CodePlayground({
  code,
  language = "kotlin",
  height = 250,
  readOnly = false,
}: CodePlaygroundProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const encodedCode = encodeURIComponent(code);
  const playgroundUrl = `https://play.kotlinlang.org/embed?code=${encodedCode}&theme=darcula`;

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-400 ml-2 font-mono">
            main.{language === "kotlin" ? "kt" : language}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={copyCode}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-400" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
          <a
            href={`https://play.kotlinlang.org/#${encodedCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <Play className="h-3 w-3" />
            Run
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            {expanded ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>

      {/* Code display with syntax highlighting */}
      <pre
        className={cn(
          "bg-zinc-950 p-4 overflow-x-auto text-sm text-zinc-100 font-mono leading-relaxed",
          expanded ? "max-h-none" : "max-h-[400px]"
        )}
      >
        <code>{code}</code>
      </pre>

      {/* Run button */}
      <div className="border-t bg-zinc-900/50 p-3 flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          Click &quot;Run&quot; để mở trong Kotlin Playground
        </span>
        <a
          href={`https://play.kotlinlang.org/#${encodedCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors"
        >
          <Play className="h-3 w-3" />
          Chạy code
        </a>
      </div>
    </div>
  );
}
