import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

interface QuizLocalData {
  score: number;
  total: number;
  submitted: boolean;
}

interface ProgressRow {
  lesson_slug: string;
  quiz_score: number;
  quiz_total: number;
  completed: boolean;
  completed_at: string | null;
  updated_at: string;
}

// ─── Upload local progress to cloud ───────────────────────────
export async function syncToCloud(): Promise<boolean> {
  // Rate limit: 1 sync per 5 seconds
  if (!rateLimit("sync-to-cloud", 5000)) return false;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const rows: ProgressRow[] = [];

  // Scan all localStorage for quiz_* keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith("quiz_")) continue;

    const slug = key.replace("quiz_", "");
    try {
      const data: QuizLocalData = JSON.parse(localStorage.getItem(key)!);
      if (data.submitted) {
        // answers.length or total — handle both formats
        const quizTotal = data.total || (Array.isArray((data as any).answers) ? (data as any).answers.length : 3);
        rows.push({
          lesson_slug: slug,
          quiz_score: data.score,
          quiz_total: quizTotal,
          completed: data.score >= Math.ceil(quizTotal * 0.7),
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch {}
  }

  if (rows.length === 0) return true;

  // Upsert (insert or update) all progress
  const { error } = await supabase.from("user_progress").upsert(
    rows.map((r) => ({ ...r, user_id: user.id })),
    { onConflict: "user_id,lesson_slug" }
  );

  return !error;
}

// ─── Download cloud progress to local ─────────────────────────
export async function syncFromCloud(): Promise<number> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id);

  if (error || !data) return 0;

  let synced = 0;

  for (const row of data) {
    const key = `quiz_${row.lesson_slug}`;
    const localRaw = localStorage.getItem(key);

    let shouldSync = false;

    if (!localRaw) {
      // Local chưa có → sync từ cloud
      shouldSync = true;
    } else {
      try {
        const local: QuizLocalData = JSON.parse(localRaw);
        // Cloud score cao hơn → sync
        if (row.quiz_score > local.score) {
          shouldSync = true;
        }
      } catch {
        shouldSync = true;
      }
    }

    if (shouldSync) {
      localStorage.setItem(
        key,
        JSON.stringify({
          score: row.quiz_score,
          total: row.quiz_total,
          submitted: true,
          // Reconstruct answers array (all null) so LessonQuiz won't crash
          answers: new Array(row.quiz_total || 3).fill(null),
        })
      );
      synced++;
    }
  }

  return synced;
}

// ─── Save single quiz result ──────────────────────────────────
export async function saveQuizToCloud(
  slug: string,
  score: number,
  total: number
): Promise<boolean> {
  // Rate limit: 1 save per 2 seconds per quiz
  if (!rateLimit(`save-quiz-${slug}`, 2000)) return false;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      lesson_slug: slug,
      quiz_score: score,
      quiz_total: total,
      completed: score >= Math.ceil(total * 0.7),
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_slug" }
  );

  return !error;
}

// ─── Save checklist item ──────────────────────────────────────
export async function saveChecklistToCloud(
  itemKey: string,
  checked: boolean
): Promise<boolean> {
  // Rate limit: 1 save per 2 seconds per item
  if (!rateLimit(`save-checklist-${itemKey}`, 2000)) return false;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase.from("user_checklist").upsert(
    {
      user_id: user.id,
      item_key: itemKey,
      checked,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,item_key" }
  );

  return !error;
}

// ─── Load checklist from cloud ────────────────────────────────
export async function loadChecklistFromCloud(): Promise<
  Record<string, boolean>
> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {};

  const { data } = await supabase
    .from("user_checklist")
    .select("item_key, checked")
    .eq("user_id", user.id);

  if (!data) return {};

  const result: Record<string, boolean> = {};
  data.forEach((row) => {
    result[row.item_key] = row.checked;
  });
  return result;
}
