-- ═══════════════════════════════════════════════════════════════════════════
-- Android Zero to Hero — Complete Supabase Schema (ALL-IN-ONE)
--
-- File này tạo TOÀN BỘ database cho dự án:
--   8 bảng content + 2 bảng user data
--   RLS policies, indexes, triggers
--   Seed data cho weeks, projects, faqs, checklist_items
--
-- Chạy: Supabase Dashboard → SQL Editor → New Query → Paste → Run
--
-- Lưu ý: Lesson content (MDX) và Quiz questions cần chạy seed script riêng:
--   npm run seed:content (cần SUPABASE_SERVICE_KEY)
-- ═══════════════════════════════════════════════════════════════════════════


-- ╔══════════════════════════════════════════════════════════════╗
-- ║  PART 1: UTILITY FUNCTIONS                                   ║
-- ╚══════════════════════════════════════════════════════════════╝

-- Secure trigger function (fixes "search_path mutable" warning)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ╔══════════════════════════════════════════════════════════════╗
-- ║  PART 2: CONTENT TABLES                                      ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ─── 2.1 Lessons ──────────────────────────────────────────────
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
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2.2 Quizzes ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_slug TEXT NOT NULL REFERENCES lessons(slug) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lesson_slug)
);

-- ─── 2.3 Quiz Questions ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  explanation TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2.4 Playground Snippets ──────────────────────────────────
CREATE TABLE IF NOT EXISTS playground_snippets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_slug TEXT NOT NULL REFERENCES lessons(slug) ON DELETE CASCADE,
  label TEXT NOT NULL DEFAULT 'Code',
  code TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2.5 Weeks ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS weeks (
  number INTEGER PRIMARY KEY CHECK (number >= 1 AND number <= 4),
  title TEXT NOT NULL,
  theme TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  difficulty TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2.6 Projects ─────────────────────────────────────────────
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

-- ─── 2.7 FAQs ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2.8 Checklist Items ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  item_text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- ╔══════════════════════════════════════════════════════════════╗
-- ║  PART 3: USER DATA TABLES                                    ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ─── 3.1 User Progress (quiz results) ─────────────────────────
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

-- ─── 3.2 User Checklist ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_checklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_key TEXT NOT NULL,
  checked BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, item_key)
);


-- ╔══════════════════════════════════════════════════════════════╗
-- ║  PART 4: INDEXES                                             ║
-- ╚══════════════════════════════════════════════════════════════╝

-- Lessons
CREATE INDEX IF NOT EXISTS idx_lessons_week ON lessons(week);
CREATE INDEX IF NOT EXISTS idx_lessons_day ON lessons(day);

-- Quizzes
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_sort ON quiz_questions(quiz_id, sort_order);

-- Playgrounds
CREATE INDEX IF NOT EXISTS idx_playground_snippets_slug ON playground_snippets(lesson_slug);
CREATE INDEX IF NOT EXISTS idx_playground_snippets_sort ON playground_snippets(lesson_slug, sort_order);

-- Projects
CREATE INDEX IF NOT EXISTS idx_projects_week ON projects(week);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);

-- FAQs
CREATE INDEX IF NOT EXISTS idx_faqs_sort ON faqs(sort_order);

-- Checklist
CREATE INDEX IF NOT EXISTS idx_checklist_category ON checklist_items(category);
CREATE INDEX IF NOT EXISTS idx_checklist_sort ON checklist_items(category, sort_order);

-- User data
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_slug ON user_progress(lesson_slug);
CREATE INDEX IF NOT EXISTS idx_checklist_user ON user_checklist(user_id);
CREATE INDEX IF NOT EXISTS idx_checklist_key ON user_checklist(item_key);


-- ╔══════════════════════════════════════════════════════════════╗
-- ║  PART 5: ROW LEVEL SECURITY                                  ║
-- ╚══════════════════════════════════════════════════════════════╝

-- Enable RLS on all tables
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE playground_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_checklist ENABLE ROW LEVEL SECURITY;

-- ─── Public content: SELECT for everyone ───────────────────────
DO $$ BEGIN
  CREATE POLICY "public_read" ON lessons FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read" ON quizzes FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read" ON quiz_questions FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read" ON playground_snippets FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read" ON weeks FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read" ON projects FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read" ON faqs FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read" ON checklist_items FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ─── Public content: INSERT/UPDATE/DELETE for authenticated ────
DO $$ BEGIN
  CREATE POLICY "auth_write" ON lessons FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_update" ON lessons FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_delete" ON lessons FOR DELETE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "auth_write" ON quizzes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_update" ON quizzes FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_delete" ON quizzes FOR DELETE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "auth_write" ON quiz_questions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_update" ON quiz_questions FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_delete" ON quiz_questions FOR DELETE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "auth_write" ON playground_snippets FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_update" ON playground_snippets FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_delete" ON playground_snippets FOR DELETE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "auth_write" ON weeks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_update" ON weeks FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_delete" ON weeks FOR DELETE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "auth_write" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_update" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_delete" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "auth_write" ON faqs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_update" ON faqs FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_delete" ON faqs FOR DELETE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "auth_write" ON checklist_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_update" ON checklist_items FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_delete" ON checklist_items FOR DELETE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ─── User data: owner-only access ─────────────────────────────
DO $$ BEGIN
  CREATE POLICY "owner_read" ON user_progress FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "owner_insert" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "owner_update" ON user_progress FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "owner_delete" ON user_progress FOR DELETE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner_read" ON user_checklist FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "owner_insert" ON user_checklist FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "owner_update" ON user_checklist FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "owner_delete" ON user_checklist FOR DELETE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ╔══════════════════════════════════════════════════════════════╗
-- ║  PART 6: TRIGGERS                                            ║
-- ╚══════════════════════════════════════════════════════════════╝

DO $$ BEGIN
  CREATE TRIGGER trg_lessons_updated_at BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_quizzes_updated_at BEFORE UPDATE ON quizzes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_playground_updated_at BEFORE UPDATE ON playground_snippets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_weeks_updated_at BEFORE UPDATE ON weeks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_faqs_updated_at BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_checklist_updated_at BEFORE UPDATE ON checklist_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_progress_updated_at BEFORE UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_checklist_data_updated_at BEFORE UPDATE ON user_checklist
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ╔══════════════════════════════════════════════════════════════╗
-- ║  PART 7: SEED DATA                                           ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ─── 7.1 Weeks ────────────────────────────────────────────────
INSERT INTO weeks (number, title, theme, description, difficulty) VALUES
(1, 'Kotlin Fundamentals', 'Nền tảng ngôn ngữ', 'Bắt đầu từ cài đặt môi trường, học cú pháp Kotlin cơ bản: biến, hàm, điều kiện, OOP, Collections, Null safety.', '⭐'),
(2, 'Jetpack Compose Basics', 'UI hiện đại', 'Làm chủ UI với Compose: Composable functions, Layouts, State, Navigation, Lists, Theming, Animations.', '⭐⭐'),
(3, 'Architecture & Data', 'Xây dựng chuyên nghiệp', 'MVVM, ViewModel, Coroutines, Room Database, Retrofit, Hilt DI, Clean Architecture.', '⭐⭐⭐'),
(4, 'Engineering Level', 'Kỹ năng Engineer', 'Unit/UI Testing, CI/CD, Performance, Security, Deploy Play Store, Phỏng vấn.', '⭐⭐⭐⭐')
ON CONFLICT (number) DO UPDATE SET
  title = EXCLUDED.title, theme = EXCLUDED.theme,
  description = EXCLUDED.description, difficulty = EXCLUDED.difficulty;

-- ─── 7.2 Projects ─────────────────────────────────────────────
INSERT INTO projects (slug, title, week, difficulty, skills, description, sort_order) VALUES
('habit-tracker', 'Habit Tracker', 'Tuần 1-2', '🟢 Beginner', ARRAY['Variables', 'Functions', 'Composable', 'State'], 'App theo dõi thói quen hàng ngày', 1),
('notes-app', 'Notes App', 'Tuần 2-3', '🟡 Intermediate', ARRAY['Navigation', 'Room', 'ViewModel', 'Coroutines'], 'App ghi chú với lưu trữ local database', 2),
('movie-browser', 'Movie Browser', 'Tuần 3', '🟠 Advanced', ARRAY['Retrofit', 'Hilt', 'Flow', 'Repository'], 'Duyệt phim từ TMDB API, cache offline', 3),
('clean-arch-sample', 'Clean Architecture Sample', 'Tuần 3-4', '🔴 Expert', ARRAY['Clean Arch', 'DI', 'Testing', 'CI/CD'], 'Full architecture sample project', 4)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, week = EXCLUDED.week, difficulty = EXCLUDED.difficulty,
  skills = EXCLUDED.skills, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;

-- ─── 7.3 FAQs ─────────────────────────────────────────────────
INSERT INTO faqs (question, answer, sort_order) VALUES
('Tôi cần biết gì trước khi bắt đầu?', 'Bạn chỉ cần biết cơ bản về lập trình (biến, hàm, điều kiện — ngôn ngữ nào cũng được). Nếu chưa biết gì, hãy học cơ bản programming trước 1-2 tuần.', 1),
('Tại sao chọn Kotlin thay vì Java?', 'Kotlin là ngôn ngữ chính thức được Google ưu tiên cho Android từ 2019. Ngắn gọn hơn, an toàn hơn (null safety), và là tương lai của Android development.', 2),
('Học 30 ngày có đủ để đi làm không?', '30 ngày đủ để bạn có nền tảng vững và hiểu cách xây dựng app Android hoàn chỉnh. Để thành thạo và tự tin phỏng vấn, bạn cần thêm 1-2 tháng thực hành và build thêm project riêng.', 3),
('Tôi cần cài đặt những gì?', 'Chỉ cần Android Studio (miễn phí), máy tính có 8GB RAM trở lên, và kết nối internet. Bài 1 sẽ hướng dẫn cài đặt chi tiết.', 4),
('Có cần trả phí gì không?', 'Không. Tất cả nội dung, code, và tài liệu đều miễn phí và mã nguồn mở trên GitHub.', 5),
('Tôi có thể học nhanh hơn/chậm hơn không?', 'Tất nhiên! Lộ trình 30 ngày chỉ là gợi ý. Học theo tốc độ của bạn. Mỗi bài học có duration ước tính nhưng không có áp lực deadline.', 6);

-- ─── 7.4 Checklist Items ──────────────────────────────────────
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

-- ─── 7.5 Lessons (metadata only — content via seed script) ────
INSERT INTO lessons (slug, title, day, week, difficulty, prerequisites, duration, tags, description) VALUES
('kotlin-intro', 'Giới thiệu Kotlin & Cài đặt môi trường', 1, 1, 'beginner', '{}', '40 phút', ARRAY['kotlin', 'setup'], 'Tổng quan về Kotlin, cài đặt Android Studio, tạo project đầu tiên.'),
('kotlin-variables', 'Biến, Kiểu dữ liệu & String templates', 2, 1, 'beginner', '{kotlin-intro}', '45 phút', ARRAY['kotlin', 'variables', 'types'], 'Khai báo biến val/var, kiểu dữ liệu cơ bản, string templates.'),
('kotlin-functions', 'Functions, Lambda & Higher-order functions', 3, 1, 'beginner', '{kotlin-variables}', '50 phút', ARRAY['kotlin', 'functions', 'lambda'], 'Định nghĩa hàm, tham số mặc định, lambda expressions, higher-order functions.'),
('kotlin-control-flow', 'Điều kiện, When expression & Loops', 4, 1, 'beginner', '{kotlin-functions}', '45 phút', ARRAY['kotlin', 'control-flow'], 'if/else, when expression, for, while, do-while loops.'),
('kotlin-oop', 'Lớp, Đối tượng, Kế thừa & Interface', 5, 1, 'intermediate', '{kotlin-control-flow}', '60 phút', ARRAY['kotlin', 'oop'], 'Class, object, inheritance, interface, abstract class, data class, sealed class.'),
('kotlin-collections', 'List, Map, Set & Collection operations', 6, 1, 'intermediate', '{kotlin-oop}', '50 phút', ARRAY['kotlin', 'collections'], 'Các collection cơ bản, operations: filter, map, reduce, sorted.'),
('kotlin-null-safety', 'Null safety, Elvis operator & Extension functions', 7, 1, 'intermediate', '{kotlin-collections}', '45 phút', ARRAY['kotlin', 'null-safety'], 'Nullable types, safe calls, Elvis operator, extension functions.'),
('compose-intro', 'Jetpack Compose là gì? Composable functions', 8, 2, 'intermediate', '{kotlin-null-safety}', '50 phút', ARRAY['compose', 'composable'], 'Giới thiệu Compose, @Composable annotation, Text, Button, Image.'),
('compose-layouts', 'Column, Row, Box, Spacer & Modifier', 9, 2, 'intermediate', '{compose-intro}', '55 phút', ARRAY['compose', 'layouts', 'modifier'], 'Các layout cơ bản, Modifier chain, padding, size, alignment.'),
('compose-state', 'State management: remember, mutableStateOf', 10, 2, 'intermediate', '{compose-layouts}', '50 phút', ARRAY['compose', 'state'], 'State trong Compose, remember, mutableStateOf, state hoisting.'),
('compose-navigation', 'Navigation Component trong Compose', 11, 2, 'advanced', '{compose-state}', '55 phút', ARRAY['compose', 'navigation'], 'NavHost, NavController, navigate, arguments, deep links.'),
('compose-lists', 'LazyColumn, LazyRow & hiệu suất list', 12, 2, 'advanced', '{compose-navigation}', '50 phút', ARRAY['compose', 'lists'], 'LazyColumn, LazyRow, items, keys, performance optimization.'),
('compose-theming', 'Theme, Color, Typography, Dark mode', 13, 2, 'advanced', '{compose-lists}', '50 phút', ARRAY['compose', 'theming'], 'MaterialTheme, custom colors, typography, dark/light mode.'),
('compose-advanced-ui', 'Animations, Custom layouts, Canvas', 14, 2, 'advanced', '{compose-theming}', '60 phút', ARRAY['compose', 'animations'], 'animateAsState, AnimatedVisibility, custom layouts, Canvas.'),
('mvvm-intro', 'MVVM Architecture & Separation of concerns', 15, 3, 'advanced', '{compose-advanced-ui}', '50 phút', ARRAY['architecture', 'mvvm'], 'MVVM pattern, separation of concerns, data flow.'),
('viewmodel-livedata', 'ViewModel, StateFlow, UI state management', 16, 3, 'advanced', '{mvvm-intro}', '55 phút', ARRAY['architecture', 'viewmodel'], 'ViewModel lifecycle, StateFlow, collectAsState, UI state.'),
('coroutines-flow', 'Kotlin Coroutines & Flow cơ bản', 17, 3, 'expert', '{viewmodel-livedata}', '60 phút', ARRAY['kotlin', 'coroutines', 'flow'], 'suspend, launch, async/await, Flow, operators.'),
('room-database', 'Room Database: Entity, DAO, Database', 18, 3, 'expert', '{coroutines-flow}', '55 phút', ARRAY['data', 'room'], 'Room ORM, Entity, DAO, Database, migrations.'),
('retrofit-networking', 'Networking với Retrofit & JSON parsing', 19, 3, 'expert', '{room-database}', '55 phút', ARRAY['networking', 'retrofit'], 'Retrofit setup, API interface, Moshi/Gson, error handling.'),
('hilt-di', 'Dependency Injection với Hilt', 20, 3, 'expert', '{retrofit-networking}', '50 phút', ARRAY['architecture', 'hilt', 'di'], 'Hilt setup, @Inject, @Module, @Provides, scopes.'),
('clean-architecture', 'Clean Architecture: Domain, Data, Presentation', 21, 3, 'expert', '{hilt-di}', '60 phút', ARRAY['architecture', 'clean'], 'Clean Architecture layers, use cases, repository pattern.'),
('testing-unit', 'Unit Testing với JUnit & Mockito', 22, 4, 'expert', '{clean-architecture}', '50 phút', ARRAY['testing', 'junit'], 'JUnit 5, Mockito, test ViewModel, test Repository.'),
('testing-ui', 'UI Testing với Compose Test', 23, 4, 'expert', '{testing-unit}', '50 phút', ARRAY['testing', 'compose-test'], 'ComposeTestRule, onNodeWithText, performClick, assertions.'),
('ci-cd-basics', 'CI/CD cơ bản: GitHub Actions cho Android', 24, 4, 'expert', '{testing-ui}', '45 phút', ARRAY['devops', 'ci-cd'], 'GitHub Actions workflow, build APK, run tests, deploy.'),
('performance', 'Performance: Memory, Layout, Recomposition', 25, 4, 'expert', '{ci-cd-basics}', '50 phút', ARRAY['performance'], 'Memory leaks, Layout Inspector, recomposition optimization.'),
('security-basics', 'Security: ProGuard, Network Security, Data', 26, 4, 'expert', '{performance}', '45 phút', ARRAY['security'], 'R8/ProGuard, network security config, EncryptedSharedPreferences.'),
('play-store-deploy', 'Deploy lên Google Play Store', 27, 4, 'expert', '{security-basics}', '40 phút', ARRAY['deploy', 'play-store'], 'Build AAB, signing, Play Console, store listing.'),
('interview-prep', 'Chuẩn bị phỏng vấn Android Developer', 28, 4, 'expert', '{play-store-deploy}', '50 phút', ARRAY['career', 'interview'], 'Câu hỏi phỏng vấn, portfolio, tips.'),
('portfolio-project', 'Xây dựng Portfolio Project hoàn chỉnh', 29, 4, 'expert', '{interview-prep}', '60 phút', ARRAY['project', 'portfolio'], 'Kết hợp tất cả kiến thức vào 1 project hoàn chỉnh.'),
('next-steps', 'Roadmap tiếp theo: Senior Android Engineer', 30, 4, 'expert', '{portfolio-project}', '30 phút', ARRAY['career'], 'Con đường tiếp theo sau 30 ngày.')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, day = EXCLUDED.day, week = EXCLUDED.week,
  difficulty = EXCLUDED.difficulty, prerequisites = EXCLUDED.prerequisites,
  duration = EXCLUDED.duration, tags = EXCLUDED.tags, description = EXCLUDED.description;


-- ╔══════════════════════════════════════════════════════════════╗
-- ║  ✅ DONE!                                                    ║
-- ║                                                              ║
-- ║  10 tables created with RLS, indexes, triggers               ║
-- ║  Seed data: 30 lessons + 4 weeks + 4 projects +             ║
-- ║             6 FAQs + 33 checklist items                      ║
-- ║                                                              ║
-- ║  Next step: run `npm run seed:content` to add                ║
-- ║  lesson content (MDX), quizzes, and playground snippets      ║
-- ╚══════════════════════════════════════════════════════════════╝
