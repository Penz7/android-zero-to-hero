-- ═══════════════════════════════════════════════════════════════
-- Temp: Allow anon inserts for seeding content
-- Run this BEFORE seed, then run lockdown AFTER seed
-- ═══════════════════════════════════════════════════════════════

-- Drop restrictive write policies
DROP POLICY IF EXISTS "lessons_write_auth" ON lessons;
DROP POLICY IF EXISTS "lessons_update_auth" ON lessons;
DROP POLICY IF EXISTS "lessons_delete_auth" ON lessons;
DROP POLICY IF EXISTS "quizzes_write_auth" ON quizzes;
DROP POLICY IF EXISTS "quizzes_update_auth" ON quizzes;
DROP POLICY IF EXISTS "quizzes_delete_auth" ON quizzes;
DROP POLICY IF EXISTS "quiz_questions_write_auth" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_update_auth" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_delete_auth" ON quiz_questions;
DROP POLICY IF EXISTS "playground_write_auth" ON playground_snippets;
DROP POLICY IF EXISTS "playground_update_auth" ON playground_snippets;
DROP POLICY IF EXISTS "playground_delete_auth" ON playground_snippets;

-- Allow anon to insert/update/delete (for seeding)
CREATE POLICY "lessons_insert_anon" ON lessons FOR INSERT WITH CHECK (true);
CREATE POLICY "lessons_update_anon" ON lessons FOR UPDATE USING (true);
CREATE POLICY "lessons_delete_anon" ON lessons FOR DELETE USING (true);

CREATE POLICY "quizzes_insert_anon" ON quizzes FOR INSERT WITH CHECK (true);
CREATE POLICY "quizzes_update_anon" ON quizzes FOR UPDATE USING (true);
CREATE POLICY "quizzes_delete_anon" ON quizzes FOR DELETE USING (true);

CREATE POLICY "quiz_questions_insert_anon" ON quiz_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "quiz_questions_update_anon" ON quiz_questions FOR UPDATE USING (true);
CREATE POLICY "quiz_questions_delete_anon" ON quiz_questions FOR DELETE USING (true);

CREATE POLICY "playground_insert_anon" ON playground_snippets FOR INSERT WITH CHECK (true);
CREATE POLICY "playground_update_anon" ON playground_snippets FOR UPDATE USING (true);
CREATE POLICY "playground_delete_anon" ON playground_snippets FOR DELETE USING (true);
