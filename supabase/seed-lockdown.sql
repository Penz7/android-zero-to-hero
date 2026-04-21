-- ═══════════════════════════════════════════════════════════════
-- Lockdown: Restore proper RLS after seeding ALL content
-- Run this AFTER seed completes successfully
-- ═══════════════════════════════════════════════════════════════

-- Drop ALL anon write policies
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
DROP POLICY IF EXISTS "weeks_insert_anon" ON weeks;
DROP POLICY IF EXISTS "weeks_update_anon" ON weeks;
DROP POLICY IF EXISTS "weeks_delete_anon" ON weeks;
DROP POLICY IF EXISTS "projects_insert_anon" ON projects;
DROP POLICY IF EXISTS "projects_update_anon" ON projects;
DROP POLICY IF EXISTS "projects_delete_anon" ON projects;
DROP POLICY IF EXISTS "faqs_insert_anon" ON faqs;
DROP POLICY IF EXISTS "faqs_update_anon" ON faqs;
DROP POLICY IF EXISTS "faqs_delete_anon" ON faqs;
DROP POLICY IF EXISTS "checklist_insert_anon" ON checklist_items;
DROP POLICY IF EXISTS "checklist_update_anon" ON checklist_items;
DROP POLICY IF EXISTS "checklist_delete_anon" ON checklist_items;

-- Restore authenticated-only write policies for ALL tables
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

CREATE POLICY "weeks_write_auth" ON weeks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "weeks_update_auth" ON weeks FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "weeks_delete_auth" ON weeks FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "projects_write_auth" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "projects_update_auth" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "projects_delete_auth" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "faqs_write_auth" ON faqs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "faqs_update_auth" ON faqs FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "faqs_delete_auth" ON faqs FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "checklist_write_auth" ON checklist_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "checklist_update_auth" ON checklist_items FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "checklist_delete_auth" ON checklist_items FOR DELETE USING (auth.uid() IS NOT NULL);
