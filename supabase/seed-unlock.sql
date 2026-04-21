-- ═══════════════════════════════════════════════════════════════
-- Temp: Allow anon inserts for seeding ALL content
-- Run this BEFORE seed, then run lockdown AFTER seed
-- ═══════════════════════════════════════════════════════════════

-- Drop restrictive write policies (content-schema)
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

-- Drop restrictive write policies (content-schema-v2)
DROP POLICY IF EXISTS "weeks_write_auth" ON weeks;
DROP POLICY IF EXISTS "weeks_update_auth" ON weeks;
DROP POLICY IF EXISTS "weeks_delete_auth" ON weeks;
DROP POLICY IF EXISTS "projects_write_auth" ON projects;
DROP POLICY IF EXISTS "projects_update_auth" ON projects;
DROP POLICY IF EXISTS "projects_delete_auth" ON projects;
DROP POLICY IF EXISTS "faqs_write_auth" ON faqs;
DROP POLICY IF EXISTS "faqs_update_auth" ON faqs;
DROP POLICY IF EXISTS "faqs_delete_auth" ON faqs;
DROP POLICY IF EXISTS "checklist_write_auth" ON checklist_items;
DROP POLICY IF EXISTS "checklist_update_auth" ON checklist_items;
DROP POLICY IF EXISTS "checklist_delete_auth" ON checklist_items;

-- Allow anon to insert/update/delete ALL tables (for seeding)
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

CREATE POLICY "weeks_insert_anon" ON weeks FOR INSERT WITH CHECK (true);
CREATE POLICY "weeks_update_anon" ON weeks FOR UPDATE USING (true);
CREATE POLICY "weeks_delete_anon" ON weeks FOR DELETE USING (true);

CREATE POLICY "projects_insert_anon" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "projects_update_anon" ON projects FOR UPDATE USING (true);
CREATE POLICY "projects_delete_anon" ON projects FOR DELETE USING (true);

CREATE POLICY "faqs_insert_anon" ON faqs FOR INSERT WITH CHECK (true);
CREATE POLICY "faqs_update_anon" ON faqs FOR UPDATE USING (true);
CREATE POLICY "faqs_delete_anon" ON faqs FOR DELETE USING (true);

CREATE POLICY "checklist_insert_anon" ON checklist_items FOR INSERT WITH CHECK (true);
CREATE POLICY "checklist_update_anon" ON checklist_items FOR UPDATE USING (true);
CREATE POLICY "checklist_delete_anon" ON checklist_items FOR DELETE USING (true);
