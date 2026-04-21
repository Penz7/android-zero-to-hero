-- ═══════════════════════════════════════════════════════════════
-- Content Schema: Lessons, Quizzes, Playgrounds
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. Lessons table ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lessons (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 30),
  week INTEGER NOT NULL CHECK (week >= 1 AND week <= 4),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert')),
  prerequisites TEXT[] DEFAULT '{}',
  duration TEXT NOT NULL DEFAULT '45 phút',
  tags TEXT[] DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',           -- MDX markdown content
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2. Quizzes table ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_slug TEXT NOT NULL REFERENCES lessons(slug) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lesson_slug)
);

-- ─── 3. Quiz questions table ──────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,                    -- Array of 4 choices
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  explanation TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 4. Playground snippets table ─────────────────────────────
CREATE TABLE IF NOT EXISTS playground_snippets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_slug TEXT NOT NULL REFERENCES lessons(slug) ON DELETE CASCADE,
  label TEXT NOT NULL DEFAULT 'Code',
  code TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_lessons_week ON lessons(week);
CREATE INDEX IF NOT EXISTS idx_lessons_day ON lessons(day);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_sort ON quiz_questions(quiz_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_playground_snippets_slug ON playground_snippets(lesson_slug);
CREATE INDEX IF NOT EXISTS idx_playground_snippets_sort ON playground_snippets(lesson_slug, sort_order);

-- ─── RLS Policies ─────────────────────────────────────────────
-- Public read access (anyone can view lessons, quizzes, playgrounds)
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE playground_snippets ENABLE ROW LEVEL SECURITY;

-- Read: everyone (public content)
CREATE POLICY "lessons_read_all" ON lessons FOR SELECT USING (true);
CREATE POLICY "quizzes_read_all" ON quizzes FOR SELECT USING (true);
CREATE POLICY "quiz_questions_read_all" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "playground_snippets_read_all" ON playground_snippets FOR SELECT USING (true);

-- Write: only authenticated users (admin can edit via dashboard)
-- TODO: Add admin role check for production
CREATE POLICY "lessons_write_auth" ON lessons FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "lessons_update_auth" ON lessons FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "lessons_delete_auth" ON lessons FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "quizzes_write_auth" ON quizzes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "quizzes_update_auth" ON quizzes FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "quizzes_delete_auth" ON quizzes FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "quiz_questions_write_auth" ON quiz_questions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "quiz_questions_update_auth" ON quiz_questions FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "quiz_questions_delete_auth" ON quiz_questions FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "playground_write_auth" ON playground_snippets FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "playground_update_auth" ON playground_snippets FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "playground_delete_auth" ON playground_snippets FOR DELETE USING (auth.uid() IS NOT NULL);

-- ─── Auto-update updated_at trigger ───────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_quizzes_updated_at BEFORE UPDATE ON quizzes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_playground_updated_at BEFORE UPDATE ON playground_snippets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
