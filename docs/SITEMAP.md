# 🗺️ Sitemap đầy đủ — android-zero-to-hero

## Tổng quan

```
Tổng số trang: ~50 trang
├── Static pages: 7
├── Lesson pages: 30 (dynamic route)
├── Project pages: 4 (dynamic route)
├── Resource pages: 4
└── Checklist pages: 4
```

---

## Sitemap chi tiết

### 🏠 Trang tĩnh

| Route | Page | Mô tả | Priority |
|-------|------|--------|----------|
| `/` | Home | Landing page chính | 1.0 |
| `/roadmap` | Roadmap Overview | Tổng quan lộ trình 30 ngày | 0.9 |
| `/projects` | Projects List | Danh sách project thực hành | 0.8 |
| `/resources` | Resources Hub | Tài liệu tham khảo | 0.7 |
| `/checklist` | Checklist Hub | Checklist phỏng vấn | 0.7 |
| `/search` | Search | Tìm kiếm nội dung | 0.5 |
| `/blog` | Blog | (Mở rộng sau) | 0.5 |

---

### 📅 Roadmap — Theo tuần

| Route | Title | Nội dung |
|-------|-------|----------|
| `/roadmap/week-1` | Tuần 1: Kotlin Fundamentals | Tổng quan 7 ngày Kotlin |
| `/roadmap/week-2` | Tuần 2: Jetpack Compose Basics | Tổng quan 7 ngày Compose |
| `/roadmap/week-3` | Tuần 3: Architecture & Data | Tổng quan MVVM, Room, Retrofit |
| `/roadmap/week-4` | Tuần 4: Engineering Level | Tổng quan Testing, CI/CD, Deploy |

---

### 📚 Lessons — 30 bài học (`/learn/[slug]`)

#### Tuần 1: Kotlin Fundamentals (Day 1–7)

| Day | Route (`/learn/...`) | Title | Duration | Difficulty |
|-----|---------------------|-------|----------|------------|
| 1 | `kotlin-intro` | Giới thiệu Kotlin & Cài đặt môi trường | 40 min | ⭐ |
| 2 | `kotlin-variables` | Biến, Kiểu dữ liệu & String templates | 45 min | ⭐ |
| 3 | `kotlin-functions` | Functions, Lambda & Higher-order functions | 50 min | ⭐ |
| 4 | `kotlin-control-flow` | Điều kiện, When expression & Loops | 45 min | ⭐ |
| 5 | `kotlin-oop` | Lớp, Đối tượng, Kế thừa & Interface | 60 min | ⭐⭐ |
| 6 | `kotlin-collections` | List, Map, Set & Collection operations | 50 min | ⭐⭐ |
| 7 | `kotlin-null-safety` | Null safety, Elvis operator & Extension functions | 45 min | ⭐⭐ |

#### Tuần 2: Jetpack Compose Basics (Day 8–14)

| Day | Route | Title | Duration | Difficulty |
|-----|-------|-------|----------|------------|
| 8 | `compose-intro` | Jetpack Compose là gì? Composable functions | 50 min | ⭐⭐ |
| 9 | `compose-layouts` | Column, Row, Box, Spacer & Modifier | 55 min | ⭐⭐ |
| 10 | `compose-state` | State management: remember, mutableStateOf | 50 min | ⭐⭐ |
| 11 | `compose-navigation` | Navigation Component trong Compose | 55 min | ⭐⭐⭐ |
| 12 | `compose-lists` | LazyColumn, LazyRow & hiệu suất list | 50 min | ⭐⭐⭐ |
| 13 | `compose-theming` | Theme, Color, Typography, Dark mode | 50 min | ⭐⭐⭐ |
| 14 | `compose-advanced-ui` | Animations, Custom layouts, Canvas | 60 min | ⭐⭐⭐ |

#### Tuần 3: Architecture & Data (Day 15–21)

| Day | Route | Title | Duration | Difficulty |
|-----|-------|-------|----------|------------|
| 15 | `mvvm-intro` | MVVM Architecture & Separation of concerns | 50 min | ⭐⭐⭐ |
| 16 | `viewmodel-livedata` | ViewModel, StateFlow, UI state management | 55 min | ⭐⭐⭐ |
| 17 | `coroutines-flow` | Kotlin Coroutines & Flow cơ bản | 60 min | ⭐⭐⭐⭐ |
| 18 | `room-database` | Room Database: Entity, DAO, Database | 55 min | ⭐⭐⭐⭐ |
| 19 | `retrofit-networking` | Networking với Retrofit & JSON parsing | 55 min | ⭐⭐⭐⭐ |
| 20 | `hilt-di` | Dependency Injection với Hilt | 50 min | ⭐⭐⭐⭐ |
| 21 | `clean-architecture` | Clean Architecture: Domain, Data, Presentation | 60 min | ⭐⭐⭐⭐ |

#### Tuần 4: Engineering Level (Day 22–28)

| Day | Route | Title | Duration | Difficulty |
|-----|-------|-------|----------|------------|
| 22 | `testing-unit` | Unit Testing với JUnit & Mockito | 50 min | ⭐⭐⭐⭐ |
| 23 | `testing-ui` | UI Testing với Compose Test | 50 min | ⭐⭐⭐⭐ |
| 24 | `ci-cd-basics` | CI/CD cơ bản: GitHub Actions cho Android | 45 min | ⭐⭐⭐⭐⭐ |
| 25 | `performance` | Performance: Memory, Layout, Recomposition | 50 min | ⭐⭐⭐⭐⭐ |
| 26 | `security-basics` | Security: ProGuard, Network Security, Data | 45 min | ⭐⭐⭐⭐⭐ |
| 27 | `play-store-deploy` | Deploy lên Google Play Store | 40 min | ⭐⭐⭐⭐⭐ |
| 28 | `interview-prep` | Chuẩn bị phỏng vấn Android Developer | 50 min | ⭐⭐⭐⭐⭐ |

#### Tổng kết (Day 29–30)

| Day | Route | Title | Duration | Difficulty |
|-----|-------|-------|----------|------------|
| 29 | `portfolio-project` | Xây dựng Portfolio Project hoàn chỉnh | 60 min | ⭐⭐⭐⭐⭐ |
| 30 | `next-steps` | Roadmap tiếp theo: Senior Android Engineer | 30 min | ⭐⭐⭐⭐⭐ |

---

### 🛠️ Projects (`/projects/[slug]`)

| Route | Title | Week | Skills | Description |
|-------|-------|------|--------|-------------|
| `habit-tracker` | Habit Tracker App | 1–2 | Kotlin, Compose basics | App theo dõi thói quen hàng ngày |
| `notes-app` | Notes App | 2–3 | Compose, Room, MVVM | App ghi chú với lưu trữ local |
| `movie-browser` | Movie Browser | 3 | Retrofit, Coroutines, Clean Arch | App duyệt phim từ TMDB API |
| `clean-arch-sample` | Clean Architecture Sample | 3–4 | Hilt, Testing, Full stack | Ứng dụng mẫu với kiến trúc sạch |

---

### 📖 Resources (`/resources/...`)

| Route | Title | Content |
|-------|-------|---------|
| `android-docs` | Android Official Docs | Links + tóm tắt tài liệu chính thức |
| `kotlin-docs` | Kotlin Official Docs | Links + tóm tắt ngôn ngữ Kotlin |
| `tools-setup` | Development Tools Setup | Android Studio, SDK, Emulator guide |
| `community` | Community & Support | Discord, Stack Overflow, Reddit, Blogs |

---

### ✅ Checklist (`/checklist/...`)

| Route | Title | Items |
|-------|-------|-------|
| `kotlin-checklist` | Kotlin Mastery Checklist | 15 items |
| `compose-checklist` | Compose Mastery Checklist | 12 items |
| `architecture-checklist` | Architecture Checklist | 10 items |
| `general-checklist` | Interview Prep Checklist | 20 items |

---

## Navigation Structure (Menu)

```
Header:
├── Trang chủ (/)
├── Lộ trình (/roadmap)
│   ├── Tuần 1: Kotlin (/roadmap/week-1)
│   ├── Tuần 2: Compose (/roadmap/week-2)
│   ├── Tuần 3: Architecture (/roadmap/week-3)
│   └── Tuần 4: Engineering (/roadmap/week-4)
├── Dự án (/projects)
├── Tài liệu (/resources)
└── Checklist (/checklist)

Footer:
├── Về chúng tôi
├── Lộ trình
├── Dự án
├── Tài liệu
├── Checklist
├── GitHub
└── Newsletter signup
```

---

## Breadcrumb Pattern

```
/learn/kotlin-basics
  Trang chủ > Lộ trình > Tuần 1 > Bài 1: Giới thiệu Kotlin

/learn/coroutines-flow
  Trang chủ > Lộ trình > Tuần 3 > Bài 17: Coroutines & Flow

/projects/movie-browser
  Trang chủ > Dự án > Movie Browser
```

---

## SEO Metadata per Page Type

### Landing page (/)
```yaml
title: "Android từ số 0 đến Engineering trong 1 tháng"
description: "Lộ trình học Android Development 30 ngày với Kotlin & Jetpack Compose. Từ người mới bắt đầu đến Junior Android Developer."
ogImage: "/images/og/home.png"
```

### Lesson page (/learn/[slug])
```yaml
title: "{lesson.title} — Day {lesson.day}/30"
description: "{lesson.description}"
ogImage: "/images/og/lesson-{slug}.png"
keywords: ["android", "kotlin", {lesson.tags}]
```

### Roadmap week (/roadmap/week-[n])
```yaml
title: "Tuần {n}: {week.title} — Android Roadmap"
description: "Chi tiết lộ trình tuần {n}: {week.description}"
ogImage: "/images/og/week-{n}.png"
```

---

## Sitemap.xml Auto-generation

Next.js sẽ tự动生成 sitemap.xml qua `next-sitemap` hoặc custom `app/sitemap.ts`:

```typescript
// src/app/sitemap.ts
import { allLessons } from '@/lib/curriculum'

export default function sitemap() {
  const baseUrl = 'https://android-zero-to-hero.vercel.app'

  // Static pages
  const staticPages = ['', '/roadmap', '/projects', '/resources', '/checklist']
    .map(route => ({ url: `${baseUrl}${route}`, lastModified: new Date() }))

  // Lesson pages
  const lessonPages = allLessons.map(lesson => ({
    url: `${baseUrl}/learn/${lesson.slug}`,
    lastModified: new Date(),
  }))

  return [...staticPages, ...lessonPages]
}
```
