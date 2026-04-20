# 🏗️ Kiến trúc thư mục dự án — android-zero-to-hero

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- MDX (file-based content)
- Shiki (code highlight)
- Pagefind (search)
- Vercel (deploy)

---

## Cấu trúc thư mục

```
android-zero-to-hero/
│
├── public/                          # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── og/                      # Open Graph images per page
│   │   │   ├── home.png
│   │   │   ├── roadmap.png
│   │   │   └── lesson-{slug}.png
│   │   ├── illustrations/           # Hero, empty state, 404
│   │   │   ├── hero-android.svg
│   │   │   └── empty-state.svg
│   │   └── icons/
│   │       ├── kotlin.svg
│   │       ├── compose.svg
│   │       └── android.svg
│   └── fonts/                       # Custom fonts nếu cần
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout (Header, Footer, Theme)
│   │   ├── page.tsx                 # Landing page (/)
│   │   ├── not-found.tsx            # Custom 404
│   │   │
│   │   ├── roadmap/
│   │   │   ├── page.tsx             # /roadmap — tổng quan lộ trình
│   │   │   └── [week]/
│   │   │       └── page.tsx         # /roadmap/week-1 ... week-4
│   │   │
│   │   ├── learn/
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # /learn/kotlin-basics (MDX lesson)
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx             # /projects — danh sách project
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # /projects/habit-tracker
│   │   │
│   │   ├── resources/
│   │   │   └── page.tsx             # /resources — tài liệu tham khảo
│   │   │
│   │   ├── checklist/
│   │   │   └── page.tsx             # /checklist — checklist phỏng vấn
│   │   │
│   │   ├── search/
│   │   │   └── page.tsx             # /search — tìm kiếm (Pagefind)
│   │   │
│   │   ├── api/                     # API routes (nếu cần)
│   │   │   ├── newsletter/
│   │   │   │   └── route.ts         # POST subscribe newsletter
│   │   │   └── search/
│   │   │       └── route.ts         # GET search index
│   │   │
│   │   └── blog/                    # (Optional sau này)
│   │       └── page.tsx
│   │
│   ├── components/                  # React components
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   ├── Footer.tsx           # Footer with links
│   │   │   ├── Sidebar.tsx          # Lesson sidebar navigation
│   │   │   ├── MobileNav.tsx        # Mobile hamburger menu
│   │   │   └── Breadcrumb.tsx       # Breadcrumb navigation
│   │   │
│   │   ├── ui/                      # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...                  # npx shadcn-ui@latest add
│   │   │
│   │   ├── content/                 # Components dùng trong MDX
│   │   │   ├── Callout.tsx          # 💡 Tip, ⚠️ Warning, ℹ️ Info
│   │   │   ├── CodeBlock.tsx        # Code block với Shiki highlight
│   │   │   ├── CopyButton.tsx       # Copy code to clipboard
│   │   │   ├── LessonCard.tsx       # Card hiển thị bài học
│   │   │   ├── RoadmapNode.tsx      # Node trong roadmap flow
│   │   │   ├── ProgressTracker.tsx  # Progress bar theo tuần
│   │   │   ├── QuizEmbed.tsx        # Quiz inline trong MDX
│   │   │   ├── ChecklistItem.tsx    # Checklist checkbox
│   │   │   ├── ComparisonTable.tsx  # So sánh A vs B
│   │   │   └── ExternalLink.tsx     # Link ngoài với icon
│   │   │
│   │   ├── landing/                 # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── RoadmapPreview.tsx
│   │   │   ├── FeatureGrid.tsx
│   │   │   ├── TestimonialSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── NewsletterForm.tsx
│   │   │
│   │   └── search/
│   │       ├── SearchDialog.tsx     # Search modal (Cmd+K)
│   │       └── SearchResults.tsx
│   │
│   ├── lib/                         # Utility functions
│   │   ├── mdx.ts                   # MDX loader + frontmatter parser
│   │   ├── curriculum.ts            # Curriculum data (30 days)
│   │   ├── utils.ts                 # cn(), formatDate, etc.
│   │   ├── constants.ts             # Site config, nav links
│   │   └── types.ts                 # TypeScript types
│   │
│   ├── content/                     # MDX content files
│   │   ├── lessons/                 # 30 bài học chính
│   │   │   ├── 01-kotlin-intro.mdx
│   │   │   ├── 02-kotlin-variables.mdx
│   │   │   ├── 03-kotlin-functions.mdx
│   │   │   ├── 04-kotlin-control-flow.mdx
│   │   │   ├── 05-kotlin-oop.mdx
│   │   │   ├── 06-kotlin-collections.mdx
│   │   │   ├── 07-kotlin-null-safety.mdx
│   │   │   ├── 08-compose-intro.mdx
│   │   │   ├── 09-compose-layouts.mdx
│   │   │   ├── 10-compose-state.mdx
│   │   │   ├── 11-compose-navigation.mdx
│   │   │   ├── 12-compose-lists.mdx
│   │   │   ├── 13-compose-theming.mdx
│   │   │   ├── 14-compose-advanced-ui.mdx
│   │   │   ├── 15-mvvm-intro.mdx
│   │   │   ├── 16-viewmodel-livedata.mdx
│   │   │   ├── 17-coroutines-flow.mdx
│   │   │   ├── 18-room-database.mdx
│   │   │   ├── 19-retrofit-networking.mdx
│   │   │   ├── 20-hilt-di.mdx
│   │   │   ├── 21-clean-architecture.mdx
│   │   │   ├── 22-testing-unit.mdx
│   │   │   ├── 23-testing-ui.mdx
│   │   │   ├── 24-ci-cd-basics.mdx
│   │   │   ├── 25-performance.mdx
│   │   │   ├── 26-security-basics.mdx
│   │   │   ├── 27-play-store-deploy.mdx
│   │   │   ├── 28-interview-prep.mdx
│   │   │   ├── 29-portfolio-project.mdx
│   │   │   └── 30-next-steps.mdx
│   │   │
│   │   ├── projects/                # Hướng dẫn project
│   │   │   ├── habit-tracker.mdx
│   │   │   ├── notes-app.mdx
│   │   │   ├── movie-browser.mdx
│   │   │   └── clean-arch-sample.mdx
│   │   │
│   │   ├── resources/               # Trang tài liệu
│   │   │   ├── android-docs.mdx
│   │   │   ├── kotlin-docs.mdx
│   │   │   ├── tools-setup.mdx
│   │   │   └── community.mdx
│   │   │
│   │   └── checklist/               # Checklist phỏng vấn
│   │       ├── kotlin-checklist.mdx
│   │       ├── compose-checklist.mdx
│   │       ├── architecture-checklist.mdx
│   │       └── general-checklist.mdx
│   │
│   ├── styles/
│   │   └── globals.css              # Global styles + Tailwind config
│   │
│   └── hooks/                       # Custom React hooks (nếu cần)
│       └── useProgress.ts
│
├── contentlayer.config.ts           # Contentlayer config (nếu dùng)
│   hoặc content/
│       └── config.ts                # Content config (nếu dùng @next/mdx)
│
├── next.config.ts                   # Next.js config (MDX, redirects)
├── tailwind.config.ts               # Tailwind config + shadcn theme
├── postcss.config.mjs
├── tsconfig.json
├── components.json                  # shadcn/ui config
├── package.json
├── .env.local                       # Environment variables
├── .gitignore
├── README.md
│
└── docs/                            # Project documentation
    ├── ARCHITECTURE.md              # ← File này
    ├── SITEMAP.md                   # Sitemap đầy đủ
    ├── LANDING-PAGE.md              # Landing page structure
    └── CONTENT-GUIDE.md             # Hướng dẫn viết content MDX
```

---

## Giải thích từng tầng

### 1. `src/app/` — Routing (App Router)
- Mỗi folder = 1 route segment
- `page.tsx` = trang chính của route đó
- Dynamic routes dùng `[slug]` pattern
- Layout chia sẻ qua `layout.tsx` (nested layouts)

### 2. `src/components/` — UI Components
Chia 4 nhóm:
- **layout/**: Header, Footer, Sidebar — cấu trúc trang
- **ui/**: shadcn/ui base — Button, Card, Badge... (reusable)
- **content/**: Components dùng TRONG MDX — Callout, CodeBlock, LessonCard
- **landing/**: Sections riêng cho trang chủ

### 3. `src/content/` — MDX Files
- **Frontmatter** trong mỗi file MDX:
```yaml
---
title: "Biến và Kiểu dữ liệu trong Kotlin"
day: 2
week: 1
difficulty: "beginner"
prerequisites: ["01-kotlin-intro"]
duration: "45 min"
tags: ["kotlin", "variables", "types"]
description: "Tìm hiểu cách khai báo biến val/var, các kiểu dữ liệu cơ bản..."
---
```
- Nội dung MDX: markdown + React components nhúng

### 4. `src/lib/` — Business Logic
- **mdx.ts**: đọc file MDX, parse frontmatter, render content
- **curriculum.ts**: data cấu trúc 30 ngày (single source of truth)
- **constants.ts**: site name, nav links, social links

### 5. Quy tắc thiết kế
- **Separation of concerns**: content ≠ components ≠ business logic
- **File-based routing**: không cần config route thủ công
- **Type-safe**: TypeScript types cho Lesson, Project, Module, v.v.
- **SEO-first**: mỗi page có metadata, OG image, structured data

---

## Quy tắc đặt tên

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| File MDX | `{number}-{slug}.mdx` | `01-kotlin-intro.mdx` |
| Component | `PascalCase.tsx` | `LessonCard.tsx` |
| Hook | `use{X}.ts` | `useProgress.ts` |
| Utility | `camelCase.ts` | `formatDate.ts` |
| Page | `page.tsx` | (bắt buộc bởi Next.js) |
| Layout | `layout.tsx` | (bắt buộc bởi Next.js) |

---

## Dependencies chính

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "@next/mdx": "latest",
    "@mdx-js/loader": "latest",
    "@mdx-js/react": "latest",
    "shiki": "latest",
    "rehype-pretty-code": "latest",
    "rehype-slug": "latest",
    "rehype-autolink-headings": "latest",
    "remark-gfm": "latest",
    "pagefind": "latest",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest"
  }
}
```
