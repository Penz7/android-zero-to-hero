-- ═══════════════════════════════════════════════════════════════
-- COMBINED: Create tables + Seed data for weeks, projects, faqs, checklist_items
-- Paste vào Supabase SQL Editor → Run (chạy 1 lần là xong)
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. Create Tables ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS weeks (
  number INTEGER PRIMARY KEY CHECK (number >= 1 AND number <= 4),
  title TEXT NOT NULL,
  theme TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  difficulty TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

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

CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  item_text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2. Indexes ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_week ON projects(week);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_sort ON faqs(sort_order);
CREATE INDEX IF NOT EXISTS idx_checklist_category ON checklist_items(category);
CREATE INDEX IF NOT EXISTS idx_checklist_sort ON checklist_items(category, sort_order);

-- ─── 3. RLS ───────────────────────────────────────────────────
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;

-- Public read
DROP POLICY IF EXISTS "weeks_read_all" ON weeks;
CREATE POLICY "weeks_read_all" ON weeks FOR SELECT USING (true);
DROP POLICY IF EXISTS "projects_read_all" ON projects;
CREATE POLICY "projects_read_all" ON projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "faqs_read_all" ON faqs;
CREATE POLICY "faqs_read_all" ON faqs FOR SELECT USING (true);
DROP POLICY IF EXISTS "checklist_items_read_all" ON checklist_items;
CREATE POLICY "checklist_items_read_all" ON checklist_items FOR SELECT USING (true);

-- Authenticated write
DROP POLICY IF EXISTS "weeks_write" ON weeks;
CREATE POLICY "weeks_write" ON weeks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "weeks_update" ON weeks;
CREATE POLICY "weeks_update" ON weeks FOR UPDATE USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "weeks_delete" ON weeks;
CREATE POLICY "weeks_delete" ON weeks FOR DELETE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "projects_write" ON projects;
CREATE POLICY "projects_write" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "projects_update" ON projects;
CREATE POLICY "projects_update" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "projects_delete" ON projects;
CREATE POLICY "projects_delete" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "faqs_write" ON faqs;
CREATE POLICY "faqs_write" ON faqs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "faqs_update" ON faqs;
CREATE POLICY "faqs_update" ON faqs FOR UPDATE USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "faqs_delete" ON faqs;
CREATE POLICY "faqs_delete" ON faqs FOR DELETE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "checklist_write" ON checklist_items;
CREATE POLICY "checklist_write" ON checklist_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "checklist_update" ON checklist_items;
CREATE POLICY "checklist_update" ON checklist_items FOR UPDATE USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "checklist_delete" ON checklist_items;
CREATE POLICY "checklist_delete" ON checklist_items FOR DELETE USING (auth.uid() IS NOT NULL);

-- Triggers
DROP TRIGGER IF EXISTS trg_weeks_updated_at ON weeks;
CREATE TRIGGER trg_weeks_updated_at BEFORE UPDATE ON weeks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_projects_updated_at ON projects;
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_faqs_updated_at ON faqs;
CREATE TRIGGER trg_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_checklist_updated_at ON checklist_items;
CREATE TRIGGER trg_checklist_updated_at BEFORE UPDATE ON checklist_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── 4. Seed Data ─────────────────────────────────────────────

-- Weeks
INSERT INTO weeks (number, title, theme, description, difficulty) VALUES
(1, 'Kotlin Fundamentals', 'Nền tảng ngôn ngữ', 'Bắt đầu từ cài đặt môi trường, học cú pháp Kotlin cơ bản: biến, hàm, điều kiện, OOP, Collections, Null safety.', '⭐'),
(2, 'Jetpack Compose Basics', 'UI hiện đại', 'Làm chủ UI với Compose: Composable functions, Layouts, State, Navigation, Lists, Theming, Animations.', '⭐⭐'),
(3, 'Architecture & Data', 'Xây dựng chuyên nghiệp', 'MVVM, ViewModel, Coroutines, Room Database, Retrofit, Hilt DI, Clean Architecture.', '⭐⭐⭐'),
(4, 'Engineering Level', 'Kỹ năng Engineer', 'Unit/UI Testing, CI/CD, Performance, Security, Deploy Play Store, Phỏng vấn.', '⭐⭐⭐⭐')
ON CONFLICT (number) DO UPDATE SET
  title = EXCLUDED.title,
  theme = EXCLUDED.theme,
  description = EXCLUDED.description,
  difficulty = EXCLUDED.difficulty;

-- Projects
INSERT INTO projects (slug, title, week, difficulty, skills, description, sort_order) VALUES
('habit-tracker', 'Habit Tracker', 'Tuần 1-2', '🟢 Beginner', ARRAY['Variables', 'Functions', 'Composable', 'State'], 'App theo dõi thói quen hàng ngày', 1),
('notes-app', 'Notes App', 'Tuần 2-3', '🟡 Intermediate', ARRAY['Navigation', 'Room', 'ViewModel', 'Coroutines'], 'App ghi chú với lưu trữ local database', 2),
('movie-browser', 'Movie Browser', 'Tuần 3', '🟠 Advanced', ARRAY['Retrofit', 'Hilt', 'Flow', 'Repository'], 'Duyệt phim từ TMDB API, cache offline', 3),
('clean-arch-sample', 'Clean Architecture Sample', 'Tuần 3-4', '🔴 Expert', ARRAY['Clean Arch', 'DI', 'Testing', 'CI/CD'], 'Full architecture sample project', 4)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  week = EXCLUDED.week,
  difficulty = EXCLUDED.difficulty,
  skills = EXCLUDED.skills,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- FAQs
INSERT INTO faqs (question, answer, sort_order) VALUES
('Tôi cần biết gì trước khi bắt đầu?', 'Bạn chỉ cần biết cơ bản về lập trình (biến, hàm, điều kiện — ngôn ngữ nào cũng được). Nếu chưa biết gì, hãy học cơ bản programming trước 1-2 tuần.', 1),
('Tại sao chọn Kotlin thay vì Java?', 'Kotlin là ngôn ngữ chính thức được Google ưu tiên cho Android từ 2019. Ngắn gọn hơn, an toàn hơn (null safety), và là tương lai của Android development.', 2),
('Học 30 ngày có đủ để đi làm không?', '30 ngày đủ để bạn có nền tảng vững và hiểu cách xây dựng app Android hoàn chỉnh. Để thành thạo và tự tin phỏng vấn, bạn cần thêm 1-2 tháng thực hành và build thêm project riêng.', 3),
('Tôi cần cài đặt những gì?', 'Chỉ cần Android Studio (miễn phí), máy tính có 8GB RAM trở lên, và kết nối internet. Bài 1 sẽ hướng dẫn cài đặt chi tiết.', 4),
('Có cần trả phí gì không?', 'Không. Tất cả nội dung, code, và tài liệu đều miễn phí và mã nguồn mở trên GitHub.', 5),
('Tôi có thể học nhanh hơn/chậm hơn không?', 'Tất nhiên! Lộ trình 30 ngày chỉ là gợi ý. Học theo tốc độ của bạn. Mỗi bài học có duration ước tính nhưng không có áp lực deadline.', 6);

-- Checklist Items
INSERT INTO checklist_items (category, item_text, sort_order) VALUES
('🧑‍💻 Kotlin Mastery', 'Hiểu val vs var và khi nào dùng cái nào', 1),
('🧑‍💻 Kotlin Mastery', 'Sử dụng String templates và raw strings', 2),
('🧑‍💻 Kotlin Mastery', 'Viết Lambda expressions và higher-order functions', 3),
('🧑‍💻 Kotlin Mastery', 'Hiểu null safety: ?, ?., ?:, !!', 4),
('🧑‍💻 Kotlin Mastery', 'Viết data class, sealed class, enum class', 5),
('🧑‍💻 Kotlin Mastery', 'Sử dụng extension functions', 6),
('🧑‍💻 Kotlin Mastery', 'Hiểu collection operations: filter, map, reduce', 7),
('🧑‍💻 Kotlin Mastery', 'Sử dụng when expression thay vì switch-case', 8),
('🧑‍💻 Kotlin Mastery', 'Viết suspend functions cơ bản', 9),
('🧑‍💻 Kotlin Mastery', 'Hiểu Coroutine scope và dispatcher', 10),
('🎨 Compose Mastery', 'Viết @Composable functions', 1),
('🎨 Compose Mastery', 'Sử dụng Column, Row, Box, Spacer', 2),
('🎨 Compose Mastery', 'Hiểu Modifier chain và thứ tự', 3),
('🎨 Compose Mastery', 'Quản lý state: remember, mutableStateOf', 4),
('🎨 Compose Mastery', 'State hoisting pattern', 5),
('🎨 Compose Mastery', 'Sử dụng LazyColumn/LazyRow', 6),
('🎨 Compose Mastery', 'Navigation với NavHost', 7),
('🎨 Compose Mastery', 'Custom theming: Color, Typography', 8),
('🏗️ Architecture', 'Hiểu MVVM pattern', 1),
('🏗️ Architecture', 'Tách biệt UI, Domain, Data layers', 2),
('🏗️ Architecture', 'Sử dụng ViewModel + StateFlow', 3),
('🏗️ Architecture', 'Repository pattern', 4),
('🏗️ Architecture', 'Dependency Injection cơ bản với Hilt', 5),
('📋 General Interview Prep', 'Kể được 3 project đã làm và role của mình', 1),
('📋 General Interview Prep', 'Giải thích MVVM cho người mới', 2),
('📋 General Interview Prep', 'Nói về cách xử lý error trong app', 3),
('📋 General Interview Prep', 'Hiểu Activity lifecycle', 4),
('📋 General Interview Prep', 'Giải thích tại sao dùng Coroutines thay Thread', 5),
('📋 General Interview Prep', 'Nói về cách optimize list performance', 6),
('📋 General Interview Prep', 'Hiểu Unit Test vs UI Test', 7),
('📋 General Interview Prep', 'Biết cách deploy lên Play Store', 8),
('📋 General Interview Prep', 'Có GitHub profile với code samples', 9),
('📋 General Interview Prep', 'Chuẩn bị câu hỏi cho interviewer', 10);
