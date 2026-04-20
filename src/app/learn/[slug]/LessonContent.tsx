"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState, type ReactNode } from "react";

interface LessonContentProps {
  content: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 rounded-md bg-zinc-800 p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function CodeBlock({ className, children }: { className?: string; children?: ReactNode }) {
  const match = /language-(\w+)/.exec(className || "");

  if (match) {
    const codeText = String(children || "").replace(/\n$/, "");
    return (
      <div className="group relative my-4 rounded-lg border overflow-hidden">
        <CopyButton text={codeText} />
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: 0, borderRadius: 0, padding: "1rem",
            fontSize: "0.875rem", lineHeight: "1.6",
          }}
          codeTagProps={{
            style: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
          }}
          showLineNumbers={codeText.split("\n").length > 5}
          lineNumberStyle={{ minWidth: "2em", paddingRight: "1em", color: "#6b7280", userSelect: "none" }}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  );
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>,
          pre: ({ children }) => <div>{children}</div>,
          code: CodeBlock,
          blockquote: ({ children }) => (
            <div className="my-4 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <blockquote className="text-sm">{children}</blockquote>
            </div>
          ),
          ul: ({ children }) => <ul className="my-3 space-y-1 list-disc list-inside">{children}</ul>,
          ol: ({ children }) => <ol className="my-3 space-y-1 list-decimal list-inside">{children}</ol>,
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border-b bg-muted px-4 py-2 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="border-b px-4 py-2">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
