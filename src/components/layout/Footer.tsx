import Link from "next/link";
import { Smartphone, Globe, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Smartphone className="h-5 w-5 text-green-600" />
              Android Zero to Hero
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Lộ trình học Android Development 30 ngày. Từ số 0 đến Junior
              Android Developer.
            </p>
          </div>

          {/* Lộ trình */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Lộ trình</h3>
            <ul className="space-y-2">
              {[
                { href: "/roadmap/week-1", label: "Tuần 1: Kotlin" },
                { href: "/roadmap/week-2", label: "Tuần 2: Compose" },
                { href: "/roadmap/week-3", label: "Tuần 3: Architecture" },
                { href: "/roadmap/week-4", label: "Tuần 4: Engineering" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dự án */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Dự án</h3>
            <ul className="space-y-2">
              {[
                { href: "/projects/habit-tracker", label: "Habit Tracker" },
                { href: "/projects/notes-app", label: "Notes App" },
                { href: "/projects/movie-browser", label: "Movie Browser" },
                { href: "/projects/clean-arch-sample", label: "Clean Arch" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tài nguyên */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Tài nguyên</h3>
            <ul className="space-y-2">
              {[
                { href: "/resources", label: "Tài liệu" },
                { href: "/checklist", label: "Checklist" },
                { href: "/search", label: "Tìm kiếm" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Android Zero to Hero. MIT License.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
