import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ChecklistItem } from "@/components/content/ChecklistItem";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist phỏng vấn",
  description:
    "Checklist đầy đủ cho Android Developer: Kotlin, Compose, Architecture, và phỏng vấn tổng hợp.",
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
          ✅ Checklist phỏng vấn
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Kiểm tra kiến thức trước khi phỏng vấn. Đánh dấu những mục bạn đã
          nắm vững.
        </p>

        <div className="mt-8 space-y-10">
          {checklists.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
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
  );
}
