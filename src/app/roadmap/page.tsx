import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { WEEKS, ALL_LESSONS } from "@/lib/constants";
import { LessonCard } from "@/components/content/LessonCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lộ trình 30 ngày",
  description:
    "Lộ trình học Android Development 30 ngày: Kotlin → Jetpack Compose → Architecture → Engineering Level.",
};

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: "Lộ trình" }]} />

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
            <span className="text-muted-foreground">30 bài học</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-full rounded-full bg-green-500/20 flex">
              {WEEKS.map((w) => (
                <div
                  key={w.number}
                  className="h-full border-r border-background last:border-0"
                  style={{ width: "25%" }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {WEEKS.map((w) => (
              <span key={w.number}>Tuần {w.number}</span>
            ))}
          </div>
        </div>

        {/* Weeks */}
        <div className="mt-12 space-y-12">
          {WEEKS.map((week) => {
            const weekLessons = ALL_LESSONS.filter(
              (l) => l.week === week.number
            );
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
    </div>
  );
}
