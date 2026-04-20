# 🏠 Landing Page Structure & Section Content

## Trang: `/` (Home)

### Mục tiêu
- Chuyển đổi visitor → bắt đầu học (CTA: "Bắt đầu học ngay")
- Truyền đạt giá trị: 30 ngày, có cấu trúc, miễn phí
- Xây dựng niềm tin: roadmap rõ ràng, bài học chi tiết

---

## Sections (theo thứ tự từ trên xuống)

---

### Section 1: Hero 🚀
**File:** `src/components/landing/HeroSection.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🤖 Android Zero to Hero                                        │
│                                                                 │
│  Từ số 0 đến Android Engineer                                   │
│  trong 30 ngày                                                  │
│                                                                 │
│  Lộ trình học có cấu trúc với Kotlin & Jetpack Compose.        │
│  Mỗi ngày 1 bài học — miễn phí, mã nguồn mở.                   │
│                                                                 │
│  [ 🚀 Bắt đầu học ngay ]    [ 📋 Xem lộ trình ]                │
│                                                                 │
│  ✅ Miễn phí 100%    ✅ Mã nguồn mở    ✅ Cập nhật 2026        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Content:**
- **Badge:** "🎯 Lộ trình 30 ngày • Kotlin + Jetpack Compose"
- **Headline:** "Từ số 0 đến Android Engineer trong 30 ngày"
- **Subheadline:** "Lộ trình học có cấu trúc, bài học chi tiết mỗi ngày, project thực tế. Học Kotlin, Jetpack Compose, MVVM, và các kỹ năng cần thiết để trở thành Junior Android Developer."
- **Primary CTA:** "🚀 Bắt đầu học ngay" → `/learn/kotlin-intro`
- **Secondary CTA:** "📋 Xem lộ trình" → `/roadmap`
- **Trust signals:** "✅ Miễn phí 100% • ✅ Mã nguồn mở • ✅ Cập nhật 2026"
- **Visual:** Illustration Android mascot hoặc code snippet preview

---

### Section 2: Stats Bar 📊
**File:** `src/components/landing/FeatureGrid.tsx` (variant: stats)

```
┌─────────────────────────────────────────────────────────────┐
│  30 bài học    │    4 tuần     │    4 dự án    │   100% Free │
│  Lý thuyết +   │  Từ cơ bản   │  Thực hành    │  Mã nguồn   │
│  Ví dụ code    │  đến nâng cao │  thực tế      │  mở GitHub  │
└─────────────────────────────────────────────────────────────┘
```

**Content:**
| Stat | Value | Description |
|------|-------|-------------|
| 📚 | 30 bài học | Lý thuyết + ví dụ code chi tiết |
| 📅 | 4 tuần | Từ Kotlin đến Engineering level |
| 🛠️ | 4 dự án | Project thực tế hands-on |
| 💰 | 100% Free | Mã nguồn mở trên GitHub |

---

### Section 3: Roadmap Preview 🗺️
**File:** `src/components/landing/RoadmapPreview.tsx`

```
┌─────────────────────────────────────────────────────────────┐
│  🗺️ Lộ trình 30 ngày                                        │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐                        │
│  │ Tuần 1       │ →  │ Tuần 2       │                        │
│  │ Kotlin       │    │ Jetpack      │                        │
│  │ Fundamentals │    │ Compose      │                        │
│  └──────────────┘    └──────────────┘                        │
│         ↓                   ↓                                │
│  ┌──────────────┐    ┌──────────────┐                        │
│  │ Tuần 3       │ →  │ Tuần 4       │                        │
│  │ Architecture │    │ Engineering  │                        │
│  │ & Data       │    │ Level        │                        │
│  └──────────────┘    └──────────────┘                        │
│                                                              │
│  [ Xem chi tiết lộ trình → ]                                │
└─────────────────────────────────────────────────────────────┘
```

**Content cho từng tuần:**

**Tuần 1: Kotlin Fundamentals ⭐**
- "Bắt đầu từ cài đặt môi trường, học cú pháp Kotlin cơ bản: biến, hàm, điều kiện, OOP, Collections, Null safety."
- Topics: "7 bài học • 45-60 phút/bài"
- CTA: "/roadmap/week-1"

**Tuần 2: Jetpack Compose Basics ⭐⭐**
- "Làm chủ UI hiện đại với Compose: Composable functions, Layouts, State, Navigation, Lists, Theming, Animations."
- Topics: "7 bài học • 50-60 phút/bài"
- CTA: "/roadmap/week-2"

**Tuần 3: Architecture & Data ⭐⭐⭐**
- "Xây dựng app chuyên nghiệp: MVVM, ViewModel, Coroutines, Room Database, Retrofit, Hilt DI, Clean Architecture."
- Topics: "7 bài học • 50-60 phút/bài"
- CTA: "/roadmap/week-3"

**Tuần 4: Engineering Level ⭐⭐⭐⭐**
- "Kỹ năng Engineer thực thụ: Unit/UI Testing, CI/CD, Performance, Security, Deploy Play Store, Phỏng vấn."
- Topics: "7 bài học • 40-60 phút/bài"
- CTA: "/roadmap/week-4"

---

### Section 4: What You'll Learn 🎯
**File:** `src/components/landing/FeatureGrid.tsx`

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 Bạn sẽ học được gì?                                     │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐                    │
│  │ 🧑‍💻 Kotlin       │  │ 🎨 Jetpack      │                    │
│  │ Ngôn ngữ chính  │  │ Compose         │                    │
│  │ cho Android     │  │ UI framework    │                    │
│  │ hiện đại        │  │ hiện đại nhất   │                    │
│  └─────────────────┘  └─────────────────┘                    │
│  ┌─────────────────┐  ┌─────────────────┐                    │
│  │ 🏗️ Architecture │  │ 🧪 Testing      │                    │
│  │ MVVM, Clean     │  │ Unit Test,      │                    │
│  │ Architecture,   │  │ UI Test,        │                    │
│  │ DI với Hilt     │  │ CI/CD Pipeline  │                    │
│  └─────────────────┘  └─────────────────┘                    │
│  ┌─────────────────┐  ┌─────────────────┐                    │
│  │ 📡 Networking   │  │ 🚀 Deployment   │                    │
│  │ Retrofit,       │  │ Play Store,     │                    │
│  │ Coroutines,     │  │ ProGuard,       │                    │
│  │ REST API        │  │ App Signing     │                    │
│  └─────────────────┘  └─────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

**Content:**
6 cards, mỗi card:
1. **🧑‍💻 Kotlin** — "Ngôn ngữ chính thức cho Android. Học từ cú pháp cơ bản đến OOP, Null safety, Extension functions."
2. **🎨 Jetpack Compose** — "UI toolkit hiện đại thay thế XML. Declarative UI, State management, Animations."
3. **🏗️ Architecture** — "MVVM, Clean Architecture, Repository pattern, Dependency Injection với Hilt."
4. **🧪 Testing** — "Unit Test, UI Test, Integration Test. CI/CD với GitHub Actions."
5. **📡 Networking** — "Retrofit, OkHttp, Coroutines, Flow. Fetch, parse, cache dữ liệu từ REST API."
6. **🚀 Deployment** — "Build, sign, optimize APK/AAB. Deploy lên Google Play Store."

---

### Section 5: Daily Structure 📅
**File:** `src/components/landing/FeatureGrid.tsx` (variant: timeline)

```
┌─────────────────────────────────────────────────────────────┐
│  📅 Cấu trúc mỗi ngày                                        │
│                                                              │
│  📖 Lý thuyết    →  💻 Ví dụ code    →  🏗️ Case study      │
│  Giải thích       Code snippet         Phân tích app        │
│  khái niệm        có comment           thực tế              │
│                                                              │
│  Học theo tốc độ của bạn. Không áp lực. Không deadline.     │
└─────────────────────────────────────────────────────────────┘
```

**Content:**
- "Mỗi bài học được chia thành 3 phần rõ ràng:"
- **📖 Lý thuyết** — "Giải thích concept từ cơ bản đến nâng cao. Tại sao cần biết? Khi nào dùng?"
- **💻 Ví dụ code** — "Code snippet có comment từng dòng. Copy-paste chạy được."
- **🏗️ Case study** — "Phân tích cách dùng trong app thực tế. Kết nối lý thuyết với thực hành."
- Tagline: "Học theo tốc độ của bạn. Không áp lực. Không deadline."

---

### Section 6: Sample Lesson Preview 📝
**File:** `src/components/landing/LessonPreview.tsx`

```
┌─────────────────────────────────────────────────────────────┐
│  📝 Preview bài học                                          │
│                                                              │
│  ┌─── Code Preview ────────────────────────────────┐         │
│  │ fun main() {                                     │         │
│  │     val name = "Android"                         │         │
│  │     val version = 15                             │         │
│  │                                                   │         │
│  │     // String template                            │         │
│  │     println("Hello, $name!")                     │         │
│  │     println("Version: $version")                 │         │
│  │ }                                               │         │
│  └─────────────────────────────────────────────────┘         │
│                                                              │
│  💡 "Kotlin sử dụng val cho immutable và var cho mutable."  │
│                                                              │
│  [ Đọc bài học đầy đủ → ]                                   │
└─────────────────────────────────────────────────────────────┘
```

**Content:**
- Hiển thị code snippet preview (syntax highlighted)
- Một Callout tip nổi bật
- CTA: "Đọc bài học đầy đủ" → /learn/kotlin-variables

---

### Section 7: Projects Preview 🛠️
**File:** `src/components/landing/FeatureGrid.tsx` (variant: projects)

```
┌─────────────────────────────────────────────────────────────┐
│  🛠️ Dự án thực hành                                          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Habit    │  │ Notes    │  │ Movie    │  │ Clean    │    │
│  │ Tracker  │  │ App      │  │ Browser  │  │ Arch     │    │
│  │          │  │          │  │          │  │ Sample   │    │
│  │ Tuần 1-2 │  │ Tuần 2-3 │  │ Tuần 3   │  │ Tuần 3-4 │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                              │
│  [ Xem tất cả dự án → ]                                     │
└─────────────────────────────────────────────────────────────┘
```

**Content cho 4 project cards:**

1. **Habit Tracker** 🟢 Beginner
   - "App theo dõi thói quen hàng ngày"
   - "Tuần 1-2 • Kotlin basics + Compose UI"
   - Skills: Variables, Functions, Composable, State

2. **Notes App** 🟡 Intermediate
   - "App ghi chú với lưu trữ local database"
   - "Tuần 2-3 • Compose + Room + MVVM"
   - Skills: Navigation, Room, ViewModel, Coroutines

3. **Movie Browser** 🟠 Advanced
   - "Duyệt phim từ TMDB API, cache offline"
   - "Tuần 3 • Retrofit + Clean Architecture"
   - Skills: Networking, Hilt, Flow, Repository

4. **Clean Architecture Sample** 🔴 Professional
   - "Ứng dụng mẫu với kiến trúc sạch hoàn chỉnh"
   - "Tuần 3-4 • Full stack + Testing"
   - Skills: DI, Testing, CI/CD, Performance

---

### Section 8: FAQ ❓
**File:** `src/components/landing/FAQSection.tsx`

```
┌─────────────────────────────────────────────────────────────┐
│  ❓ Câu hỏi thường gặp                                       │
│                                                              │
│  ▶ Tôi cần biết gì trước khi bắt đầu?                       │
│  ▶ Tại sao chọn Kotlin thay vì Java?                        │
│  ▶ Học 30 ngày có đủ để đi làm không?                       │
│  ▶ Tôi cần cài đặt những gì?                                │
│  ▶ Có cần trả phí gì không?                                 │
│  ▶ Tôi có thể học nhanh hơn/slow hơn không?                  │
└─────────────────────────────────────────────────────────────────┘
```

**FAQ Content:**

**Q: Tôi cần biết gì trước khi bắt đầu?**
A: Bạn chỉ cần biết cơ bản về lập trình (biến, hàm, điều kiện — ngôn ngữ nào cũng được). Nếu chưa biết gì, hãy học cơ bản programming trước 1-2 tuần.

**Q: Tại sao chọn Kotlin thay vì Java?**
A: Kotlin là ngôn ngữ chính thức được Google推荐 cho Android từ 2019. Ngắn gọn hơn, an toàn hơn (null safety), và là tương lai của Android development.

**Q: Học 30 ngày có đủ để đi làm không?**
A: 30 ngày đủ để bạn có nền tảng vững và hiểu cách xây dựng app Android hoàn chỉnh. Để thành thạo và tự tin phỏng vấn, bạn cần thêm 1-2 tháng thực hành và build thêm project riêng.

**Q: Tôi cần cài đặt những gì?**
A: Chỉ cần Android Studio (miễn phí), máy tính có 8GB RAM trở lên, và kết nối internet. Bài 1 sẽ hướng dẫn cài đặt chi tiết.

**Q: Có cần trả phí gì không?**
A: Không. Tất cả nội dung, code, và tài liệu đều miễn phí và mã nguồn mở trên GitHub.

**Q: Tôi có thể học nhanh hơn/chậm hơn không?**
A: Tất nhiên! Lộ trình 30 ngày chỉ là gợi ý. Học theo tốc độ của bạn. Mỗi bài học có duration ước tính nhưng không có áp lực deadline.

---

### Section 9: CTA Banner 🎯
**File:** `src/components/landing/CTASection.tsx`

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  🚀 Sẵn sàng trở thành Android Engineer?                    │
│                                                              │
│  Bắt đầu ngay với bài học đầu tiên — hoàn toàn miễn phí.   │
│                                                              │
│  [ 🎯 Bắt đầu Day 1: Giới thiệu Kotlin ]                   │
│                                                              │
│  ⭐ Star on GitHub  •  📧 Subscribe Newsletter              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Content:**
- Headline: "🚀 Sẵn sàng trở thành Android Engineer?"
- Subheadline: "Bắt đầu ngay với bài học đầu tiên — hoàn toàn miễn phí. Mã nguồn mở trên GitHub."
- Primary CTA: "🎯 Bắt đầu Day 1: Giới thiệu Kotlin" → /learn/kotlin-intro
- Secondary: "⭐ Star on GitHub" + "📧 Subscribe Newsletter"

---

### Section 10: Newsletter 📧
**File:** `src/components/landing/NewsletterForm.tsx`

```
┌─────────────────────────────────────────────────────────────┐
│  📧 Nhận cập nhật bài học mới                                │
│                                                              │
│  [email@example.com          ] [ Đăng ký ]                  │
│                                                              │
│  Không spam. Chỉ gửi khi có bài học mới hoặc cập nhật quan  │
│  trọng. Hủy đăng ký bất cứ lúc nào.                         │
└─────────────────────────────────────────────────────────────┘
```

**Content:**
- Headline: "📧 Nhận cập nhật bài học mới"
- Input: email field
- CTA: "Đăng ký"
- Privacy: "Không spam. Chỉ gửi khi có bài học mới hoặc cập nhật quan trọng. Hủy đăng ký bất cứ lúc nào."
- Tech: Resend hoặc Formspree

---

### Section 11: Footer 🦶
**File:** `src/components/layout/Footer.tsx`

```
┌─────────────────────────────────────────────────────────────┐
│  Android Zero to Hero                                        │
│  Lộ trình học Android Development 30 ngày                   │
│                                                              │
│  Lộ trình        Dự án        Tài liệu       Checklist     │
│  ├ Tuần 1       Habit Tracker  Android Docs   Kotlin       │
│  ├ Tuần 2       Notes App      Kotlin Docs    Compose      │
│  ├ Tuần 3       Movie Browser  Tools Setup    Architecture │
│  └ Tuần 4       Clean Arch     Community      General      │
│                                                              │
│  © 2026 Android Zero to Hero. MIT License.                  │
│  Made with ❤️ by Penguin                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Page Performance Targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTFB (Time to First Byte) | < 600ms |
| Page size (initial load) | < 200KB |

## SEO Checklist

- [ ] Title tag unique per page
- [ ] Meta description < 160 chars
- [ ] OG image per page (1200x630)
- [ ] Structured data (JSON-LD for Course, Article)
- [ ] Canonical URL
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Semantic HTML (h1, h2, h3 hierarchy)
- [ ] Alt text for all images
- [ ] Internal linking giữa các bài học
