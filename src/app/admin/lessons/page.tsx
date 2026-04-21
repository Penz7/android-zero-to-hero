"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { DataTable } from "@/components/admin/DataTable";
import { ALL_LESSONS } from "@/lib/constants";
import { getQuizBySlug } from "@/data/quizzes";
import { getPlaygroundBySlug } from "@/data/playgrounds";
import { X, Save } from "lucide-react";

interface LessonRow {
  slug: string;
  title: string;
  day: number;
  week: number;
  difficulty: string;
  duration: string;
  tags: string[];
  description: string;
  content: string;
}

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<LessonRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchLessons = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setLessons(ALL_LESSONS.map((l) => ({ ...l, content: "" })));
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("lessons").select("*").order("day");
    setLessons((data as LessonRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLessons(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured) return;
    setSaving(true);
    setMsg(null);
    const { error } = await supabase.from("lessons").upsert({
      slug: editing.slug,
      title: editing.title,
      day: editing.day,
      week: editing.week,
      difficulty: editing.difficulty,
      duration: editing.duration,
      tags: editing.tags,
      description: editing.description,
      content: editing.content,
    }, { onConflict: "slug" });
    if (error) {
      setMsg({ type: "error", text: `Lỗi: ${error.message}` });
    } else {
      setMsg({ type: "success", text: "Đã lưu!" });
      fetchLessons();
      setTimeout(() => setEditing(null), 500);
    }
    setSaving(false);
  };

  const columns = [
    { key: "day", label: "Day", className: "w-16" },
    { key: "slug", label: "Slug", className: "font-mono text-xs" },
    { key: "title", label: "Tiêu đề" },
    { key: "week", label: "Tuần", className: "w-16" },
    {
      key: "difficulty",
      label: "Level",
      render: (l: LessonRow) => (
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{l.difficulty}</span>
      ),
    },
    { key: "duration", label: "Thời lượng", className: "w-24 text-muted-foreground" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">📝 Quản lý Bài học</h1>
      <p className="text-muted-foreground mb-6">{lessons.length} bài học</p>

      {msg && (
        <div className={`mb-4 rounded-lg p-3 text-sm ${msg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {msg.text}
        </div>
      )}

      <DataTable
        columns={columns}
        data={lessons}
        loading={loading}
        searchPlaceholder="Tìm theo slug, title..."
        searchKeys={["slug", "title", "tags"]}
        getId={(l) => l.slug}
        onEdit={(l) => setEditing({ ...l })}
      />

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-xl border shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background">
              <h2 className="font-bold text-lg">Sửa: {editing.slug}</h2>
              <button onClick={() => setEditing(null)} className="p-1.5 hover:bg-muted rounded"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tiêu đề</label>
                  <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <input value={editing.slug} disabled className="w-full mt-1 px-3 py-2 rounded-lg border bg-muted text-sm font-mono" />
                </div>
                <div>
                  <label className="text-sm font-medium">Day</label>
                  <input type="number" value={editing.day} onChange={(e) => setEditing({ ...editing, day: parseInt(e.target.value) })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">Week</label>
                  <input type="number" value={editing.week} onChange={(e) => setEditing({ ...editing, week: parseInt(e.target.value) })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">Difficulty</label>
                  <select value={editing.difficulty} onChange={(e) => setEditing({ ...editing, difficulty: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm">
                    <option value="beginner">beginner</option>
                    <option value="intermediate">intermediate</option>
                    <option value="advanced">advanced</option>
                    <option value="expert">expert</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Thời lượng</label>
                  <input value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Mô tả</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Nội dung (MDX)</label>
                <textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={16} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm font-mono" placeholder="Nhập nội dung markdown..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t sticky bottom-0 bg-background">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-muted transition-colors">Hủy</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors">
                <Save className="h-4 w-4" />
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
