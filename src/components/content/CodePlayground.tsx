"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// CodeMirror imports
import { EditorView, keymap, lineNumbers, highlightActiveLine } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle, indentOnInput } from "@codemirror/language";
import { StreamLanguage } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// ─── Kotlin Syntax Theme ────────────────────────────────────────
const kotlinHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#c678dd" },
  { tag: tags.operatorKeyword, color: "#c678dd" },
  { tag: tags.definitionKeyword, color: "#c678dd" },
  { tag: tags.string, color: "#98c379" },
  { tag: tags.comment, color: "#5c6370", fontStyle: "italic" },
  { tag: tags.number, color: "#d19a66" },
  { tag: tags.bool, color: "#d19a66" },
  { tag: tags.null, color: "#d19a66" },
  { tag: tags.function(tags.variableName), color: "#61afef" },
  { tag: tags.typeName, color: "#e5c07b" },
  { tag: tags.className, color: "#e5c07b" },
  { tag: tags.propertyName, color: "#e06c75" },
  { tag: tags.operator, color: "#56b6c2" },
  { tag: tags.punctuation, color: "#abb2bf" },
  { tag: tags.variableName, color: "#e06c75" },
  { tag: tags.meta, color: "#e5c07b" },
]);

// ─── Kotlin Language Definition ─────────────────────────────────
const kotlinLang = StreamLanguage.define({
  name: "kotlin",
  startState() {
    return { inString: false, stringChar: "", inBlockComment: false };
  },
  token(stream, state) {
    // Block comment
    if (state.inBlockComment) {
      if (stream.match(/\*\//)) {
        state.inBlockComment = false;
      } else {
        stream.next();
      }
      return "comment";
    }
    // Line comment
    if (stream.match(/\/\//)) {
      stream.skipToEnd();
      return "comment";
    }
    // Start block comment
    if (stream.match(/\/\*/)) {
      state.inBlockComment = true;
      return "comment";
    }
    // Triple-quoted string
    if (stream.match(/"""/)) {
      const idx = stream.string.indexOf('"""', stream.pos);
      if (idx !== -1) stream.pos = idx + 3;
      else stream.skipToEnd();
      return "string";
    }
    // Regular string
    if (!state.inString && (stream.peek() === '"' || stream.peek() === "'")) {
      state.inString = true;
      state.stringChar = stream.peek() as string;
      stream.next();
      return "string";
    }
    if (state.inString) {
      if (stream.peek() === state.stringChar) {
        stream.next();
        state.inString = false;
        return "string";
      }
      if (stream.peek() === "\\") { stream.next(); stream.next(); return "string"; }
      stream.next();
      return "string";
    }
    if (stream.eatSpace()) return null;
    // Numbers
    if (stream.match(/^-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?[fFLl]?/)) return "number";
    // Annotations
    if (stream.match(/@[a-zA-Z_][a-zA-Z0-9_]*/)) return "meta";
    // Keywords
    if (stream.match(/\b(fun|val|var|class|object|interface|enum|sealed|data|when|if|else|for|while|do|return|break|continue|try|catch|finally|throw|import|package|as|is|in|by|constructor|init|companion|override|open|abstract|private|public|protected|internal|suspend|inline|reified|out|super|this|null|true|false|it|lazy|lateinit|get|set|where|typealias|annotation|crossinline|noinline|vararg|tailrec|operator|infix|external|actual|expect|value|inner)\b/)) return "keyword";
    // Types
    if (stream.match(/\b[A-Z][a-zA-Z0-9_]*\b/)) return "typeName";
    // Function calls
    if (stream.match(/[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/)) return "function";
    // Identifiers
    if (stream.match(/[a-zA-Z_][a-zA-Z0-9_]*/)) return "variableName";
    // Operators
    if (stream.match(/[+\-*/%=<>!&|^~?]+/)) return "operator";
    // Punctuation
    if (stream.match(/[{}()\[\];,.]/)) return "punctuation";
    stream.next();
    return null;
  },
});

// ─── Inline Editor Component ────────────────────────────────────
function CodeMirrorEditor({
  code,
  onChange,
  height,
}: {
  code: string;
  onChange: (v: string) => void;
  height: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;
    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) onChangeRef.current(update.state.doc.toString());
    });
    const theme = EditorView.theme({
      "&": { height, fontSize: "14px", backgroundColor: "#1e1e2e" },
      ".cm-scroller": { fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace", overflow: "auto" },
      ".cm-content": { caretColor: "#528bff", padding: "8px 0" },
      ".cm-gutters": { backgroundColor: "#1e1e2e", color: "#546178", border: "none" },
      ".cm-activeLineGutter": { backgroundColor: "#2c313c" },
      ".cm-activeLine": { backgroundColor: "#2c313c44" },
      "&.cm-focused .cm-cursor": { borderLeftColor: "#528bff" },
      "&.cm-focused .cm-selectionBackground,.cm-selectionBackground": { backgroundColor: "#3e4451" },
    });
    const state = EditorState.create({
      doc: code,
      extensions: [
        lineNumbers(), highlightActiveLine(), history(),
        indentOnInput(), kotlinLang, syntaxHighlighting(kotlinHighlight),
        theme, updateListener,
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.lineWrapping,
      ],
    });
    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;
    return () => { view.destroy(); viewRef.current = null; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync external code changes (tab switch)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const cur = view.state.doc.toString();
    if (cur !== code) {
      view.dispatch({ changes: { from: 0, to: cur.length, insert: code } });
    }
  }, [code]);

  return <div ref={containerRef} className="border-x border-[#3b4050]" />;
}

// ─── Main Playground Component ──────────────────────────────────
interface SnippetData {
  label: string;
  code: string;
}

interface RunResult {
  output: string;
  error: string;
  ms: number;
}

export function CodePlayground({
  code,
  language = "kotlin",
}: {
  code: string;
  language?: string;
}) {
  // Single snippet mode (backward compatible)
  return <PlaygroundInner snippets={[{ label: "Code", code }]} />;
}

export function MultiPlayground({
  title,
  snippets,
}: {
  title?: string;
  snippets: SnippetData[];
}) {
  return <PlaygroundInner title={title} snippets={snippets} />;
}

function PlaygroundInner({
  title = "💻 Thử code ngay",
  snippets,
}: {
  title?: string;
  snippets: SnippetData[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [code, setCode] = useState(snippets[0]?.code ?? "");
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTab = useCallback(
    (i: number) => {
      setActiveIdx(i);
      setCode(snippets[i].code);
      setResult(null);
    },
    [snippets]
  );

  const handleReset = useCallback(() => {
    setCode(snippets[activeIdx].code);
    setResult(null);
  }, [snippets, activeIdx]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setResult(null);
    const t0 = performance.now();
    try {
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "kotlin",
          version: "1.9.24",
          files: [{ content: code }],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult({
        output: data.run?.stdout || "",
        error: data.run?.stderr || "",
        ms: Math.round(performance.now() - t0),
      });
    } catch (err) {
      setResult({
        output: "",
        error: `Không thể chạy code: ${err instanceof Error ? err.message : "Lỗi"}\nKiểm tra kết nối internet.`,
        ms: Math.round(performance.now() - t0),
      });
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  return (
    <div className="my-8 rounded-xl border border-[#3b4050] bg-[#1a1b26] overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e2e] border-b border-[#3b4050]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-[#6c7086] ml-2 font-mono">main.kt</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[#a6adc8] hover:text-white hover:bg-[#313244] transition-colors"
          >
            {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[#a6adc8] hover:text-white hover:bg-[#313244] transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
            {isRunning ? "Đang chạy..." : "▶ Chạy"}
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      {snippets.length > 1 && (
        <div className="flex border-b border-[#3b4050] bg-[#181825] overflow-x-auto">
          {snippets.map((s, i) => (
            <button
              key={i}
              onClick={() => handleTab(i)}
              className={cn(
                "px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors",
                i === activeIdx
                  ? "text-[#cdd6f4] border-b-2 border-[#89b4fa] bg-[#1e1e2e]"
                  : "text-[#6c7086] hover:text-[#a6adc8] hover:bg-[#1e1e2e]"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Editor ── */}
      <CodeMirrorEditor code={code} onChange={setCode} height="260px" />

      {/* ── Output ── */}
      <div className="border-t border-[#3b4050]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#181825]">
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#6c7086]">
            <Terminal className="h-3 w-3" /> Output
          </span>
          {result && <span className="text-xs text-[#585b70]">⏱ {result.ms}ms</span>}
        </div>
        <div className="px-4 py-3 min-h-[80px] bg-[#11111b] font-mono text-sm leading-relaxed">
          {!result && !isRunning && (
            <span className="text-[#585b70] italic">Nhấn &quot;▶ Chạy&quot; để thực thi code ngay...</span>
          )}
          {isRunning && (
            <span className="text-[#89dceb] flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Đang biên dịch Kotlin...
            </span>
          )}
          {result && result.output && (
            <pre className="text-[#a6e3a1] whitespace-pre-wrap break-words m-0">{result.output}</pre>
          )}
          {result && result.error && (
            <pre className="text-[#f38ba8] whitespace-pre-wrap break-words m-0">{result.error}</pre>
          )}
          {result && !result.output && !result.error && (
            <span className="text-[#585b70] italic">✅ Chạy thành công (không có output)</span>
          )}
        </div>
      </div>
    </div>
  );
}
