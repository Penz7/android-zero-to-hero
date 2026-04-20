"use client";

import { useState, useCallback } from "react";
import CodeEditor from "./CodeEditor";

interface PlaygroundProps {
  title: string;
  snippets: { label: string; code: string }[];
}

interface RunResult {
  output: string;
  error: string;
  executionTime: number;
}

export default function Playground({ title, snippets }: PlaygroundProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [code, setCode] = useState(snippets[0]?.code ?? "");
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleTabChange = useCallback(
    (index: number) => {
      setActiveTab(index);
      setCode(snippets[index].code);
      setResult(null);
    },
    [snippets]
  );

  const handleReset = useCallback(() => {
    setCode(snippets[activeTab].code);
    setResult(null);
  }, [snippets, activeTab]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setResult(null);
    const startTime = performance.now();

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "kotlin",
          version: "1.9.24",
          files: [{ content: code }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const elapsed = Math.round(performance.now() - startTime);

      setResult({
        output: data.run?.stdout || "",
        error: data.run?.stderr || "",
        executionTime: elapsed,
      });
    } catch (err) {
      setResult({
        output: "",
        error: `Không thể chạy code: ${err instanceof Error ? err.message : "Lỗi không xác định"}\nĐảm bảo bạn có kết nối internet.`,
        executionTime: Math.round(performance.now() - startTime),
      });
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  return (
    <div className="my-8 rounded-xl border border-[#3b4050] bg-[#1a1b26] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e2e] border-b border-[#3b4050]">
        <div className="flex items-center gap-2">
          <span className="text-lg">💻</span>
          <span className="font-semibold text-sm text-[#cdd6f4]">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs rounded-md bg-[#313244] text-[#a6adc8] hover:bg-[#45475a] transition-colors"
            title="Reset code về ban đầu"
          >
            ↺ Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-1.5 text-xs font-semibold rounded-md bg-[#a6e3a1] text-[#1e1e2e] hover:bg-[#94e2d5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
          >
            {isRunning ? (
              <>
                <span className="animate-spin">⏳</span> Đang chạy...
              </>
            ) : (
              <>▶ Chạy</>
            )}
          </button>
        </div>
      </div>

      {/* Snippet Tabs */}
      {snippets.length > 1 && (
        <div className="flex border-b border-[#3b4050] bg-[#181825]">
          {snippets.map((snippet, i) => (
            <button
              key={i}
              onClick={() => handleTabChange(i)}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                i === activeTab
                  ? "text-[#cdd6f4] border-b-2 border-[#89b4fa] bg-[#1e1e2e]"
                  : "text-[#6c7086] hover:text-[#a6adc8] hover:bg-[#1e1e2e]"
              }`}
            >
              {snippet.label}
            </button>
          ))}
        </div>
      )}

      {/* Editor */}
      <CodeEditor code={code} onChange={setCode} height="260px" />

      {/* Output Panel */}
      <div className="border-t border-[#3b4050]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#181825]">
          <span className="text-xs font-medium text-[#6c7086]">
            📤 Kết quả
          </span>
          {result && (
            <span className="text-xs text-[#585b70]">
              ⏱ {result.executionTime}ms
            </span>
          )}
        </div>
        <div className="px-4 py-3 min-h-[80px] bg-[#11111b] font-mono text-sm">
          {!result && !isRunning && (
            <span className="text-[#585b70] italic">
              Nhấn &quot;▶ Chạy&quot; để thực thi code...
            </span>
          )}
          {isRunning && (
            <span className="text-[#89dceb]">
              ⏳ Đang biên dịch và chạy Kotlin...
            </span>
          )}
          {result && (
            <>
              {result.output && (
                <pre className="text-[#a6e3a1] whitespace-pre-wrap break-words">
                  {result.output}
                </pre>
              )}
              {result.error && (
                <pre className="text-[#f38ba8] whitespace-pre-wrap break-words">
                  {result.error}
                </pre>
              )}
              {result.output === "" && result.error === "" && (
                <span className="text-[#585b70] italic">
                  Chương trình chạy thành công (không có output)
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
