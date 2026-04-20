import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ChecklistItem } from "@/components/content/ChecklistItem";
import { LessonProgress } from "@/components/content/LessonProgress";
import { ALL_LESSONS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist & Tiến độ",
  description:
    "Theo dõi tiến độ học tập qua quiz và checklist kiến thức phỏng vấn Android Developer.",
};

const checklists = [
  {
    title: "🧑‍💻 Kotlin Mastery",
    items: [
      "Hiểu val vs var và khi nào dùng cái nào",
      "Sử dụng String templates và raw strings",
      "Viết Lambda expressions và higher-order functions",
      "Hiểu null safety: ?, ?., ?:, !!",
      "Viết data class, sealed class, enum class",
      "Sử dụng extension functions",
      "Hiểu collection operations: filter, map, reduce",
      "Sử dụng when expression thay vì switch-case",
      "Viết suspend functions cơ bản",
      "Hiểu Coroutine scope và dispatcher",
    ],
  },
  {
    title: "🎨 Compose Mastery",
    items: [
      "Viết @Composable functions",
      "Sử dụng Column, Row, Box, Spacer",
      "Hiểu Modifier chain và thứ tự",
      "Quản lý state: remember, mutableStateOf",
      "State hoisting pattern",
      "Sử dụng LazyColumn/LazyRow",
      "Navigation với NavHost",
      "Custom theming: Color, Typography",
    ],
  },
  {
    title: "🏗️ Architecture",
    items: [
      "Hiểu MVVM pattern",
      "Tách biệt UI, Domain, Data layers",
      "Sử dụng ViewModel + StateFlow",
      "Repository pattern",
      "Dependency Injection cơ bản với Hilt",
    ],
  },
  {
    title: "📋 General Interview Prep",
    items: [
      "Kể được 3 project đã làm và role của mình",
      "Giải thích MVVM cho người mới",
      "Nói về cách xử lý error trong app",
      "Hiểu Activity lifecycle",
      "Giải thích tại sao dùng Coroutines thay Thread",
      "Nói về cách optimize list performance",
      "Hiểu Unit Test vs UI Test",
      "Biết cách deploy lên Play Store",
      "Có GitHub profile với code samples",
      "Chuẩn bị câu hỏi cho interviewer",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: "Checklist" }]} />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          ✅ Checklist & Tiến độ
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Hoàn thành quiz ở cuối mỗi bài học để đánh dấu tiến độ. Checklist kiến
          thức phỏng vấn bên dưới.
        </p>

        {/* Lesson Progress — quiz-based */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            📚 Tiến độ bài học (qua Quiz)
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Làm quiz ở cuối mỗi bài học và đạt ≥ 70% để đánh dấu hoàn thành.
            Tiến độ được lưu trên trình duyệt của bạn.
          </p>
          <LessonProgress
            lessons={ALL_LESSONS.map((l) => ({
              slug: l.slug,
              title: l.title,
              day: l.day,
              week: l.week,
            }))}
          />
        </div>

        {/* Manual checklist */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            📋 Checklist phỏng vấn
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Đánh dấu những kiến thức bạn đã nắm vững. Tự đánh giá trung thực.
          </p>
          <div className="space-y-10">
            {checklists.map((section) => (
              <section key={section.title}>
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <ChecklistItem key={item} text={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
