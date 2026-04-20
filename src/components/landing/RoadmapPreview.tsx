import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WEEKS } from "@/lib/constants";

export function RoadmapPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            🗺️ Lộ trình 30 ngày
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Từ Kotlin fundamentals đến Engineering level — có cấu trúc, dễ theo dõi.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WEEKS.map((week) => (
            <Link
              key={week.number}
              href={`/roadmap/week-${week.number}`}
              className="group rounded-lg border p-5 transition-all hover:border-green-500/50 hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-green-600">
                  {week.difficulty}
                </span>
              </div>
              <h3 className="font-semibold group-hover:text-green-600 transition-colors">
                Tuần {week.number}: {week.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {week.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                7 bài học • {week.theme}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Xem chi tiết <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/roadmap"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background h-9 px-4 text-sm font-medium hover:bg-muted transition-colors"
          >
            Xem lộ trình đầy đủ <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
