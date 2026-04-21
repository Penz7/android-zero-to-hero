"use client";

import { useWeeks, useAllLessons } from "@/lib/use-content";
import { LessonCard } from "@/components/content/LessonCard";
import { LessonSkeleton } from "@/components/content/ContentSkeleton";
import Link from "next/link";

export function WeekPageContent({ weekNum }: { weekNum: number }) {
  const { weeks, loading: weeksLoading } = useWeeks();
  const { lessons, loading: lessonsLoading } = useAllLessons();
  const loading = weeksLoading || lessonsLoading;

  const week = weeks.find((w) => w.number === weekNum);
  const weekLessons = lessons.filter((l) => l.week === weekNum);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse space-y-4">
        <div className="text-4xl">⭐</div>
        <div className="h-10 w-80 bg-muted rounded" />
        <div className="h-6 w-96 bg-muted rounded" />
        <div className="grid gap-3 sm:grid-cols-2 mt-8">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-28 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!week) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="text-4xl">{week.difficulty}</span>
        <h1 className="text-4xl font-bold tracking-tight mt-2">
          Tuần {week.number}: {week.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {week.description}
        </p>
      </div>

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

      <div className="mt-8 text-center">
        <Link
          href="/roadmap"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Về lộ trình tổng
        </Link>
      </div>
    </div>
  );
}
