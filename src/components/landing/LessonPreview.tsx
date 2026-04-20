import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ALL_LESSONS } from "@/lib/constants";
import { LessonCard } from "@/components/content/LessonCard";

export function LessonPreview() {
  const firstLesson = ALL_LESSONS[0];
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            📝 Preview bài học
          </h2>
          <p className="mt-3 text-muted-foreground">
            Mỗi bài học bao gồm lý thuyết, ví dụ code, và case study thực tế.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Code preview */}
          <div className="rounded-lg border bg-zinc-950 p-5 mb-6">
            <div className="text-xs text-zinc-500 mb-2">main.kt</div>
            <pre className="text-sm text-zinc-100 overflow-x-auto">
              <code>{`fun main() {
    val name = "Android"
    val version = 15

    // String template
    println("Hello, $name!")
    println("Version: $version")
}`}</code>
            </pre>
          </div>

          {/* Callout */}
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 mb-6">
            <p className="text-sm">
              💡 <strong>Tip:</strong> Kotlin sử dụng{" "}
              <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">
                val
              </code>{" "}
              cho immutable và{" "}
              <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">
                var
              </code>{" "}
              cho mutable biến.
            </p>
          </div>

          <div className="text-center">
            <Link
              href={`/learn/${firstLesson.slug}`}
              className="inline-flex items-center gap-1 text-green-600 hover:underline"
            >
              Đọc bài học đầy đủ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
