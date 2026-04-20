"use client";

import { useEffect, useRef, useState } from "react";

export default function SearchPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const basePath = "/android-zero-to-hero/_pagefind";

    // Load CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${basePath}/pagefind-ui.css`;
    document.head.appendChild(css);

    // Load JS
    const script = document.createElement("script");
    script.src = `${basePath}/pagefind-ui.js`;
    script.onload = () => {
      try {
        // @ts-ignore
        new window.PagefindUI({
          element: containerRef.current,
          bundlePath: `${basePath}/`,
          pageSize: 10,
          autofocus: true,
          showImages: false,
          showSubResults: true,
          translations: {
            placeholder: "Tìm kiếm: kotlin, compose, mvvm...",
            clear_search: "Xóa",
            load_more: "Xem thêm kết quả",
            search_label: "Tìm kiếm trong trang",
            filters_label: "Bộ lọc",
            zero_results: "Không tìm thấy kết quả cho [SEARCH_TERM]",
            many_results: "[COUNT] kết quả cho [SEARCH_TERM]",
            one_result: "[COUNT] kết quả cho [SEARCH_TERM]",
            total_zero_results: "Không có kết quả",
            total_one_result: "[COUNT] kết quả",
            total_many_results: "[COUNT] kết quả",
            searching: "Đang tìm kiếm [SEARCH_TERM]...",
            results_label: "Kết quả tìm kiếm",
          },
        });
        setLoaded(true);
      } catch {
        setError(true);
      }
    };
    script.onerror = () => setError(true);
    document.head.appendChild(script);

    return () => {
      css.remove();
      script.remove();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          🔍 Tìm kiếm
        </h1>
        <p className="mt-3 text-muted-foreground">
          Tìm bài học, dự án, tài liệu theo từ khóa.
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            ⚠️ Không thể tải search engine. Vui lòng thử lại sau.
          </div>
        )}

        {/* PagefindUI will render here */}
        <div ref={containerRef} className="mt-6" />

        {/* Suggested searches when not loaded yet */}
        {!loaded && !error && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">💡 Gợi ý tìm kiếm</h2>
            <div className="flex flex-wrap gap-2">
              {["Kotlin", "Compose", "MVVM", "Room Database", "Retrofit", "Navigation", "Testing", "Coroutines"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
