# 🤖 Android từ số 0 đến Engineering trong 1 tháng

> Lộ trình học Android Development 30 ngày có cấu trúc, bài học chi tiết, quiz kiểm tra, và project thực tế.

**🌐 Website:** [https://penz7.github.io/android-zero-to-hero/](https://penz7.github.io/android-zero-to-hero/)

---

## 📸 Preview

| Landing Page | Lesson Page | Code Playground | Quiz |
|:---:|:---:|:---:|:---:|
| Trang chủ với lộ trình 30 ngày | Bài học MDX + syntax highlighting | Inline editor chạy Kotlin ngay trên trang | Quiz trắc nghiệm cuối mỗi bài |

## 🎯 Mục tiêu

Sau 30 ngày, bạn có thể:
- Viết app Android bằng **Kotlin + Jetpack Compose**
- Hiểu **MVVM, Clean Architecture, DI**
- Viết **Unit Test, UI Test**
- Deploy lên **Google Play Store**
- Sẵn sàng cho **phỏng vấn Junior Android Developer**

## 📚 Nội dung

### 30 bài học chia làm 4 tuần:

| Tuần | Chủ đề | Số bài | Nội dung |
|------|--------|--------|----------|
| ⭐ | Kotlin Fundamentals | 7 | Cú pháp, biến, hàm, OOP, Collections, Null safety |
| ⭐⭐ | Jetpack Compose | 7 | Composable, Layouts, State, Navigation, Lists, Theming |
| ⭐⭐⭐ | Architecture & Data | 7 | MVVM, ViewModel, Coroutines, Room, Retrofit, Hilt |
| ⭐⭐⭐⭐ | Engineering Level | 9 | Testing, CI/CD, Performance, Security, Deploy, Career |

### 4 dự án thực hành:

| Dự án | Độ khó | Kỹ năng |
|-------|--------|---------|
| 🟢 Habit Tracker | Beginner | Kotlin, Compose, State |
| 🟡 Notes App | Intermediate | Room, MVVM, Navigation |
| 🟠 Movie Browser | Advanced | Retrofit, Hilt, Flow, Cache |
| 🔴 Clean Architecture | Professional | DI, Testing, CI/CD |

### Tính năng website:

- 📖 **Bài học MDX** — lý thuyết + ví dụ code chi tiết
- 💻 **Code Playground** — editor CodeMirror 6 chạy Kotlin ngay trên trang (JetBrains compiler API)
- 🧠 **Quiz trắc nghiệm** — kiểm tra kiến thức cuối mỗi bài (2-3 câu)
- ✅ **Checklist tiến độ** — track quiz completion, progress bar
- 🔍 **Tìm kiếm** — Pagefind full-text search
- 📱 **Responsive** — mobile, tablet, desktop
- 🌙 **Dark/Light mode** — tự động theo system
- 🔎 **SEO** — OG images, sitemap, robots.txt
- 🔐 **GitHub Login** — đồng bộ tiến độ qua Supabase Auth (tùy chọn)

## 🛠️ Tech Stack

### Framework & Core
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.2.4 | App Router, static export, Turbopack |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Turbopack** | (built-in Next 16) | Production bundler |

### Styling & UI
| Technology | Purpose |
|-----------|---------|
| **Tailwind CSS v4** | Utility-first CSS framework |
| **shadcn/ui** | Accessible component library (Radix UI primitives) |
| **Lucide React** | Icon library |
| **class-variance-authority** | Component variant management |
| **tailwind-merge** | Merge Tailwind classes safely |

### Content & Code Editor
| Technology | Purpose |
|-----------|---------|
| **MDX** (`@next/mdx`) | Markdown with JSX components |
| **react-markdown** | Render MDX content client-side |
| **remark-gfm** | GitHub Flavored Markdown (tables, strikethrough) |
| **react-syntax-highlighter** | Prism-based syntax highlighting for lesson code blocks |
| **CodeMirror 6** | Inline code editor with Kotlin syntax highlighting |
| **@lezer/highlight** | Lezer parser for CodeMirror syntax theme |

### Code Execution
| Technology | Purpose |
|-----------|---------|
| **JetBrains Kotlin API** | Compile & run Kotlin code via `api.kotlinlang.org` (free, no API key) |

### Auth & Sync
| Technology | Purpose |
|-----------|---------|
| **Supabase Auth** | GitHub OAuth for user authentication |
| **Supabase DB** | Cloud storage for quiz progress sync |
| **localStorage** | Offline-first progress tracking |

### Search & SEO
| Technology | Purpose |
|-----------|---------|
| **Pagefind** | Static full-text search engine |
| **robots.ts** | Dynamic robots.txt generation |
| **sitemap.ts** | Dynamic sitemap.xml generation |
| **Next.js Metadata API** | OG images, Twitter cards, meta tags |

### Deployment
| Technology | Purpose |
|-----------|---------|
| **GitHub Pages** | Static hosting |
| **GitHub Actions** | CI/CD: build → Pagefind → deploy |
| **Static Export** | `output: 'export'` for zero-server hosting |

### Dev Tools
| Technology | Purpose |
|-----------|---------|
| **ESLint** | Code linting |
| **PostCSS** | CSS processing |

## 🏗️ Project Structure

```
android-zero-to-hero/
├── .github/workflows/       # GitHub Actions deploy
├── public/                   # Static assets, OG images
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── checklist/        # Progress tracker + interview checklist
│   │   ├── learn/[slug]/     # Dynamic lesson pages with playground
│   │   ├── projects/         # Project listing + detail pages
│   │   ├── resources/        # Learning resources
│   │   ├── roadmap/          # Weekly roadmap
│   │   └── search/           # Pagefind search
│   ├── components/
│   │   ├── content/          # Quiz, CodePlayground, Lesson cards
│   │   ├── landing/          # Homepage sections
│   │   ├── layout/           # Header, Footer, Breadcrumb, LoginBanner
│   │   └── ui/               # shadcn/ui components
│   ├── content/
│   │   └── lessons/          # 30 MDX lesson files
│   ├── data/
│   │   ├── quizzes.ts        # Quiz questions for all lessons
│   │   └── playgrounds.ts    # Code playground snippets per lesson
│   └── lib/
│       ├── auth-context.tsx  # Supabase Auth context (GitHub OAuth)
│       ├── constants.ts      # Lessons, weeks, projects data
│       ├── supabase.ts       # Supabase client config
│       ├── sync.ts           # Cloud ↔ local progress sync
│       ├── types.ts          # TypeScript interfaces
│       └── utils.ts          # Utility functions (cn, etc.)
│   └── supabase/
│       └── schema.sql        # Database schema (RLS policies)
├── scripts/
│   └── strip-layers.js       # Post-build: flatten CSS @layer
├── next.config.ts            # Next.js config (basePath, export)
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm hoặc yarn

### Install & Run

```bash
# Clone
git clone https://github.com/Penz7/android-zero-to-hero.git
cd android-zero-to-hero

# Install
npm install

# Development
npm run dev
# → http://localhost:3000

# Build (static export)
npm run build
# → output: out/ directory

# Build includes:
# 1. next build (Turbopack static export)
# 2. strip-layers.js (flatten CSS @layer)
# 3. pagefind (index content for search)
```

### Deploy

Auto-deploy via GitHub Actions on `git push` to `main` branch.

## 🔐 Authentication (Optional)

Users can optionally sign in with GitHub to sync progress across devices:

1. **Supabase** — free tier for auth + database
2. **GitHub OAuth** — one-click login
3. **RLS policies** — users can only access their own data
4. **Offline-first** — works without login, sync when logged in

### Sign Out Behavior
- Clears all `localStorage` (quiz progress, preferences)
- Clears `sessionStorage`
- Signs out from Supabase
- Redirects to homepage

## 💻 Code Playground

Each lesson includes an inline code editor with:

- **CodeMirror 6** — syntax highlighting (Catppuccin Mocha theme)
- **JetBrains Kotlin Compiler API** — compile & run Kotlin code for free
- **Multi-tab snippets** — switch between examples per lesson
- **Copy / Reset / Run** buttons
- **Output panel** — shows execution results, errors, and timing

Supported: basic Kotlin syntax, functions, classes, collections, null safety, etc.
Not supported: Android-specific APIs (Compose, Room, etc. need Android runtime).

## 🔧 Key Decisions

### Why Static Export?
GitHub Pages = free hosting, no server needed. Next.js `output: 'export'` generates pure HTML/CSS/JS.

### Why Turbopack?
Next.js 16 uses Turbopack as default bundler for both dev and production. Faster builds, better tree-shaking.

### Why Pagefind?
Client-side search without JavaScript framework. Indexes statically at build time. Supports Vietnamese language.

### Why MDX?
Content lives in `.mdx` files — easy to edit, version control, và mix code examples with prose.

### Why JetBrains API over Piston?
Piston public API became whitelist-only (Feb 2026). JetBrains `api.kotlinlang.org` is free, no API key needed, and maintained by JetBrains.

### CSS @layer Fix
Tailwind CSS v4 uses `@layer` blocks. Some browsers/Pages have issues parsing `@font-face` before `@layer`. Post-build script strips `@layer` wrappers while preserving content.

## 📊 Stats

| Metric | Value |
|--------|-------|
| Total files | 80+ source files |
| Lessons | 30 MDX files |
| Quiz questions | ~75 questions (2-3 per lesson) |
| Playground snippets | ~20 code examples |
| Projects | 4 detailed project guides |
| Pages generated | 47 static pages |
| Search index | ~5,500 words |

## 📝 License

MIT License — free to use, modify, and distribute.

## 🙏 Credits

- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — Component library
- [CodeMirror](https://codemirror.net/) — Code editor
- [JetBrains](https://www.jetbrains.com/) — Kotlin language & compiler API
- [Supabase](https://supabase.com/) — Auth & database
- [Pagefind](https://pagefind.app/) — Search engine
- [Lucide](https://lucide.dev/) — Icons

---

**⭐ Star this repo nếu bạn thấy hữu ích!**
