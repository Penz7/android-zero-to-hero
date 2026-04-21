"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LessonContent } from "./LessonContent";
import { LessonQuiz } from "@/components/content/LessonQuiz";
import { CodePlayground, MultiPlayground } from "@/components/content/CodePlayground";
import { LessonSkeleton, QuizSkeleton, PlaygroundSkeleton } from "@/components/content/ContentSkeleton";
import { useLesson, useLessonNavigation } from "@/lib/use-content";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, Code2, AlertCircle } from "lucide-react";

interface LessonPageContentProps {
  slug: string;
  staticContent?: string | null;
}

export function LessonPageContent({ slug, staticContent }: LessonPageContentProps) {
  const { lesson, quiz, playgrounds, loading, error } = useLesson(slug);
  const { prevLesson, nextLesson } = useLessonNavigation(slug);

  if (loading) {
    return <LessonSkeleton />;
  }

  if (error || !lesson) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto text-center py-16">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Không tìm thấy bài học</h1>
          <p className="text-muted-foreground mb-6">{error || "Bài học này không tồn tại."}</p>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            ← Về lộ trình
          </Link>
        </div>
      </div>
    );
  }

  // Use Supabase content if available, otherwise fall back to static MDX
  const content = lesson.content || staticContent;

  // Convert quiz questions to LessonQuiz format
  const quizQuestions = quiz?.questions.map((q) => ({
    question: q.question,
    options: q.options,
    correctIndex: q.correct_index,
    explanation: q.explanation,
  }));

  // Group playground snippets
  const hasPlaygrounds = playgrounds.length > 0;
  const isMultiPlayground = playgrounds.length > 1;

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <Breadcrumb
        items={[
          { label: "Lộ trình", href: "/roadmap" },
          { label: `Tuần ${lesson.week}`, href: `/roadmap/week-${lesson.week}` },
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
        {lesson.content ? (
          <LessonContent content={lesson.content} />
        ) : (
          <div className="rounded-lg border bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground">
              📝 Nội dung bài học đang được cập nhật...
            </p>
          </div>
        )}

        {/* Playground */}
        {hasPlaygrounds && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-green-600" />
              💻 Thử code ngay
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Sửa code trực tiếp trong editor và nhấn <strong>&quot;▶ Chạy&quot;</strong> để xem kết quả ngay — không cần mở trang khác.
            </p>
            {isMultiPlayground ? (
              <MultiPlayground
                title="Thử code"
                snippets={playgrounds.map((s) => ({ label: s.label, code: s.code }))}
              />
            ) : (
              playgrounds.map((s) => (
                <CodePlayground key={s.id} code={s.code} language="kotlin" />
              ))
            )}
          </div>
        )}

        {/* Quiz */}
        {quizQuestions && quizQuestions.length > 0 && (
          <LessonQuiz slug={slug} questions={quizQuestions} />
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
