import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { WEEKS, ALL_LESSONS } from "@/lib/constants";
import { LessonCard } from "@/components/content/LessonCard";
import type { Metadata } from "next";

interface WeekPageProps {
  params: Promise<{ week: string }>;
}

export async function generateStaticParams() {
  return WEEKS.map((w) => ({ week: `week-${w.number}` }));
}

export async function generateMetadata({ params }: WeekPageProps): Promise<Metadata> {
  const { week: weekParam } = await params;
  const weekNum = parseInt(weekParam.replace("week-", ""));
  const week = WEEKS.find((w) => w.number === weekNum);
  if (!week) return { title: "Not Found" };
  return {
    title: `Tuần ${week.number}: ${week.title}`,
    description: week.description,
  };
}

export default async function WeekPage({ params }: WeekPageProps) {
  const { week: weekParam } = await params;
  const weekNum = parseInt(weekParam.replace("week-", ""));
  const week = WEEKS.find((w) => w.number === weekNum);
  if (!week) notFound();

  const weekLessons = ALL_LESSONS.filter((l) => l.week === week.number);

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb
        items={[
          { label: "Lộ trình", href: "/roadmap" },
          { label: `Tuần ${week.number}: ${week.title}` },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="text-4xl">{week.difficulty}</span>
          <h1 className="text-4xl font-bold tracking-tight mt-2">
            Tuần {week.number}: {week.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {week.description}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            7 bài học • {week.theme}
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
      </div>
    </div>
  );
}
