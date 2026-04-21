"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Link from "next/link";
import { BookOpen, Brain, Code2, Calendar, FolderOpen, HelpCircle, CheckSquare, RefreshCw } from "lucide-react";

interface Stats {
  lessons: number;
  quizzes: number;
  quizQuestions: number;
  playgrounds: number;
  weeks: number;
  projects: number;
  faqs: number;
  checklistItems: number;
}

const CARDS = [
  { key: "lessons" as keyof Stats, label: "Bài học", icon: BookOpen, href: "/admin/lessons", color: "bg-blue-500" },
  { key: "quizzes" as keyof Stats, label: "Quiz", icon: Brain, href: "/admin/quizzes", color: "bg-purple-500" },
  { key: "playgrounds" as keyof Stats, label: "Playground", icon: Code2, href: "/admin/playgrounds", color: "bg-green-500" },
  { key: "weeks" as keyof Stats, label: "Tuần học", icon: Calendar, href: "/admin/weeks", color: "bg-orange-500" },
  { key: "projects" as keyof Stats, label: "Dự án", icon: FolderOpen, href: "/admin/projects", color: "bg-pink-500" },
  { key: "faqs" as keyof Stats, label: "FAQ", icon: HelpCircle, href: "/admin/faqs", color: "bg-cyan-500" },
  { key: "checklistItems" as keyof Stats, label: "Checklist", icon: CheckSquare, href: "/admin/checklist", color: "bg-yellow-500" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    if (!isSupabaseConfigured) {
      setStats({ lessons: 30, quizzes: 28, quizQuestions: 69, playgrounds: 17, weeks: 4, projects: 4, faqs: 6, checklistItems: 33 });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [lessons, quizzes, questions, playgrounds, weeks, projects, faqs, checklist] = await Promise.all([
        supabase.from("lessons").select("*", { count: "exact", head: true }),
        supabase.from("quizzes").select("*", { count: "exact", head: true }),
        supabase.from("quiz_questions").select("*", { count: "exact", head: true }),
        supabase.from("playground_snippets").select("*", { count: "exact", head: true }),
        supabase.from("weeks").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("faqs").select("*", { count: "exact", head: true }),
        supabase.from("checklist_items").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        lessons: lessons.count ?? 0,
        quizzes: quizzes.count ?? 0,
        quizQuestions: questions.count ?? 0,
        playgrounds: playgrounds.count ?? 0,
        weeks: weeks.count ?? 0,
        projects: projects.count ?? 0,
        faqs: faqs.count ?? 0,
        checklistItems: checklist.count ?? 0,
      });
    } catch (err) {
      console.error("Fetch stats error:", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Quản lý nội dung trang học Android</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="group rounded-xl border bg-background p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`rounded-lg p-2 ${card.color} text-white`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="h-8 w-16 bg-muted rounded animate-pulse" />
              ) : (
                stats?.[card.key] ?? 0
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{card.label}</div>
          </Link>
        ))}

        {/* Quiz Questions card */}
        <div className="rounded-xl border bg-background p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="rounded-lg p-2 bg-indigo-500 text-white">
              <Brain className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold">
            {loading ? (
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            ) : (
              stats?.quizQuestions ?? 0
            )}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Câu hỏi Quiz</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold mb-4">Hướng dẫn sử dụng</h2>
        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-1">📝 Quản lý bài học</h3>
            <p className="text-muted-foreground">Sửa title, description, nội dung MDX của từng bài học</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-1">🧠 Quản lý Quiz</h3>
            <p className="text-muted-foreground">Thêm/sửa/xóa câu hỏi quiz cho mỗi bài học</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-1">💻 Quản lý Playground</h3>
            <p className="text-muted-foreground">Sửa code snippets chạy thử trong bài học</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-1">📅 Tuần & Dự án</h3>
            <p className="text-muted-foreground">Quản lý tuần học, dự án, FAQ, checklist phỏng vấn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
