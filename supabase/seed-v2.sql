-- ═══════════════════════════════════════════════════════════════
-- Seed additional content: weeks, projects, faqs, checklist_items
-- Run this AFTER content-schema-v2.sql
-- Run seed-unlock.sql BEFORE this, seed-lockdown.sql AFTER
-- ═══════════════════════════════════════════════════════════════

-- ─── Weeks ────────────────────────────────────────────────────
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

-- ─── Projects ─────────────────────────────────────────────────
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

-- ─── FAQs ─────────────────────────────────────────────────────
INSERT INTO faqs (question, answer, sort_order) VALUES
('Tôi cần biết gì trước khi bắt đầu?', 'Bạn chỉ cần biết cơ bản về lập trình (biến, hàm, điều kiện — ngôn ngữ nào cũng được). Nếu chưa biết gì, hãy học cơ bản programming trước 1-2 tuần.', 1),
('Tại sao chọn Kotlin thay vì Java?', 'Kotlin là ngôn ngữ chính thức được Google推荐 cho Android từ 2019. Ngắn gọn hơn, an toàn hơn (null safety), và là tương lai của Android development.', 2),
('Học 30 ngày có đủ để đi làm không?', '30 ngày đủ để bạn có nền tảng vững và hiểu cách xây dựng app Android hoàn chỉnh. Để thành thạo và tự tin phỏng vấn, bạn cần thêm 1-2 tháng thực hành và build thêm project riêng.', 3),
('Tôi cần cài đặt những gì?', 'Chỉ cần Android Studio (miễn phí), máy tính có 8GB RAM trở lên, và kết nối internet. Bài 1 sẽ hướng dẫn cài đặt chi tiết.', 4),
('Có cần trả phí gì không?', 'Không. Tất cả nội dung, code, và tài liệu đều miễn phí và mã nguồn mở trên GitHub.', 5),
('Tôi có thể học nhanh hơn/chậm hơn không?', 'Tất nhiên! Lộ trình 30 ngày chỉ là gợi ý. Học theo tốc độ của bạn. Mỗi bài học có duration ước tính nhưng không có áp lực deadline.', 6);

-- ─── Checklist Items ──────────────────────────────────────────
INSERT INTO checklist_items (category, item_text, sort_order) VALUES
-- Kotlin Mastery
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
-- Compose Mastery
('🎨 Compose Mastery', 'Viết @Composable functions', 1),
('🎨 Compose Mastery', 'Sử dụng Column, Row, Box, Spacer', 2),
('🎨 Compose Mastery', 'Hiểu Modifier chain và thứ tự', 3),
('🎨 Compose Mastery', 'Quản lý state: remember, mutableStateOf', 4),
('🎨 Compose Mastery', 'State hoisting pattern', 5),
('🎨 Compose Mastery', 'Sử dụng LazyColumn/LazyRow', 6),
('🎨 Compose Mastery', 'Navigation với NavHost', 7),
('🎨 Compose Mastery', 'Custom theming: Color, Typography', 8),
-- Architecture
('🏗️ Architecture', 'Hiểu MVVM pattern', 1),
('🏗️ Architecture', 'Tách biệt UI, Domain, Data layers', 2),
('🏗️ Architecture', 'Sử dụng ViewModel + StateFlow', 3),
('🏗️ Architecture', 'Repository pattern', 4),
('🏗️ Architecture', 'Dependency Injection cơ bản với Hilt', 5),
-- General Interview Prep
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
