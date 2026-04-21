-- ═══════════════════════════════════════════════════════════════
-- Additional Content Schema: weeks, projects, faqs, checklist_items
-- Run this AFTER content-schema.sql
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. Weeks table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS weeks (
  number INTEGER PRIMARY KEY CHECK (number >= 1 AND number <= 4),
  title TEXT NOT NULL,
  theme TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  difficulty TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2. Projects table ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  week TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT '',
  skills TEXT[] DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 3. FAQs table ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 4. Checklist items table ─────────────────────────────────
CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,                -- e.g. "Kotlin Mastery", "Compose Mastery"
  item_text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_week ON projects(week);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_sort ON faqs(sort_order);
CREATE INDEX IF NOT EXISTS idx_checklist_category ON checklist_items(category);
CREATE INDEX IF NOT EXISTS idx_checklist_sort ON checklist_items(category, sort_order);

-- ─── RLS Policies ─────────────────────────────────────────────
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;

-- Read: everyone (public content)
CREATE POLICY "weeks_read_all" ON weeks FOR SELECT USING (true);
CREATE POLICY "projects_read_all" ON projects FOR SELECT USING (true);
CREATE POLICY "faqs_read_all" ON faqs FOR SELECT USING (true);
CREATE POLICY "checklist_items_read_all" ON checklist_items FOR SELECT USING (true);

-- Write: authenticated users
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

-- ─── Auto-update updated_at triggers ──────────────────────────
CREATE TRIGGER trg_weeks_updated_at BEFORE UPDATE ON weeks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_checklist_updated_at BEFORE UPDATE ON checklist_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
