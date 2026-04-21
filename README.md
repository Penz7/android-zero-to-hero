<div align="center">
  <img src="https://raw.githubusercontent.com/Penz7/android-zero-to-hero/main/public/android-chapter/chapter-05-jetpack-compose-01.svg" alt="Android Zero to Hero" width="400"/>

  <h1>🤖 Android Zero to Hero</h1>
  <p><strong>Học Android Engineering từ con số 0 đến chuyên nghiệp trong 30 ngày</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&logoColor=white)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![Supabase](https://img.shields.io/badge/Supabase-Auth+%20RLS-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  <p>
    <a href="https://penz7.github.io/android-zero-to-hero/">🌐 Live Demo</a> ·
    <a href="#-roadmap-chi-tiết">📚 Roadmap</a> ·
    <a href="#-contributing">🤝 Contributing</a> ·
    <a href="#-local-development">⚙️ Setup</a>
  </p>
</div>

---

## 📖 Giới thiệu

**Android Zero to Hero** là nền tảng học Android development miễn phí, được thiết kế dưới dạng **roadmap 30 bài học** có cấu trúc rõ ràng — từ Kotlin cơ bản, Jetpack Compose, Architecture patterns, Testing, đến Deploy lên Google Play.

### ✨ Điểm nổi bật

| Tính năng | Mô tả |
|-----------|--------|
| 📚 **30 bài học** | Từ Kotlin basics → Clean Architecture, có code examples chạy được |
| 🧩 **Interactive Playground** | Chạy Kotlin code ngay trên browser, không cần cài đặt |
| 📝 **Quiz trắc nghiệm** | Kiểm tra kiến thức ngay sau mỗi bài, có giải thích đáp án |
| 📋 **Interview Checklist** | Danh sách kiến thức cần chuẩn bị cho phỏng vấn Android |
| 🔍 **Full-text Search** | Tìm kiếm nhanh toàn bộ nội dung bài học |
| 💾 **Tiến trình học** | Đồng bộ tiến độ học qua Supabase (GitHub Login) |
| 🗺️ **Roadmap 30 tuần** | Lịch trình học chi tiết theo từng tuần |
| 🎨 **Dark/Light Mode** | Giao diện thân thiện, hỗ trợ cả 2 chế độ |
| 📱 **Responsive** | Học trên mọi thiết bị — mobile, tablet, desktop |
| 🛡️ **Admin Panel** | Quản lý nội dung bài học, quiz, projects |

---

## 🗂️ Cấu trúc bài học

### 📗 Phase 1: Kotlin Foundations (Bài 1–7)

| # | Bài học | Nội dung chính |
|---|---------|----------------|
| 01 | Kotlin Introduction | Tổng quan ngôn ngữ, môi trường setup |
| 02 | Variables & Data Types | val, var, types, string templates |
| 03 | Functions | Lambda, higher-order functions, extension functions |
| 04 | Control Flow | if/when, loops, exception handling |
| 05 | OOP in Kotlin | Class, inheritance, interface, sealed class |
| 06 | Collections | List, Set, Map, sequences, collection operations |
| 07 | Null Safety | Nullable types, safe calls, Elvis operator |

### 📘 Phase 2: Jetpack Compose (Bài 8–14)

| # | Bài học | Nội dung chính |
|---|---------|----------------|
| 08 | Compose Introduction | So sánh XML vs Compose, setup project |
| 09 | Layouts | Column, Row, Box, ConstraintLayout |
| 10 | State Management | remember, mutableStateOf, state hoisting |
| 11 | Navigation | NavHost, arguments, deep links |
| 12 | Lists & LazyColumn | LazyColumn, LazyGrid, performance optimization |
| 13 | Theming | Material 3, custom theme, typography |
| 14 | Advanced UI | Animations, custom components, Canvas |

### 📙 Phase 3: Architecture & Data (Bài 15–21)

| # | Bài học | Nội dung chính |
|---|---------|----------------|
| 15 | MVVM Pattern | Model-View-ViewModel, separation of concerns |
| 16 | ViewModel & LiveData | Lifecycle-aware components, data flow |
| 17 | Coroutines & Flow | Async programming, StateFlow, SharedFlow |
| 18 | Room Database | Local database, entities, DAO, migrations |
| 19 | Retrofit & Networking | REST API, OkHttp, JSON parsing |
| 20 | Hilt & DI | Dependency injection, scopes, modules |
| 21 | Clean Architecture | Layers, use cases, repository pattern |

### 📕 Phase 4: Testing & Deployment (Bài 22–30)

| # | Bài học | Nội dung chính |
|---|---------|----------------|
| 22 | Unit Testing | JUnit, Mockito, test-driven development |
| 23 | UI Testing | Compose testing, Espresso, test rules |
| 24 | CI/CD Basics | GitHub Actions, automated builds |
| 25 | Performance | Profiling, memory leaks, optimization |
| 26 | Security Basics | Encrypted storage, certificate pinning |
| 27 | Play Store Deploy | Signing, AAB, release management |
| 28 | Interview Prep | Câu hỏi phỏng vấn, tips, mock interview |
| 29 | Portfolio Project | Dự án thực tế để showcase |
| 30 | Next Steps | Lộ trình nâng cao, cộng đồng, tài nguyên |

---

## ⚙️ Local Development

### Yêu cầu

- **Node.js** ≥ 18.17
- **pnpm** ≥ 8.x (recommended) hoặc npm/yarn
- **Supabase Account** (cho authentication)

### Cài đặt

```bash
# Clone repository
git clone https://github.com/Penz7/android-zero-to-hero.git
cd android-zero-to-hero

# Cài đặt dependencies
pnpm install

# Tạo file environment variables
cp .env.example .env.local
```

### Cấu hình Environment Variables

Điền vào `.env.local`:

```env
# Supabase (bắt buộc cho login)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# GitHub Admin IDs (comma-separated, optional)
NEXT_PUBLIC_ADMIN_GITHUB_IDS=your-github-user-id
```

> 💡 **Supabase setup:** Tạo project mới → Authentication → Providers → bật GitHub OAuth. Redirect URL: `http://localhost:3000/auth/callback`

### Chạy development server

```bash
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) trên browser.

### Build production

```bash
pnpm build
pnpm start
```

---

## 🏗️ Architecture

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (SupabaseProvider, Header)
│   ├── page.tsx                # Homepage
│   ├── learn/[slug]/           # Lesson pages (MDX + Quiz + Playground)
│   ├── roadmap/                # Roadmap overview + weekly detail
│   ├── projects/               # Practice projects
│   ├── resources/              # Learning resources
│   ├── checklist/              # Interview checklist
│   ├── search/                 # Full-text search (Pagefind)
│   └── admin/                  # Admin panel (QL bài học, quiz, projects)
├── components/                 # Reusable UI components
│   ├── ui/                     # shadcn/ui primitives
│   ├── Header.tsx              # Navigation header
│   ├── Quiz.tsx                # Interactive quiz component
│   ├── PlaygroundClient.tsx    # Kotlin code playground
│   └── ProgressTracker.tsx     # Learning progress
├── lib/                        # Core logic
│   ├── supabase/               # Auth, data, sync
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   ├── auth-context.tsx    # Auth provider
│   │   ├── data.ts             # CRUD operations
│   │   └── sync.ts             # Progress sync engine
│   └── search-index.ts         # Pagefind integration
├── content/
│   ├── lessons/                # 30 MDX lesson files
│   ├── projects/               # Practice project configs
│   └── faqs/                   # FAQ entries
scripts/
├── seed-content.ts             # Seed Supabase DB
├── build-search-index.ts       # Build Pagefind index
├── generate-lesson-images.ts   # Generate OG images
└── strip-layers.js             # Tailwind CSS fix
docs/
└── ARCHITECTURE.md             # Technical architecture doc
```

### Tech Stack

| Layer | Technology | Vai trò |
|-------|-----------|---------|
| **Framework** | Next.js 16.2 (App Router) | SSR/SSG framework |
| **Language** | TypeScript 5.x | Type-safe development |
| **Styling** | Tailwind CSS 4.x | Utility-first CSS |
| **UI Components** | Radix UI + shadcn/ui | Accessible primitives |
| **Content** | MDX (next-mdx-remote) | Markdown + JSX lesson content |
| **Syntax Highlight** | Prism.js | Code highlighting |
| **Search** | Pagefind | Static full-text search |
| **Auth** | Supabase Auth (GitHub OAuth) | User authentication |
| **Database** | Supabase (PostgreSQL) | Progress storage, RLS |
| **Deployment** | GitHub Pages | Static hosting |

---

## 🔐 Authentication & Progress Sync

### Luồng hoạt động

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Browser    │────▶│  Supabase   │────▶│  GitHub     │
│  (Guest)    │     │  Auth       │     │  OAuth      │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│ localStorage│◀───▶│  PostgreSQL │
│  (offline)  │     │  (cloud)    │
└─────────────┘     └─────────────┘
```

- **Offline-first:** Tiến trình lưu vào `localStorage` trước, hoạt động ngay cả khi chưa login
- **GitHub Login:** Đăng nhập qua GitHub OAuth → đồng bộ lên Supabase
- **Two-way sync:** Đăng nhập lần đầu merge dữ liệu cloud + local. Các lần sau sync 2 chiều
- **RLS Security:** Row-Level Security đảm bảo mỗi user chỉ truy cập dữ liệu của mình

### Row-Level Security

```sql
-- Users chỉ đọc/sửa dữ liệu của mình
CREATE POLICY "Users read own progress"
  ON quiz_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users upsert own progress"
  ON quiz_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 🧩 Interactive Playground

Chạy Kotlin code ngay trên browser sử dụng [JetBrains Kotlin Compiler API](https://kotlinlang.org/docs/compiler-reference.html):

```
┌─────────────────────────────────┐
│  📝 Code Editor (CodeMirror 6)  │
│  ┌───────────────────────────┐  │
│  │ fun main() {             │  │
│  │   println("Hello!")      │  │
│  │ }                        │  │
│  └───────────────────────────┘  │
│  [ ▶ Run Code ]                 │
│  ┌───────────────────────────┐  │
│  │ 📤 Output:               │  │
│  │ Hello!                   │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

- **CodeMirror 6** editor với syntax highlighting
- **Catppuccin Mocha** dark theme
- **JetBrains API** — free, không cần authentication
- **Autocomplete** cho Kotlin keywords

---

## 🛡️ Admin Panel

Truy cập `/admin` (cần GitHub admin权限):

| Route | Chức năng |
|-------|----------|
| `/admin/lessons` | Quản lý 30 bài học |
| `/admin/quizzes` | Quản lý quiz câu hỏi |
| `/admin/checklist` | Interview checklist items |
| `/admin/playgrounds` | Playground code templates |
| `/admin/projects` | Practice projects |
| `/admin/weeks` | Roadmap weeks |
| `/admin/faqs` | FAQ entries |

> 🔒 Admin access được kiểm soát qua GitHub User ID trong env variable `NEXT_PUBLIC_ADMIN_GITHUB_IDS`

---

## 🚀 Deployment

Deploy tự động lên GitHub Pages qua GitHub Actions:

```
Push to main → Build (Turbopack) → Export Static → Deploy to gh-pages
```

### Workflow

```yaml
# .github/workflows/deploy.yml
- Build Next.js static export (Turbopack)
- Strip Tailwind CSS @layer directives (compatibility fix)
- Inject environment variables
- Deploy to gh-pages branch
```

### Environment Variables (GitHub Secrets)

| Secret | Mô tả |
|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_ADMIN_GITHUB_IDS` | Admin GitHub user IDs |

---

## 🤝 Contributing

Contributions được welcome! Hướng dẫn:

1. **Fork** repository
2. **Tạo branch** cho feature: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** lên branch: `git push origin feature/amazing-feature`
5. **Tạo Pull Request**

### Cấu trúc contribution

- 📝 **Thêm/sửa bài học:** Edit file `.mdx` trong `src/content/lessons/`
- 🧩 **Thêm quiz:** Edit frontmatter `quiz` trong file MDX
- 🎨 **Sửa UI:** Components trong `src/components/`
- 🐛 **Báo lỗi:** Tạo [Issue](https://github.com/Penz7/android-zero-to-hero/issues)

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — The React Framework
- [Supabase](https://supabase.com/) — Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) — Re-usable components
- [Kotlin](https://kotlinlang.org/) — The language for Android
- [Jetpack Compose](https://developer.android.com/jetpack/compose) — Modern Android UI toolkit

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Penz7">Penz7</a></p>
  <p>⭐ Star repo nếu bạn thấy hữu ích!</p>
</div>
