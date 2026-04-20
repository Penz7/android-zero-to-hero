"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, Loader2, ArrowRight } from "lucide-react";

interface PagefindResult {
  id: string;
  url: string;
  excerpt: string;
  meta: {
    title?: string;
    description?: string;
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    // Load pagefind via script tag
    const script = document.createElement("script");
    script.src = "/_pagefind/pagefind.js";
    script.type = "module";
    script.onload = async () => {
      try {
        // Pagefind exposes itself on window after script load
        const pf = (window as any).pagefind;
        if (pf) {
          setReady(true);
        } else {
          // Try to access via module
          setTimeout(() => {
            if ((window as any).pagefind) setReady(true);
          }, 1000);
        }
      } catch {
        // Dev mode
      }
    };
    script.onerror = () => {
      // Dev mode — pagefind not available
    };
    document.head.appendChild(script);
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (!ready || !q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore — pagefind loaded via script tag at runtime
      const pf = (window as any).pagefind;
      const res = await pf.search(q);
      const data = await Promise.all(
        res.results.slice(0, 10).map((r: any) => r.data())
      );
      setResults(data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, [ready]);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          🔍 Tìm kiếm
        </h1>
        <p className="mt-3 text-muted-foreground">
          Tìm bài học, dự án, tài liệu theo từ khóa.
        </p>

        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm: kotlin, compose, mvvm..."
            className="w-full rounded-lg border bg-background py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
          )}
        </div>

        <div className="mt-8 space-y-4">
          {query.trim() && !loading && ready && (
            <p className="text-sm text-muted-foreground">
              {results.length > 0
                ? `Tìm thấy ${results.length} kết quả`
                : "Không tìm thấy kết quả"}
            </p>
          )}

          {results.map((result) => (
            <Link
              key={result.id}
              href={result.url}
              className="group block rounded-lg border p-4 hover:border-green-500/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold group-hover:text-green-600 transition-colors truncate">
                    {result.meta?.title || result.url}
                  </h3>
                  {result.meta?.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {result.meta.description}
                    </p>
                  )}
                  <p
                    className="mt-2 text-sm text-muted-foreground line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-green-600 shrink-0 mt-1" />
              </div>
            </Link>
          ))}

          {query.trim() && !loading && results.length === 0 && ready && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔎</p>
              <p className="text-muted-foreground">
                Không tìm thấy kết quả cho &quot;{query}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
