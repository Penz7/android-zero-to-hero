-- ══════════════════════════════════════════════════════════
-- Android Zero to Hero — Supabase Database Schema
-- Chạy file này trong: Supabase Dashboard → SQL Editor → New Query
-- ══════════════════════════════════════════════════════════

-- 1. Bảng lưu quiz progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_slug TEXT NOT NULL,
  quiz_score INT NOT NULL DEFAULT 0,
  quiz_total INT NOT NULL DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_slug)
);

-- 2. Bảng lưu checklist items
CREATE TABLE IF NOT EXISTS user_checklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_key TEXT NOT NULL,
  checked BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, item_key)
);

-- 3. Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_checklist ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies cho user_progress
CREATE POLICY "read_own_progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "insert_own_progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_progress" ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_progress" ON user_progress
  FOR DELETE USING (auth.uid() = user_id);

-- 5. RLS Policies cho user_checklist
CREATE POLICY "read_own_checklist" ON user_checklist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "insert_own_checklist" ON user_checklist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_checklist" ON user_checklist
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_checklist" ON user_checklist
  FOR DELETE USING (auth.uid() = user_id);

-- 6. Indexes cho performance
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_slug ON user_progress(lesson_slug);
CREATE INDEX IF NOT EXISTS idx_checklist_user ON user_checklist(user_id);
CREATE INDEX IF NOT EXISTS idx_checklist_key ON user_checklist(item_key);

-- 7. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_progress
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_checklist
  BEFORE UPDATE ON user_checklist
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ══════════════════════════════════════════════════════════
-- ✅ Done! Tables created with RLS protection.
-- Test: Dashboard → Table Editor → verify tables exist
-- ══════════════════════════════════════════════════════════
