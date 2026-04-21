"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { DataTable } from "@/components/admin/DataTable";
import { WEEKS } from "@/lib/constants";
import { X, Save } from "lucide-react";

interface WeekRow { number: number; title: string; theme: string; description: string; difficulty: string }

export default function AdminWeeksPage() {
  const [items, setItems] = useState<WeekRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<WeekRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) { setItems(WEEKS.map(w => ({ number: w.number, title: w.title, theme: w.theme, description: w.description, difficulty: w.difficulty }))); setLoading(false); return; }
    const { data } = await supabase.from("weeks").select("*").order("number");
    setItems((data as WeekRow[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured) return;
    setSaving(true); setMsg(null);
    const { error } = await supabase.from("weeks").upsert(editing, { onConflict: "number" });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Đã lưu!" }); fetchItems(); setTimeout(() => setEditing(null), 500); }
    setSaving(false);
  };

  const columns = [
    { key: "number", label: "Tuần", className: "w-16" },
    { key: "title", label: "Tiêu đề" },
    { key: "theme", label: "Chủ đề" },
    { key: "difficulty", label: "Độ khó", render: (w: WeekRow) => <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{w.difficulty}</span> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">📅 Quản lý Tuần học</h1>
      <p className="text-muted-foreground mb-6">{items.length} tuần</p>
      {msg && <div className={`mb-4 rounded-lg p-3 text-sm ${msg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>{msg.text}</div>}
      <DataTable columns={columns} data={items} loading={loading} searchPlaceholder="Tìm theo title..." searchKeys={["title", "theme"]} getId={(w) => String(w.number)} onEdit={(w) => setEditing({ ...w })} />
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-xl border shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b"><h2 className="font-bold text-lg">Sửa Tuần {editing.number}</h2><button onClick={() => setEditing(null)} className="p-1.5 hover:bg-muted rounded"><X className="h-5 w-5" /></button></div>
            <div className="p-4 space-y-4">
              <div><label className="text-sm font-medium">Tiêu đề</label><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
              <div><label className="text-sm font-medium">Chủ đề</label><input value={editing.theme} onChange={(e) => setEditing({ ...editing, theme: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
              <div><label className="text-sm font-medium">Mô tả</label><textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
              <div><label className="text-sm font-medium">Độ khó</label><input value={editing.difficulty} onChange={(e) => setEditing({ ...editing, difficulty: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" placeholder="⭐" /></div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t"><button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-muted">Hủy</button><button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Đang lưu..." : "Lưu"}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
