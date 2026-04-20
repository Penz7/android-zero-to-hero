"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonProgressProps {
  lessons: { slug: string; title: string; day: number; week: number }[];
}

export function LessonProgress({ lessons }: LessonProgressProps) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadCompleted = () => {
      const done = new Set<string>();
      lessons.forEach((lesson) => {
        const saved = localStorage.getItem(`quiz_${lesson.slug}`);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            if (data.submitted && data.score >= Math.ceil((data.answers?.length || 3) * 0.7)) {
              done.add(lesson.slug);
            }
          } catch {}
        }
      });
      setCompleted(done);
    };

    loadCompleted();

    // Listen for quiz completion events
    const handler = () => loadCompleted();
    window.addEventListener("quiz-completed", handler);
    return () => window.removeEventListener("quiz-completed", handler);
  }, [lessons]);

  const weeks = [1, 2, 3, 4];
  const totalCompleted = completed.size;
  const totalLessons = lessons.length;
  const percent = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div className="rounded-lg border bg-muted/30 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-green-600" />
            <span className="font-semibold">Tiến độ học tập</span>
          </div>
          <span className="text-sm font-medium text-green-600">
            {totalCompleted}/{totalLessons} bài ({percent}%)
          </span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        {percent === 100 && (
          <p className="mt-3 text-sm text-green-700 font-medium">
            🎉 Chúc mừng! Bạn đã hoàn thành tất cả bài học!
          </p>
        )}
      </div>

      {/* Per-week progress */}
      {weeks.map((weekNum) => {
        const weekLessons = lessons.filter((l) => l.week === weekNum);
        const weekCompleted = weekLessons.filter((l) => completed.has(l.slug)).length;
        const weekPercent = Math.round((weekCompleted / weekLessons.length) * 100);

        return (
          <div key={weekNum}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Tuần {weekNum}</h3>
              <span className="text-sm text-muted-foreground">
                {weekCompleted}/{weekLessons.length} bài
              </span>
            </div>

            <div className="space-y-1.5">
              {weekLessons.map((lesson) => {
                const isDone = completed.has(lesson.slug);
                return (
                  <Link
                    key={lesson.slug}
                    href={`/learn/${lesson.slug}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 text-sm transition-all hover:border-green-500/50",
                      isDone ? "bg-green-50/50 border-green-200" : ""
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className={cn(isDone && "text-muted-foreground")}>
                        Day {lesson.day}: {lesson.title}
                      </span>
                    </div>
                    {isDone ? (
                      <span className="text-xs text-green-600 font-medium shrink-0">✅ Quiz passed</span>
                    ) : (
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Week progress bar */}
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-green-400 transition-all duration-500"
                style={{ width: `${weekPercent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
