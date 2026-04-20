import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PROJECTS } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Wrench } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const PROJECT_CONTENT: Record<string, {
  overview: string;
  features: string[];
  architecture: string;
  techStack: { name: string; purpose: string }[];
  steps: { title: string; description: string }[];
  tips: string[];
}> = {
  "habit-tracker": {
    overview:
      "Dự án đầu tiên — xây dựng một app theo dõi thói quen hàng ngày. Đây là cách tốt nhất để làm quen với Kotlin và Jetpack Compose từ con số 0.",
    features: [
      "Danh sách thói quen: đọc sách, tập thể dục, uống nước...",
      "Đánh dấu hoàn thành mỗi ngày bằng 1 lần chạm",
      "Đếm streak (số ngày liên tiếp hoàn thành)",
      "Giao diện Material Design 3, dark/light theme",
    ],
    architecture:
      "Đơn giản — 1 Activity + Composable functions. Dữ liệu lưu trong memory (List). Chưa cần Room hay ViewModel ở giai đoạn này.",
    techStack: [
      { name: "Kotlin", purpose: "Ngôn ngữ chính" },
      { name: "Jetpack Compose", purpose: "Declarative UI" },
      { name: "Material 3", purpose: "Design system" },
      { name: "LazyColumn", purpose: "Scrollable list" },
    ],
    steps: [
      { title: "Tạo project mới", description: "Mở Android Studio → New Project → Empty Activity → chọn Kotlin. Đặt tên 'HabitTracker'." },
      { title: "Data model", description: "Tạo data class Habit(name: String, isCompleted: Boolean). Dùng remember { mutableStateListOf() } để lưu danh sách." },
      { title: "UI chính", description: "Dùng LazyColumn hiển thị danh sách thói quen. Mỗi item có Checkbox và tên thói quen." },
      { title: "Thêm thói quen", description: "Tạo dialog hoặc TextField để người dùng nhập tên thói quen mới." },
      { title: "Streak counter", description: "Đếm số ngày liên tiếp hoàn thành. Lưu lịch sử đơn giản với SharedPreferences." },
    ],
    tips: [
      "Bắt đầu với 3-5 thói quen mặc định, đừng để danh sách trống.",
      "Dùng Preview trong Compose để test UI nhanh không cần chạy emulator.",
      "Mỗi Composable nên làm 1 việc: HabitItem, HabitList, AddHabitDialog.",
    ],
  },
  "notes-app": {
    overview:
      "App ghi chú đầy đủ tính năng — CRUD operations, tìm kiếm, lưu trữ local database. Học MVVM pattern và Room Database.",
    features: [
      "Tạo, sửa, xóa ghi chú với Rich Text",
      "Tìm kiếm real-time theo tiêu đề",
      "Lưu trữ local với Room Database",
      "Navigation: danh sách → chi tiết → edit",
    ],
    architecture:
      "MVVM pattern: View (Compose) → ViewModel → Repository → Room Database. Clean separation giữa UI logic và business logic.",
    techStack: [
      { name: "Room", purpose: "Local database (SQLite abstraction)" },
      { name: "ViewModel", purpose: "Quản lý UI state, survive config changes" },
      { name: "Navigation Compose", purpose: "Điều hướng giữa các màn hình" },
      { name: "Coroutines", purpose: "Async database operations" },
      { name: "StateFlow", purpose: "Reactive data từ ViewModel" },
    ],
    steps: [
      { title: "Setup Room", description: "Tạo Note Entity, NoteDao, NoteDatabase. Annotate với @Entity, @Dao, @Database." },
      { title: "Repository layer", description: "Tạo NoteRepository đóng gói DAO calls. ViewModel chỉ tương tác với Repository." },
      { title: "List screen", description: "NoteListScreen: hiển thị danh sách ghi chú bằng LazyColumn. Search bar ở trên." },
      { title: "Detail/Edit screen", description: "NoteEditScreen: form để nhập title, content. Lưu tự động khi navigate back." },
      { title: "Navigation graph", description: "Setup NavHost với 2 routes: noteList và noteEdit/{noteId}. Pass data qua arguments." },
    ],
    tips: [
      "Dùng @Query annotation cho các truy vấn tùy chỉnh thay vì raw SQL.",
      "ViewModel expose StateFlow thay vì LiveData — modern và type-safe hơn.",
      "Thêm swipe-to-delete với Dismissable trong Compose cho UX tốt hơn.",
    ],
  },
  "movie-browser": {
    overview:
      "App duyệt phim từ TMDB API — học networking, dependency injection, reactive programming với Flow, và offline-first architecture.",
    features: [
      "Danh sách phim phổ biến, trending, top rated",
      "Tìm kiếm phim theo tên với debounce",
      "Chi tiết phim: poster, rating, cast, mô tả",
      "Cache offline — xem được khi không có mạng",
    ],
    architecture:
      "Clean Architecture cơ bản: Data layer (API + DB) → Domain layer (Use Cases) → Presentation layer (ViewModel + Compose). Repository pattern kết hợp 2 data sources.",
    techStack: [
      { name: "Retrofit + OkHttp", purpose: "HTTP client cho TMDB API" },
      { name: "Moshi/Gson", purpose: "JSON parsing" },
      { name: "Hilt", purpose: "Dependency Injection" },
      { name: "Room", purpose: "Offline cache" },
      { name: "Kotlin Flow", purpose: "Reactive data streams" },
      { name: "Coil", purpose: "Image loading" },
    ],
    steps: [
      { title: "Setup Retrofit", description: "Tạo ApiService interface với @GET endpoints. Tạo Retrofit instance với Moshi converter." },
      { title: "Hilt setup", description: "Tạo AppModule cung cấp ApiService, Database, Repository. Annotate @HiltAndroidApp cho Application class." },
      { title: "Repository", description: "MovieRepository: fetch từ API, cache vào Room. Flow<Resource<T>> cho loading/success/error states." },
      { title: "Movie list screen", description: "Grid hiển thị poster phim. Pull-to-refresh. Loading shimmer effect." },
      { title: "Movie detail screen", description: "Chi tiết phim: backdrop image, info, cast list. Navigate từ list bằng movie ID." },
    ],
    tips: [
      "Dùng sealed class Resource<T>(Loading, Success, Error) để handle API states.",
      "Cache strategy: ưu tiên hiển thị cache, background refresh từ API.",
      "Đăng ký TMDB API key miễn phí tại themoviedb.org trước khi bắt đầu.",
    ],
  },
  "clean-arch-sample": {
    overview:
      "Dự án cuối cùng — ứng dụng mẫu với Clean Architecture hoàn chỉnh, đầy đủ testing, CI/CD. Chuẩn bị cho phỏng vấn và production code.",
    features: [
      "Clean Architecture 3 layers: Data, Domain, Presentation",
      "Unit Tests cho Use Cases và ViewModels",
      "UI Tests với Compose Testing",
      "CI/CD với GitHub Actions",
    ],
    architecture:
      "Clean Architecture hoàn chỉnh: Data (API, DB, Repository impl) → Domain (Entities, Use Cases, Repository interface) → Presentation (ViewModel, UI). Dependency Rule: inner layers không biết outer layers.",
    techStack: [
      { name: "Hilt", purpose: "DI cho multi-module setup" },
      { name: "JUnit 5", purpose: "Unit testing framework" },
      { name: "Mockk", purpose: "Mocking cho tests" },
      { name: "Compose Testing", purpose: "UI testing" },
      { name: "GitHub Actions", purpose: "CI/CD pipeline" },
      { name: "Detekt", purpose: "Static code analysis" },
    ],
    steps: [
      { title: "Project structure", description: "Chia thành 3 modules: :data, :domain, :presentation. Domain module không có dependency ngoài." },
      { title: "Domain layer", description: "Entities, Repository interfaces, Use Cases. Mỗi Use Case = 1 class với invoke() operator." },
      { title: "Data layer", description: "Repository implementations, API services, Room database, Data mappers (DTO ↔ Entity)." },
      { title: "Testing", description: "Unit test Use Cases với Mockk. UI test Compose screens với TestRule. Aim >80% coverage." },
      { title: "CI/CD", description: "GitHub Actions: lint → test → build → deploy. Tự động chạy trên mỗi PR." },
    ],
    tips: [
      "Bắt đầu với Domain layer — define interfaces trước, implement sau.",
      "Dùng @Module @InstallIn(SingletonComponent::class) cho app-wide dependencies.",
      "Tạo test fixtures (fake data) để dùng chung giữa unit tests và UI tests.",
    ],
  },
};

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `Dự án: ${project.title}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const content = PROJECT_CONTENT[slug];

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb
        items={[
          { label: "Dự án", href: "/projects" },
          { label: project.title },
        ]}
      />

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-medium">{project.difficulty}</span>
          <h1 className="text-4xl font-bold tracking-tight mt-2">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{project.week}</p>
        </div>

        {content ? (
          <>
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">📖 Tổng quan</h2>
              <p className="text-muted-foreground">{content.overview}</p>
            </section>

            {/* Features */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-green-600" />
                Tính năng chính
              </h2>
              <ul className="space-y-2">
                {content.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-green-500 mt-1">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Architecture */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">🏗️ Kiến trúc</h2>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">{content.architecture}</p>
              </div>
            </section>

            {/* Tech stack */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-green-600" />
                Công nghệ sử dụng
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {content.techStack.map((t) => (
                  <div key={t.name} className="rounded-lg border p-3">
                    <span className="font-medium text-sm">{t.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.purpose}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Steps */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Các bước thực hiện
              </h2>
              <div className="space-y-4">
                {content.steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">💡 Mẹo thực tế</h2>
              <div className="rounded-lg border bg-yellow-50/50 p-4 space-y-2">
                {content.tips.map((tip, i) => (
                  <p key={i} className="text-sm text-yellow-800">
                    • {tip}
                  </p>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="rounded-lg border bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground">
              🛠️ Hướng dẫn chi tiết đang được cập nhật.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Dự án: {project.title}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center border-t pt-6">
          <Link
            href="/android-zero-to-hero/projects/"
            className="text-sm text-muted-foreground hover:text-green-600 transition-colors"
          >
            ← Tất cả dự án
          </Link>
          {(() => {
            const currentIdx = PROJECTS.findIndex((p) => p.slug === slug);
            const next = PROJECTS[currentIdx + 1];
            if (next) {
              return (
                <Link
                  href={`/android-zero-to-hero/projects/${next.slug}/`}
                  className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  Dự án tiếp: {next.title} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              );
            }
            return null;
          })()}
        </div>
      </article>
    </div>
  );
}
