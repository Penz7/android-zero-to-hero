"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-zinc-950 prose-pre:text-zinc-100 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children, ...props }) => (
            <h2
              className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-foreground"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-foreground"
              {...props}
            >
              {children}
            </h3>
          ),
          pre: ({ children, ...props }) => (
            <div className="my-4 rounded-lg border bg-zinc-950 overflow-hidden">
              <pre
                className="overflow-x-auto p-4 text-sm text-zinc-100"
                {...props}
              >
                {children}
              </pre>
            </div>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className={cn("text-sm", className)} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children, ...props }) => (
            <div className="my-4 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <blockquote className="text-sm" {...props}>
                {children}
              </blockquote>
            </div>
          ),
          ul: ({ children, ...props }) => (
            <ul className="my-3 space-y-1 list-disc list-inside" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="my-3 space-y-1 list-decimal list-inside" {...props}>
              {children}
            </ol>
          ),
          table: ({ children, ...props }) => (
            <div className="my-4 overflow-x-auto rounded-lg border">
              <table className="w-full text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border-b bg-muted px-4 py-2 text-left font-semibold"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border-b px-4 py-2" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
