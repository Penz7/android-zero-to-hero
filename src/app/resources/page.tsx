import { Breadcrumb } from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài liệu tham khảo",
  description:
    "Tổng hợp tài liệu Android, Kotlin, công cụ phát triển, và cộng đồng hỗ trợ.",
};

const resources = [
  {
    category: "📘 Tài liệu chính thức",
    items: [
      {
        title: "Android Developers",
        url: "https://developer.android.com",
        desc: "Tài liệu chính thức từ Google cho Android development.",
      },
      {
        title: "Kotlin Documentation",
        url: "https://kotlinlang.org/docs",
        desc: "Tài liệu ngôn ngữ Kotlin từ JetBrains.",
      },
      {
        title: "Jetpack Compose Documentation",
        url: "https://developer.android.com/jetpack/compose",
        desc: "Tài liệu UI toolkit Compose từ Google.",
      },
    ],
  },
  {
    category: "🔧 Công cụ",
    items: [
      {
        title: "Android Studio",
        url: "https://developer.android.com/studio",
        desc: "IDE chính thức cho Android development.",
      },
      {
        title: "Kotlin Playground",
        url: "https://play.kotlinlang.org",
        desc: "Chạy code Kotlin online không cần cài đặt.",
      },
    ],
  },
  {
    category: "👥 Cộng đồng",
    items: [
      {
        title: "Stack Overflow — Android",
        url: "https://stackoverflow.com/questions/tagged/android",
        desc: "Hỏi đáp về Android development.",
      },
      {
        title: "Reddit — r/androiddev",
        url: "https://reddit.com/r/androiddev",
        desc: "Cộng đồng Android developers.",
      },
      {
        title: "Android Developers Blog",
        url: "https://android-developers.googleblog.com",
        desc: "Blog chính thức từ Android team.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: "Tài liệu" }]} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          📖 Tài liệu tham khảo
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Tổng hợp tài liệu, công cụ, và cộng đồng hỗ trợ.
        </p>

        <div className="mt-8 space-y-10">
          {resources.map((section) => (
            <section key={section.category}>
              <h2 className="text-xl font-bold mb-4">{section.category}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border p-4 hover:border-green-500/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-green-600 shrink-0 mt-0.5" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
