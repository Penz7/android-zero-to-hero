"use client";

import { useState, useMemo } from "react";
import { ALL_LESSONS } from "@/lib/constants";
import { LessonCard } from "@/components/content/LessonCard";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return ALL_LESSONS.slice(0, 6);
    const q = query.toLowerCase();
    return ALL_LESSONS.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">🔍 Tìm kiếm</h1>
        <p className="mt-3 text-muted-foreground">
          Tìm bài học, dự án, tài liệu theo từ khóa.
        </p>

        {/* Search input */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm: kotlin, compose, mvvm..."
            className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="mt-8 space-y-3">
          <p className="text-sm text-muted-foreground">
            {query.trim()
              ? `Tìm thấy ${results.length} kết quả`
              : `Hiển thị ${results.length} bài học gần nhất`}
          </p>
          {results.map((lesson) => (
            <LessonCard
              key={lesson.slug}
              slug={lesson.slug}
              title={lesson.title}
              day={lesson.day}
              week={lesson.week}
              difficulty={lesson.difficulty}
              duration={lesson.duration}
              description={lesson.description}
            />
          ))}
          {query.trim() && results.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Không tìm thấy kết quả cho &quot;{query}&quot;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
