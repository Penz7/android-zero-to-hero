"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { DataTable } from "@/components/admin/DataTable";
import { X, Save } from "lucide-react";

interface CheckItem { id: string; category: string; item_text: string; sort_order: number }

const FALLBACK = [
  { category: "🧑‍💻 Kotlin Mastery", items: ["Hiểu val vs var và khi nào dùng cái nào", "Sử dụng String templates và raw strings", "Viết Lambda expressions và higher-order functions", "Hiểu null safety: ?, ?., ?:, !!", "Viết data class, sealed class, enum class", "Sử dụng extension functions", "Hiểu collection operations: filter, map, reduce", "Sử dụng when expression thay vì switch-case", "Viết suspend functions cơ bản", "Hiểu Coroutine scope và dispatcher"] },
  { category: "🎨 Compose Mastery", items: ["Viết @Composable functions", "Sử dụng Column, Row, Box, Spacer", "Hiểu Modifier chain và thứ tự", "Quản lý state: remember, mutableStateOf", "State hoisting pattern", "Sử dụng LazyColumn/LazyRow", "Navigation với NavHost", "Custom theming: Color, Typography"] },
  { category: "🏗️ Architecture", items: ["Hiểu MVVM pattern", "Tách biệt UI, Domain, Data layers", "Sử dụng ViewModel + StateFlow", "Repository pattern", "Dependency Injection cơ bản với Hilt"] },
  { category: "📋 General Interview Prep", items: ["Kể được 3 project đã làm và role của mình", "Giải thích MVVM cho người mới", "Nói về cách xử lý error trong app", "Hiểu Activity lifecycle", "Giải thích tại sao dùng Coroutines thay Thread", "Nói về cách optimize list performance", "Hiểu Unit Test vs UI Test", "Biết cách deploy lên Play Store", "Có GitHub profile với code samples", "Chuẩn bị câu hỏi cho interviewer"] },
];

export default function AdminChecklistPage() {
  const [items, setItems] = useState<CheckItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CheckItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      const flat: CheckItem[] = [];
      FALLBACK.forEach((cat) => cat.items.forEach((text, i) => flat.push({ id: `s-${cat.category}-${i}`, category: cat.category, item_text: text, sort_order: i })));
      setItems(flat); setLoading(false); return;
    }
    const { data } = await supabase.from("checklist_items").select("*").order("category").order("sort_order");
    setItems((data as CheckItem[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured) return;
    setSaving(true); setMsg(null);
    const isNew = editing.id.startsWith("s-");
    const payload = isNew ? { category: editing.category, item_text: editing.item_text, sort_order: editing.sort_order } : editing;
    const { error } = await supabase.from("checklist_items").upsert(payload, { onConflict: isNew ? undefined : "id" });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Đã lưu!" }); fetchItems(); setTimeout(() => setEditing(null), 500); }
    setSaving(false);
  };

  const handleDelete = async (item: CheckItem) => {
    if (!isSupabaseConfigured || !confirm("Xóa mục này?")) return;
    await supabase.from("checklist_items").delete().eq("id", item.id);
    fetchItems();
  };

  const columns = [
    { key: "category", label: "Danh mục", className: "w-48" },
    { key: "item_text", label: "Nội dung" },
    { key: "sort_order", label: "STT", className: "w-16" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">✅ Quản lý Checklist</h1>
      <p className="text-muted-foreground mb-6">{items.length} mục</p>
      {msg && <div className={`mb-4 rounded-lg p-3 text-sm ${msg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>{msg.text}</div>}
      <DataTable columns={columns} data={items} loading={loading} searchPlaceholder="Tìm theo danh mục, nội dung..." searchKeys={["category", "item_text"]} getId={(c) => c.id} onEdit={(c) => setEditing({ ...c })} onDelete={handleDelete} onAdd={() => setEditing({ id: `s-${Date.now()}`, category: "", item_text: "", sort_order: 0 })} />
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-xl border shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b"><h2 className="font-bold text-lg">{editing.id.startsWith("s-") ? "Thêm" : "Sửa"} Checklist Item</h2><button onClick={() => setEditing(null)} className="p-1.5 hover:bg-muted rounded"><X className="h-5 w-5" /></button></div>
            <div className="p-4 space-y-4">
              <div><label className="text-sm font-medium">Danh mục</label><input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" placeholder="VD: 🧑‍💻 Kotlin Mastery" /></div>
              <div><label className="text-sm font-medium">Nội dung</label><textarea value={editing.item_text} onChange={(e) => setEditing({ ...editing, item_text: e.target.value })} rows={2} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
              <div><label className="text-sm font-medium">Thứ tự</label><input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) })} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t"><button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-muted">Hủy</button><button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Đang lưu..." : "Lưu"}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
