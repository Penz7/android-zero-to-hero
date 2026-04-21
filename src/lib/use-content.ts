"use client";

import { useState, useEffect } from "react";
import {
  fetchAllLessons,
  fetchLesson,
  fetchQuizBySlug,
  fetchPlaygroundBySlug,
  type LessonRow,
  type QuizWithQuestions,
  type PlaygroundSnippetRow,
} from "@/lib/content-api";
import { isSupabaseConfigured } from "@/lib/supabase";
import { ALL_LESSONS } from "@/lib/constants";
import { getQuizBySlug } from "@/data/quizzes";
import { getPlaygroundBySlug } from "@/data/playgrounds";

// ─── useLesson: fetch single lesson + quiz + playground ────────
export function useLesson(slug: string) {
  const [lesson, setLesson] = useState<LessonRow | null>(null);
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);
  const [playgrounds, setPlaygrounds] = useState<PlaygroundSnippetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      // Fallback: use static data + fetch MDX content from file
      const staticLesson = ALL_LESSONS.find((l) => l.slug === slug);
      if (staticLesson && !cancelled) {
        // Try to fetch MDX content from the lesson page (bundled in build)
        // In static export, MDX files aren't served directly, so we show metadata only
        setLesson({
          ...staticLesson,
          difficulty: staticLesson.difficulty as LessonRow["difficulty"],
          content: "", // Will be supplemented by staticContent prop in LessonPageContent
        });
        const staticQuiz = getQuizBySlug(slug);
        if (staticQuiz) {
          setQuiz({
            lesson_slug: slug,
            questions: staticQuiz.questions.map((q, i) => ({
              id: `static-${i}`,
              question: q.question,
              options: q.options,
              correct_index: q.correctIndex,
              explanation: q.explanation,
              sort_order: i,
            })),
          });
        }
        const staticPlayground = getPlaygroundBySlug(slug);
        setPlaygrounds(
          staticPlayground.map((s, i) => ({
            id: `static-${i}`,
            lesson_slug: slug,
            label: s.title,
            code: s.code,
            sort_order: i,
          }))
        );
      } else if (!cancelled) {
        setError("Không tìm thấy bài học");
      }
      if (!cancelled) setLoading(false);
      return;
    }

    // Supabase mode
    Promise.all([
      fetchLesson(slug),
      fetchQuizBySlug(slug),
      fetchPlaygroundBySlug(slug),
    ])
      .then(([lessonData, quizData, playgroundData]) => {
        if (cancelled) return;
        if (!lessonData) {
          setError("Không tìm thấy bài học");
        } else {
          setLesson(lessonData);
        }
        setQuiz(quizData);
        setPlaygrounds(playgroundData);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Lỗi tải dữ liệu");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { lesson, quiz, playgrounds, loading, error };
}

// ─── useAllLessons: fetch all lessons for roadmap/checklist ────
export function useAllLessons() {
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!isSupabaseConfigured) {
      // Fallback: use static data
      setLessons(
        ALL_LESSONS.map((l) => ({
          ...l,
          difficulty: l.difficulty as LessonRow["difficulty"],
          content: "",
        }))
      );
      setLoading(false);
      return;
    }

    fetchAllLessons()
      .then((data) => {
        if (!cancelled) setLessons(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { lessons, loading };
}

// ─── useLessonNavigation: prev/next lesson ────────────────────
export function useLessonNavigation(slug: string) {
  const { lessons } = useAllLessons();

  const currentIndex = lessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return { prevLesson, nextLesson, currentIndex, totalLessons: lessons.length };
}
