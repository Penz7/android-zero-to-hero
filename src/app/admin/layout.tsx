"use client";

import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Brain, Code2, Calendar, FolderOpen, HelpCircle, CheckSquare, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/lessons", label: "Bài học", icon: BookOpen },
  { href: "/admin/quizzes", label: "Quiz", icon: Brain },
  { href: "/admin/playgrounds", label: "Playground", icon: Code2 },
  { href: "/admin/weeks", label: "Tuần học", icon: Calendar },
  { href: "/admin/projects", label: "Dự án", icon: FolderOpen },
  { href: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { href: "/admin/checklist", label: "Checklist", icon: CheckSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signInWithGitHub, signOut } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="max-w-md w-full mx-4 p-8 bg-background rounded-xl border shadow-sm text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">
            Đăng nhập bằng GitHub để quản lý nội dung
          </p>
          <button
            onClick={signInWithGitHub}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-6 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Đăng nhập với GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background">
        <h1 className="font-bold text-lg">🛠️ Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-background border-r transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-4 border-b hidden lg:block">
            <h1 className="font-bold text-lg">🛠️ Admin Panel</h1>
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          </div>
          <div className="p-4 border-b lg:hidden">
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          <nav className="p-2 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  pathname === item.href
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600 transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
