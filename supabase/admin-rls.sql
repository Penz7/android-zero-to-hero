-- ═══════════════════════════════════════════════════════════════
-- Security: Admin-only RLS policies
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── Helper function: check if current user is admin ──────────
-- Replace YOUR_GITHUB_USER_ID with your actual GitHub user ID
-- Find it at: https://api.github.com/users/YOUR_USERNAME
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND (
      raw_user_meta_data->>'provider_id' = 'YOUR_GITHUB_USER_ID'
      OR raw_user_meta_data->>'sub' = 'YOUR_GITHUB_USER_ID'
    )
  );
$$ LANGUAGE sql STABLE;

-- ─── Drop ALL existing write policies ─────────────────────────
-- lessons
DROP POLICY IF EXISTS "lessons_write_auth" ON lessons;
DROP POLICY IF EXISTS "lessons_update_auth" ON lessons;
DROP POLICY IF EXISTS "lessons_delete_auth" ON lessons;
DROP POLICY IF EXISTS "lessons_insert_anon" ON lessons;
DROP POLICY IF EXISTS "lessons_update_anon" ON lessons;
DROP POLICY IF EXISTS "lessons_delete_anon" ON lessons;
-- quizzes
DROP POLICY IF EXISTS "quizzes_write_auth" ON quizzes;
DROP POLICY IF EXISTS "quizzes_update_auth" ON quizzes;
DROP POLICY IF EXISTS "quizzes_delete_auth" ON quizzes;
DROP POLICY IF EXISTS "quizzes_insert_anon" ON quizzes;
DROP POLICY IF EXISTS "quizzes_update_anon" ON quizzes;
DROP POLICY IF EXISTS "quizzes_delete_anon" ON quizzes;
-- quiz_questions
DROP POLICY IF EXISTS "quiz_questions_write_auth" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_update_auth" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_delete_auth" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_insert_anon" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_update_anon" ON quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_delete_anon" ON quiz_questions;
-- playground_snippets
DROP POLICY IF EXISTS "playground_write_auth" ON playground_snippets;
DROP POLICY IF EXISTS "playground_update_auth" ON playground_snippets;
DROP POLICY IF EXISTS "playground_delete_auth" ON playground_snippets;
DROP POLICY IF EXISTS "playground_insert_anon" ON playground_snippets;
DROP POLICY IF EXISTS "playground_update_anon" ON playground_snippets;
DROP POLICY IF EXISTS "playground_delete_anon" ON playground_snippets;
-- weeks
DROP POLICY IF EXISTS "weeks_write_auth" ON weeks;
DROP POLICY IF EXISTS "weeks_update_auth" ON weeks;
DROP POLICY IF EXISTS "weeks_delete_auth" ON weeks;
DROP POLICY IF EXISTS "weeks_insert_anon" ON weeks;
DROP POLICY IF EXISTS "weeks_update_anon" ON weeks;
DROP POLICY IF EXISTS "weeks_delete_anon" ON weeks;
-- projects
DROP POLICY IF EXISTS "projects_write_auth" ON projects;
DROP POLICY IF EXISTS "projects_update_auth" ON projects;
DROP POLICY IF EXISTS "projects_delete_auth" ON projects;
DROP POLICY IF EXISTS "projects_insert_anon" ON projects;
DROP POLICY IF EXISTS "projects_update_anon" ON projects;
DROP POLICY IF EXISTS "projects_delete_anon" ON projects;
-- faqs
DROP POLICY IF EXISTS "faqs_write_auth" ON faqs;
DROP POLICY IF EXISTS "faqs_update_auth" ON faqs;
DROP POLICY IF EXISTS "faqs_delete_auth" ON faqs;
DROP POLICY IF EXISTS "faqs_insert_anon" ON faqs;
DROP POLICY IF EXISTS "faqs_update_anon" ON faqs;
DROP POLICY IF EXISTS "faqs_delete_anon" ON faqs;
-- checklist_items
DROP POLICY IF EXISTS "checklist_write_auth" ON checklist_items;
DROP POLICY IF EXISTS "checklist_update_auth" ON checklist_items;
DROP POLICY IF EXISTS "checklist_delete_auth" ON checklist_items;
DROP POLICY IF EXISTS "checklist_insert_anon" ON checklist_items;
DROP POLICY IF EXISTS "checklist_update_anon" ON checklist_items;
DROP POLICY IF EXISTS "checklist_delete_anon" ON checklist_items;

-- ─── Create admin-only write policies ─────────────────────────
-- Pattern: SELECT = public, INSERT/UPDATE/DELETE = admin only

-- lessons
CREATE POLICY "lessons_admin_insert" ON lessons FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "lessons_admin_update" ON lessons FOR UPDATE USING (is_admin());
CREATE POLICY "lessons_admin_delete" ON lessons FOR DELETE USING (is_admin());

-- quizzes
CREATE POLICY "quizzes_admin_insert" ON quizzes FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "quizzes_admin_update" ON quizzes FOR UPDATE USING (is_admin());
CREATE POLICY "quizzes_admin_delete" ON quizzes FOR DELETE USING (is_admin());

-- quiz_questions
CREATE POLICY "quiz_questions_admin_insert" ON quiz_questions FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "quiz_questions_admin_update" ON quiz_questions FOR UPDATE USING (is_admin());
CREATE POLICY "quiz_questions_admin_delete" ON quiz_questions FOR DELETE USING (is_admin());

-- playground_snippets
CREATE POLICY "playground_admin_insert" ON playground_snippets FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "playground_admin_update" ON playground_snippets FOR UPDATE USING (is_admin());
CREATE POLICY "playground_admin_delete" ON playground_snippets FOR DELETE USING (is_admin());

-- weeks
CREATE POLICY "weeks_admin_insert" ON weeks FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "weeks_admin_update" ON weeks FOR UPDATE USING (is_admin());
CREATE POLICY "weeks_admin_delete" ON weeks FOR DELETE USING (is_admin());

-- projects
CREATE POLICY "projects_admin_insert" ON projects FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "projects_admin_update" ON projects FOR UPDATE USING (is_admin());
CREATE POLICY "projects_admin_delete" ON projects FOR DELETE USING (is_admin());

-- faqs
CREATE POLICY "faqs_admin_insert" ON faqs FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "faqs_admin_update" ON faqs FOR UPDATE USING (is_admin());
CREATE POLICY "faqs_admin_delete" ON faqs FOR DELETE USING (is_admin());

-- checklist_items
CREATE POLICY "checklist_admin_insert" ON checklist_items FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "checklist_admin_update" ON checklist_items FOR UPDATE USING (is_admin());
CREATE POLICY "checklist_admin_delete" ON checklist_items FOR DELETE USING (is_admin());
