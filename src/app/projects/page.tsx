import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProjectCard } from "@/components/content/ProjectCard";
import { PROJECTS } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Code2, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Dự án thực hành",
  description:
    "4 dự án Android thực tế từ dễ đến khó: Habit Tracker, Notes App, Movie Browser, Clean Architecture Sample. Học qua dự án thực tế.",
};

const PROJECT_DETAILS = [
  {
    slug: "habit-tracker",
    features: [
      "Thêm/xóa thói quen hàng ngày",
      "Đánh dấu hoàn thành theo ngày",
      "Thống kê streak (chuỗi ngày liên tiếp)",
      "Giao diện Material Design 3",
    ],
    learnings: [
      "Cú pháp Kotlin cơ bản: variables, functions, control flow",
      "Jetpack Compose: Composable functions, State, Layouts",
      "State management: remember, mutableStateOf",
      "LazyColumn cho danh sách",
    ],
    prerequisites: "Không cần kiến thức trước. Bắt đầu từ số 0.",
    estimatedTime: "3-4 giờ",
  },
  {
    slug: "notes-app",
    features: [
      "Tạo, sửa, xóa ghi chú",
      "Tìm kiếm ghi chú theo tiêu đề",
      "Lưu trữ local với Room Database",
      "Navigation giữa các màn hình",
    ],
    learnings: [
      "Room Database: Entity, Dao, Database",
      "MVVM pattern: ViewModel, LiveData/StateFlow",
      "Navigation Component trong Compose",
      "Coroutines cơ bản cho async operations",
    ],
    prerequisites: "Hoàn thành Tuần 1 (Kotlin basics). Biết Compose cơ bản.",
    estimatedTime: "5-6 giờ",
  },
  {
    slug: "movie-browser",
    features: [
      "Danh sách phim phổ biến từ TMDB API",
      "Tìm kiếm phim theo tên",
      "Chi tiết phim: poster, rating, mô tả",
      "Cache offline với Room",
    ],
    learnings: [
      "Retrofit: tạo API client, parse JSON",
      "Hilt Dependency Injection",
      "Kotlin Flow: reactive data streams",
      "Repository pattern & Clean Architecture cơ bản",
    ],
    prerequisites: "Hoàn thành Tuần 2. Hiểu MVVM, Room, Coroutines.",
    estimatedTime: "6-8 giờ",
  },
  {
    slug: "clean-arch-sample",
    features: [
      "Clean Architecture: Data → Domain → Presentation",
      "Unit Tests với JUnit & Mockk",
      "UI Tests với Compose Testing",
      "CI/CD pipeline với GitHub Actions",
    ],
    learnings: [
      "Clean Architecture: separation of concerns",
      "Dependency Injection nâng cao với Hilt",
      "Testing: Unit test, UI test, Integration test",
      "Performance: profiling, optimization",
    ],
    prerequisites: "Hoàn thành Tuần 3. Có kinh nghiệm với MVVM, Retrofit, Hilt.",
    estimatedTime: "8-10 giờ",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: "Dự án" }]} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          🛠️ Dự án thực hành
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          4 dự án từ dễ đến khó, giúp bạn áp dụng kiến thức vào thực tế. Mỗi dự án xây dựng trên kiến thức của dự án trước.
        </p>

        {/* Progression path */}
        <div className="mt-8 rounded-lg border bg-muted/30 p-6">
          <h2 className="font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Lộ trình dự án
          </h2>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm">
            <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 font-medium">🟢 Beginner</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block rotate-90 sm:rotate-0" />
            <span className="rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 font-medium">🟡 Intermediate</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block rotate-90 sm:rotate-0" />
            <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 font-medium">🟠 Advanced</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block rotate-90 sm:rotate-0" />
            <span className="rounded-full bg-red-100 text-red-700 px-3 py-1 font-medium">🔴 Professional</span>
          </div>
        </div>

        {/* Project cards grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              week={p.week}
              difficulty={p.difficulty}
              skills={p.skills}
              description={p.description}
            />
          ))}
        </div>

        {/* Detailed breakdown */}
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">📋 Chi tiết từng dự án</h2>

          {PROJECT_DETAILS.map((project, idx) => {
            const info = PROJECTS[idx];
            return (
              <div key={project.slug} className="rounded-lg border overflow-hidden">
                <div className="border-b bg-muted/30 p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-green-600">#{idx + 1}</span>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {info.difficulty} {info.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 grid gap-6 md:grid-cols-2">
                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-sm text-green-600 mb-3 flex items-center gap-1.5">
                      <Code2 className="h-4 w-4" />
                      Tính năng chính
                    </h4>
                    <ul className="space-y-1.5">
                      {project.features.map((f, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What you'll learn */}
                  <div>
                    <h4 className="font-medium text-sm text-green-600 mb-3 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      Bạn sẽ học được
                    </h4>
                    <ul className="space-y-1.5">
                      {project.learnings.map((l, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t bg-muted/20 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {project.estimatedTime}
                    </span>
                    <span className="text-muted-foreground">
                      📚 {info.week}
                    </span>
                  </div>
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                  >
                    Xem hướng dẫn <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips section */}
        <div className="mt-12 rounded-lg border bg-green-50/50 p-6">
          <h2 className="font-semibold text-green-800">💡 Mẹo học qua dự án</h2>
          <ul className="mt-3 space-y-2 text-sm text-green-700">
            <li>• <strong>Bắt đầu từ dự án #1</strong> — đừng skip, mỗi dự án xây dựng kiến thức từ dự án trước.</li>
            <li>• <strong>Tự code trước, xem hướng dẫn sau</strong> — thử làm trước khi xem solution.</li>
            <li>• <strong>Modify dự án</strong> — sau khi hoàn thành, thử thêm tính năng mới.</li>
            <li>• <strong>Push lên GitHub</strong> — tạo portfolio với các dự án đã hoàn thành.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
