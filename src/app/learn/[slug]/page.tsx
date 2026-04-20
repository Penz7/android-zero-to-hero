import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ALL_LESSONS, WEEKS } from "@/lib/constants";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = ALL_LESSONS.find((l) => l.slug === slug);
  if (!lesson) return { title: "Not Found" };
  return {
    title: `${lesson.title} — Day ${lesson.day}/30`,
    description: lesson.description,
    keywords: ["android", "kotlin", ...lesson.tags],
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lessonIndex = ALL_LESSONS.findIndex((l) => l.slug === slug);
  if (lessonIndex === -1) notFound();

  const lesson = ALL_LESSONS[lessonIndex];
  const prevLesson = lessonIndex > 0 ? ALL_LESSONS[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < ALL_LESSONS.length - 1 ? ALL_LESSONS[lessonIndex + 1] : null;
  const week = WEEKS.find((w) => w.number === lesson.week);

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb
        items={[
          { label: "Lộ trình", href: "/roadmap" },
          {
            label: `Tuần ${lesson.week}: ${week?.title}`,
            href: `/roadmap/week-${lesson.week}`,
          },
          { label: lesson.title },
        ]}
      />

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">
              Day {lesson.day}/30
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              {lesson.difficulty}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {lesson.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {lesson.duration}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Tuần {lesson.week}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content placeholder */}
        <div className="rounded-lg border bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">
            📝 Nội dung bài học sẽ được viết bằng MDX.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Bài học Day {lesson.day}: {lesson.title}
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-12 flex items-center justify-between border-t pt-8">
          {prevLesson ? (
            <Link
              href={`/learn/${prevLesson.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-xs">Bài trước</div>
                <div className="font-medium">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/learn/${nextLesson.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
            >
              <div>
                <div className="text-xs">Bài tiếp theo</div>
                <div className="font-medium">{nextLesson.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
