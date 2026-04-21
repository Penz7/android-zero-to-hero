import { supabase } from "./supabase";

// ─── Types (mirror DB schema) ──────────────────────────────────
export interface LessonRow {
  slug: string;
  title: string;
  day: number;
  week: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  prerequisites: string[];
  duration: string;
  tags: string[];
  description: string;
  content: string;
}

export interface WeekRow {
  number: number;
  title: string;
  theme: string;
  description: string;
  difficulty: string;
}

export interface ProjectRow {
  slug: string;
  title: string;
  week: string;
  difficulty: string;
  skills: string[];
  description: string;
  sort_order: number;
}

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface ChecklistItemRow {
  id: string;
  category: string;
  item_text: string;
  sort_order: number;
}

export interface QuizQuestionRow {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  sort_order: number;
}

export interface QuizWithQuestions {
  lesson_slug: string;
  questions: QuizQuestionRow[];
}

export interface PlaygroundSnippetRow {
  id: string;
  lesson_slug: string;
  label: string;
  code: string;
  sort_order: number;
}

// ─── In-memory cache (survives re-renders, resets on page reload) ──
const cache = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data as T;
  cache.delete(key);
  return null;
}

function setCache(key: string, data: any) {
  cache.set(key, { data, ts: Date.now() });
}

// ─── Fetch all lessons (for roadmap, checklist, etc.) ──────────
export async function fetchAllLessons(): Promise<LessonRow[]> {
  const cached = getCached<LessonRow[]>("all_lessons");
  if (cached) return cached;

  const { data, error } = await supabase
    .from("lessons")
    .select("slug, title, day, week, difficulty, prerequisites, duration, tags, description")
    .order("day", { ascending: true });

  if (error) {
    console.error("fetchAllLessons error:", error);
    return [];
  }

  const lessons = (data ?? []) as LessonRow[];
  setCache("all_lessons", lessons);
  return lessons;
}

// ─── Fetch single lesson with content ─────────────────────────
export async function fetchLesson(slug: string): Promise<LessonRow | null> {
  const cacheKey = `lesson_${slug}`;
  const cached = getCached<LessonRow>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`fetchLesson(${slug}) error:`, error);
    return null;
  }

  setCache(cacheKey, data);
  return data as LessonRow;
}

// ─── Fetch quiz with questions for a lesson ───────────────────
export async function fetchQuizBySlug(slug: string): Promise<QuizWithQuestions | null> {
  const cacheKey = `quiz_${slug}`;
  const cached = getCached<QuizWithQuestions>(cacheKey);
  if (cached) return cached;

  // Get quiz ID
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("id")
    .eq("lesson_slug", slug)
    .single();

  if (quizError || !quiz) return null;

  // Get questions
  const { data: questions, error: qError } = await supabase
    .from("quiz_questions")
    .select("id, question, options, correct_index, explanation, sort_order")
    .eq("quiz_id", quiz.id)
    .order("sort_order", { ascending: true });

  if (qError) {
    console.error(`fetchQuizBySlug(${slug}) error:`, qError);
    return null;
  }

  const result: QuizWithQuestions = {
    lesson_slug: slug,
    questions: (questions ?? []) as QuizQuestionRow[],
  };

  setCache(cacheKey, result);
  return result;
}

// ─── Fetch playground snippets for a lesson ───────────────────
export async function fetchPlaygroundBySlug(slug: string): Promise<PlaygroundSnippetRow[]> {
  const cacheKey = `playground_${slug}`;
  const cached = getCached<PlaygroundSnippetRow[]>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from("playground_snippets")
    .select("id, lesson_slug, label, code, sort_order")
    .eq("lesson_slug", slug)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(`fetchPlaygroundBySlug(${slug}) error:`, error);
    return [];
  }

  const snippets = (data ?? []) as PlaygroundSnippetRow[];
  setCache(cacheKey, snippets);
  return snippets;
}

// ─── Fetch weeks from Supabase ─────────────────────────────────
export async function fetchWeeks(): Promise<
  { number: number; title: string; theme: string; description: string; difficulty: string; lessons: string[] }[]
> {
  const cached = getCached<any[]>("weeks_with_lessons");
  if (cached) return cached;

  try {
    const { data, error } = await supabase
      .from("weeks")
      .select("*")
      .order("number", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }

    const allLessons = await fetchAllLessons();
    const weekMap = new Map<number, string[]>();
    for (const l of allLessons) {
      const arr = weekMap.get(l.week) ?? [];
      arr.push(l.slug);
      weekMap.set(l.week, arr);
    }

    const result = ((data ?? []) as WeekRow[]).map((w) => ({
      ...w,
      lessons: weekMap.get(w.number) ?? [],
    }));

    setCache("weeks_with_lessons", result);
    return result;
  } catch {
    return [];
  }
}

// ─── Fetch projects from Supabase ─────────────────────────────
export async function fetchProjects(): Promise<ProjectRow[]> {
  const cached = getCached<ProjectRow[]>("projects");
  if (cached) return cached;

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    const projects = data as ProjectRow[];
    setCache("projects", projects);
    return projects;
  } catch {
    return [];
  }
}

// ─── Fetch FAQs from Supabase ──────────────────────────────────
export async function fetchFaqs(): Promise<FaqRow[]> {
  const cached = getCached<FaqRow[]>("faqs");
  if (cached) return cached;

  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    const faqs = data as FaqRow[];
    setCache("faqs", faqs);
    return faqs;
  } catch {
    return [];
  }
}

// ─── Fetch checklist items from Supabase ───────────────────────
export async function fetchChecklistItems(): Promise<ChecklistItemRow[]> {
  const cached = getCached<ChecklistItemRow[]>("checklist_items");
  if (cached) return cached;

  try {
    const { data, error } = await supabase
      .from("checklist_items")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    const items = data as ChecklistItemRow[];
    setCache("checklist_items", items);
    return items;
  } catch {
    return [];
  }
}

// ─── Clear cache (useful after content update) ────────────────
export function clearContentCache() {
  cache.clear();
}
