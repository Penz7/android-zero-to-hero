"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { DataTable } from "@/components/admin/DataTable";
import { getPlaygroundBySlug } from "@/data/playgrounds";
import { X, Save } from "lucide-react";

interface Snippet {
  id: string;
  lesson_slug: string;
  label: string;
  code: string;
  sort_order: number;
}

export default function AdminPlaygroundsPage() {
  const [items, setItems] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Snippet | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      const staticPg = getPlaygroundBySlug("").map((s, i) => ({ id: `s-${i}`, lesson_slug: "", label: s.title, code: s.code, sort_order: i }));
      setItems(staticPg);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("playground_snippets").select("*").order("lesson_slug").order("sort_order");
    setItems((data as Snippet[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured) return;
    setSaving(true); setMsg(null);
    const { error } = await supabase.from("playground_snippets").upsert({
      id: editing.id || undefined,
      lesson_slug: editing.lesson_slug,
      label: editing.label,
      code: editing.code,
      sort_order: editing.sort_order,
    });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Đã lưu!" }); fetchItems(); setTimeout(() => setEditing(null), 500); }
    setSaving(false);
  };

  const handleDelete = async (item: Snippet) => {
    if (!isSupabaseConfigured || !confirm("Xóa playground này?")) return;
    await supabase.from("playground_snippets").delete().eq("id", item.id);
    fetchItems();
  };

  const columns = [
    { key: "lesson_slug", label: "Lesson", className: "font-mono text-xs w-40" },
    { key: "label", label: "Label" },
    { key: "code", label: "Code", render: (s: Snippet) => <span className="text-xs text-muted-foreground">{s.code.slice(0, 60)}...</span> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">💻 Quản lý Playground</h1>
      <p className="text-muted-foreground mb-6">{items.length} snippets</p>
      {msg && <div className={`mb-4 rounded-lg p-3 text-sm ${msg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>{msg.text}</div>}
      <DataTable columns={columns} data={items} loading={loading} searchPlaceholder="Tìm theo lesson slug, label..." searchKeys={["lesson_slug", "label"]} getId={(s) => s.id} onEdit={(s) => setEditing({ ...s })} onDelete={handleDelete} onAdd={() => setEditing({ id: "", lesson_slug: "", label: "", code: "", sort_order: 0 })} />

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-xl border shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background">
              <h2 className="font-bold text-lg">{editing.id ? "Sửa" : "Thêm"} Playground</h2>
              <button onClick={() => setEditing(null)} className="p-1.5 hover:bg-muted rounded"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div><label className="text-sm font-medium">Lesson Slug</label><input value={editing.lesson_slug} onChange={(e) => setEditing({ ...editing, lesson_slug: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm font-mono" /></div>
                <div><label className="text-sm font-medium">Label</label><input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
                <div><label className="text-sm font-medium">Sort Order</label><input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
              </div>
              <div><label className="text-sm font-medium">Code</label><textarea value={editing.code} onChange={(e) => setEditing({ ...editing, code: e.target.value })} rows={12} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm font-mono" /></div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t sticky bottom-0 bg-background">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-muted">Hủy</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Đang lưu..." : "Lưu"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
