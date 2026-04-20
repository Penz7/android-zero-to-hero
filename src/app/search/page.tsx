"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, Loader2, ArrowRight, BookOpen, Code2, Layers, Clock } from "lucide-react";

interface PagefindResult {
  id: string;
  url: string;
  excerpt: string;
  meta: {
    title?: string;
    description?: string;
  };
}

const SUGGESTED_SEARCHES = [
  { label: "Kotlin", icon: Code2 },
  { label: "Compose", icon: Layers },
  { label: "MVVM", icon: BookOpen },
  { label: "Room Database", icon: BookOpen },
  { label: "Retrofit", icon: Code2 },
  { label: "Navigation", icon: ArrowRight },
  { label: "Testing", icon: BookOpen },
  { label: "Coroutines", icon: Clock },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [pagefindError, setPagefindError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const basePath = "/android-zero-to-hero";
    const script = document.createElement("script");
    script.src = `${basePath}/_pagefind/pagefind.js`;
    script.type = "module";
    script.onload = async () => {
      try {
        const pf = (window as any).pagefind;
        if (pf) {
          await pf.options({ basePath: `${basePath}/_pagefind` });
          setReady(true);
        } else {
          setTimeout(() => {
            if ((window as any).pagefind) setReady(true);
            else setPagefindError(true);
          }, 2000);
        }
      } catch {
        setPagefindError(true);
      }
    };
    script.onerror = () => {
      setPagefindError(true);
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

  const getTypeLabel = (url: string) => {
    if (url.includes("/learn/")) return { label: "Bài học", color: "bg-green-100 text-green-700" };
    if (url.includes("/projects/")) return { label: "Dự án", color: "bg-blue-100 text-blue-700" };
    if (url.includes("/roadmap/")) return { label: "Lộ trình", color: "bg-purple-100 text-purple-700" };
    return { label: "Trang", color: "bg-gray-100 text-gray-700" };
  };

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

        {pagefindError && (
          <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            ⚠️ Search engine đang tải, vui lòng thử lại sau giây lát.
          </div>
        )}

        {/* Results */}
        <div className="mt-8 space-y-4">
          {query.trim() && !loading && ready && (
            <p className="text-sm text-muted-foreground">
              {results.length > 0
                ? `Tìm thấy ${results.length} kết quả cho "${query}"`
                : `Không tìm thấy kết quả cho "${query}"`}
            </p>
          )}

          {results.map((result) => {
            const type = getTypeLabel(result.url);
            return (
              <Link
                key={result.id}
                href={result.url}
                className="group block rounded-lg border p-4 hover:border-green-500/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${type.color}`}>
                        {type.label}
                      </span>
                    </div>
                    <h3 className="font-semibold group-hover:text-green-600 transition-colors">
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
            );
          })}

          {query.trim() && !loading && results.length === 0 && ready && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔎</p>
              <p className="text-muted-foreground">
                Không tìm thấy kết quả cho &quot;{query}&quot;
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Thử tìm với từ khóa khác: kotlin, compose, mvvm, room...
              </p>
            </div>
          )}

          {/* Suggested searches when no query */}
          {!query.trim() && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">💡 Gợi ý tìm kiếm</h2>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_SEARCHES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.label}
                      onClick={() => setQuery(s.label)}
                      className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm hover:border-green-500/50 hover:bg-green-50 transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      {s.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-green-600" />
                    30 bài học
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Từ Kotlin cơ bản đến Jetpack Compose, Architecture, Testing.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-green-600" />
                    4 dự án
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Habit Tracker, Notes App, Movie Browser, Clean Architecture.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
