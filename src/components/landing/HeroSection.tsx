import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-1.5 text-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span>Lộ trình 30 ngày • Kotlin + Jetpack Compose</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Từ số 0 đến{" "}
            <span className="text-green-600">Android Engineer</span>{" "}
            trong 30 ngày
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Lộ trình học có cấu trúc, bài học chi tiết mỗi ngày, project thực tế.
            Học Kotlin, Jetpack Compose, MVVM, và các kỹ năng cần thiết để trở
            thành Junior Android Developer.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/learn/kotlin-intro"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground h-9 px-4 text-base font-medium hover:bg-primary/90 transition-colors"
            >
              🚀 Bắt đầu học ngay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background h-9 px-4 text-base font-medium hover:bg-muted transition-colors"
            >
              📋 Xem lộ trình
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>✅ Miễn phí 100%</span>
            <span className="hidden sm:inline">•</span>
            <span>✅ Mã nguồn mở</span>
            <span className="hidden sm:inline">•</span>
            <span>✅ Cập nhật 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
