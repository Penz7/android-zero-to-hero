-- ═══════════════════════════════════════════════════════════════
-- Lockdown: Restore proper RLS after seeding
-- Run this AFTER seed completes successfully
-- ═══════════════════════════════════════════════════════════════

-- Drop anon write policies
DROP POLICY IF EXISTS "lessons_insert_anon" ON lessons;
DROP POLICY IF EXISTS "lessons_update_anon" ON lessons;
DROP POLICY IF EXISTS "lessons_delete_anon" ON lessons;
DROP POLICY IF EXISTS "quizzes_insert_anon" ON quizzes;
DROP POLICY IF EXISTS "quizzes_update_anon" ON quizzes;
DROP POLICY IF EXISTS "quizzes_delete_anon" ON quizzes;
DROP POLICY IF EXISTS "quiz_questions_insert_anon" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_update_anon" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_delete_anon" ON quiz_questions;
DROP POLICY IF EXISTS "playground_insert_anon" ON playground_snippets;
DROP POLICY IF EXISTS "playground_update_anon" ON playground_snippets;
DROP POLICY IF EXISTS "playground_delete_anon" ON playground_snippets;

-- Restore authenticated-only write policies
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
