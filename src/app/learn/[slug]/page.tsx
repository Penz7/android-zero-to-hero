import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ALL_LESSONS, WEEKS } from "@/lib/constants";
import { LessonContent } from "./LessonContent";
import { LessonQuiz } from "@/components/content/LessonQuiz";
import { CodePlayground, MultiPlayground } from "@/components/content/CodePlayground";
import { getQuizBySlug } from "@/data/quizzes";
import { getPlaygroundBySlug, getPlaygroundGroupBySlug } from "@/data/playgrounds";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, Code2 } from "lucide-react";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = ALL_LESSONS.find((l) => l.slug === slug);
  if (!lesson) return { title: "Not Found" };
  return {
    title: `${lesson.title} — Day ${lesson.day}/30`,
    description: lesson.description,
    keywords: ["android", "kotlin", ...lesson.tags],
    openGraph: {
      title: `${lesson.title} — Day ${lesson.day}/30`,
      description: lesson.description,
      images: ["/images/og/lesson.svg"],
    },
  };
}

function getLessonContent(slug: string): string | null {
  const files = fs.readdirSync(
    path.join(process.cwd(), "src/content/lessons")
  );
  const file = files.find((f) => f.includes(slug) && f.endsWith(".mdx"));
  if (!file) return null;
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/lessons", file),
    "utf-8"
  );
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
  const content = getLessonContent(slug);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            {lesson.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
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

        {/* MDX Content */}
        {content ? (
          <LessonContent content={content} />
        ) : (
          <div className="rounded-lg border bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground">
              📝 Nội dung bài học đang được cập nhật...
            </p>
          </div>
        )}

        {/* Playground — inline editor with Piston API execution */}
        {getPlaygroundGroupBySlug(slug) ? (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-green-600" />
              💻 Thử code ngay
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Sửa code trực tiếp trong editor và nhấn <strong>&quot;▶ Chạy&quot;</strong> để xem kết quả ngay — không cần mở trang khác.
            </p>
            <MultiPlayground
              title={getPlaygroundGroupBySlug(slug)!.label}
              snippets={getPlaygroundGroupBySlug(slug)!.snippets}
            />
          </div>
        ) : getPlaygroundBySlug(slug).length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-green-600" />
              💻 Thử code ngay
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Sửa code và nhấn <strong>&quot;▶ Chạy&quot;</strong> để thực thi ngay trong trang này.
            </p>
            {getPlaygroundBySlug(slug).map((snippet) => (
              <CodePlayground
                key={snippet.title}
                code={snippet.code}
                language="kotlin"
              />
            ))}
          </div>
        ) : null}

        {/* Quiz */}
        {getQuizBySlug(slug) && (
          <LessonQuiz
            slug={slug}
            questions={getQuizBySlug(slug)!.questions}
          />
        )}

        {/* Navigation */}
        <nav className="mt-12 flex items-center justify-between border-t pt-8 gap-4">
          {prevLesson ? (
            <Link
              href={`/learn/${prevLesson.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-w-0"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform shrink-0" />
              <div className="min-w-0">
                <div className="text-xs">Bài trước</div>
                <div className="font-medium truncate">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/learn/${nextLesson.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right min-w-0"
            >
              <div className="min-w-0">
                <div className="text-xs">Bài tiếp theo</div>
                <div className="font-medium truncate">{nextLesson.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
