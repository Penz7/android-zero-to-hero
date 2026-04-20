import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-green-600/5 border-y">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          🚀 Sẵn sàng trở thành Android Engineer?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Bắt đầu ngay với bài học đầu tiên — hoàn toàn miễn phí. Mã nguồn mở
          trên GitHub.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/learn/kotlin-intro"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground h-10 px-6 text-base font-medium hover:bg-primary/90 transition-colors"
          >
            🎯 Bắt đầu Day 1: Giới thiệu Kotlin
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
