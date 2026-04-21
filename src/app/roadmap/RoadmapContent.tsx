"use client";

import { useWeeks, useAllLessons } from "@/lib/use-content";
import { LessonCard } from "@/components/content/LessonCard";
import { LessonSkeleton } from "@/components/content/ContentSkeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RoadmapContent() {
  const { weeks, loading: weeksLoading } = useWeeks();
  const { lessons, loading: lessonsLoading } = useAllLessons();
  const loading = weeksLoading || lessonsLoading;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse space-y-4">
        <div className="h-10 w-64 bg-muted rounded" />
        <div className="h-6 w-96 bg-muted rounded" />
        <div className="h-20 w-full bg-muted rounded-lg mt-8" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="mt-8 space-y-3">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-28 bg-muted rounded-lg" />
              <div className="h-28 bg-muted rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">
        🗺️ Lộ trình 30 ngày
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Từ Kotlin fundamentals đến Engineering level. Học theo tuần, mỗi tuần
        7 bài học.
      </p>

      {/* Progress bar */}
      <div className="mt-8 rounded-lg border p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Tiến độ</span>
          <span className="text-muted-foreground">{lessons.length} bài học</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-full rounded-full bg-green-500/20 flex">
            {weeks.map((w) => (
              <div
                key={w.number}
                className="h-full border-r border-background last:border-0"
                style={{ width: `${100 / weeks.length}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {weeks.map((w) => (
            <span key={w.number}>Tuần {w.number}</span>
          ))}
        </div>
      </div>

      {/* Weeks */}
      <div className="mt-12 space-y-12">
        {weeks.map((week) => {
          const weekLessons = lessons.filter((l) => l.week === week.number);
          return (
            <section key={week.number}>
              <Link
                href={`/roadmap/week-${week.number}`}
                className="group flex items-center gap-3 mb-6"
              >
                <span className="text-3xl">{week.difficulty}</span>
                <div>
                  <h2 className="text-2xl font-bold group-hover:text-green-600 transition-colors">
                    Tuần {week.number}: {week.title}
                  </h2>
                  <p className="text-muted-foreground">{week.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-green-600 ml-auto" />
              </Link>

              <div className="grid gap-3 sm:grid-cols-2">
                {weekLessons.map((lesson) => (
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
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
