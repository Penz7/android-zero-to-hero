# 🛠️ Tech Stack — Chi tiết

## Tổng quan kiến trúc

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ React 19 │  │ Tailwind │  │   Pagefind    │  │
│  │ (Hydrate)│  │   CSS v4 │  │ (Client Search)│  │
│  └──────────┘  └──────────┘  └───────────────┘  │
├─────────────────────────────────────────────────┤
│               Next.js 16 (Turbopack)            │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ App Route│  │   MDX    │  │ Static Export │  │
│  │ (SSG)    │  │ (Content)│  │  (out/)       │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
├─────────────────────────────────────────────────┤
│               GitHub Actions CI/CD              │
│  Build → Strip @layer → Pagefind → Deploy       │
├─────────────────────────────────────────────────┤
│              GitHub Pages (Static)              │
│  https://penz7.github.io/android-zero-to-hero/  │
└─────────────────────────────────────────────────┘
```

## Chi tiết từng layer

### 1. Framework: Next.js 16.2.4

| Feature | Config | Notes |
|---------|--------|-------|
| App Router | `src/app/` | File-based routing, layouts |
| Static Export | `output: 'export'` | Pure HTML/CSS/JS, no server |
| Turbopack | Default in v16 | Bundler for dev + production |
| basePath | `/android-zero-to-hero` | GitHub Pages repo path |
| assetPrefix | `/android-zero-to-hero/` | Asset URLs prefix |
| Image Optimization | `unoptimized: true` | Static export limitation |
| Metadata API | `generateMetadata()` | SEO: title, OG, Twitter |
| MDX Support | `@next/mdx` | Content as `.mdx` files |

### 2. UI: React 19 + Tailwind CSS v4

| Library | Version | Purpose |
|---------|---------|---------|
| react | 19.2.4 | UI rendering, hooks |
| react-dom | 19.2.4 | DOM rendering |
| tailwindcss | 4.x | Utility-first CSS |
| @tailwindcss/postcss | 4.x | PostCSS plugin |
| tw-animate-css | 1.4.0 | Animation utilities |
| class-variance-authority | 0.7.1 | Component variants |
| tailwind-merge | 3.5.0 | Merge conflicting classes |
| clsx | 2.1.1 | Conditional classnames |

### 3. Component Library: shadcn/ui + Radix

| Component | Radix Primitive | Purpose |
|-----------|-----------------|---------|
| Button | — | CTA buttons, links |
| Card | — | Content cards |
| Accordion | @radix-ui/react-accordion | FAQ section |
| Collapsible | @radix-ui/react-collapsible | Quiz expand/collapse |
| Dialog | @radix-ui/react-dialog | Modal dialogs |
| Navigation Menu | @radix-ui/react-navigation-menu | Header dropdown |
| Scroll Area | @radix-ui/react-scroll-area | Scrollable regions |
| Tabs | @radix-ui/react-tabs | Tabbed content |

### 4. Icons: Lucide React

```typescript
import { ArrowRight, BookOpen, Code2, Clock, Check, Search, ... } from "lucide-react";
```

### 5. Content: MDX Pipeline

| Tool | Purpose |
|------|---------|
| @next/mdx | MDX compilation |
| @mdx-js/loader | Webpack/Turbopack loader |
| react-markdown | Runtime rendering |
| remark-gfm | Tables, strikethrough, task lists |
| gray-matter | YAML frontmatter parsing |

### 6. Search: Pagefind 1.5.2

| Feature | Detail |
|---------|--------|
| Indexing | Build-time static indexing |
| Language | Vietnamese support (no stemming) |
| UI | Built-in PagefindUI component |
| Client-side | Zero server, pure JS + WASM |
| Search fields | Title, description, content body |

### 7. Quiz System: Custom localStorage

| Feature | Detail |
|---------|--------|
| Data | `src/data/quizzes.ts` — 30 quizzes, ~75 questions |
| Storage | `localStorage` per lesson: `quiz_{slug}` |
| Events | CustomEvent `quiz-completed` for cross-component sync |
| Pass threshold | ≥ 70% correct |
| Retry | Clear localStorage + reset state |

### 8. Deployment: GitHub Actions + Pages

```yaml
# .github/workflows/deploy.yml
Trigger: push to main
Steps:
  1. Checkout
  2. Node.js 20 setup
  3. npm ci
  4. npm run build (next build + strip-layers + pagefind)
  5. Upload to GitHub Pages
  6. Deploy
```

### 9. CSS Post-processing: strip-layers.js

Problem: `@font-face` before `@layer` invalidates CSS in some browsers.
Solution: Post-build script strips `@layer NAME { ... }` wrappers, preserves content, verifies brace balance.

### 10. SEO

| Feature | Implementation |
|---------|---------------|
| OG Images | `opengraph-image.tsx` / `twitter-image.tsx` |
| Sitemap | `src/app/sitemap.ts` (dynamic) |
| Robots | `src/app/robots.ts` (dynamic) |
| Canonical | `metadataBase` in config |
| Meta tags | Next.js Metadata API |
| Structured data | Breadcrumb navigation |

## File Count Summary

| Category | Count |
|----------|-------|
| Pages (App Router) | 15 routes |
| Components | 27 files |
| MDX Lessons | 30 files |
| Data files | 3 (constants, quizzes, types) |
| UI Components | 9 (shadcn/ui) |
| **Total source files** | **~80** |
| **Generated pages** | **47** |
