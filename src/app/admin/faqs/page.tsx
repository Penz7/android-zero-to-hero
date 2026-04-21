"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { DataTable } from "@/components/admin/DataTable";
import { FAQS } from "@/lib/constants";
import { X, Save } from "lucide-react";

interface FaqRow { id: string; question: string; answer: string; sort_order: number }

export default function AdminFaqsPage() {
  const [items, setItems] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FaqRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) { setItems(FAQS.map((f, i) => ({ id: `s-${i}`, question: f.question, answer: f.answer, sort_order: i }))); setLoading(false); return; }
    const { data } = await supabase.from("faqs").select("*").order("sort_order");
    setItems((data as FaqRow[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured) return;
    setSaving(true); setMsg(null);
    const payload = editing.id.startsWith("s-") ? { question: editing.question, answer: editing.answer, sort_order: editing.sort_order } : editing;
    const { error } = await supabase.from("faqs").upsert(payload, { onConflict: editing.id.startsWith("s-") ? undefined : "id" });
    if (error) setMsg({ type: "error", text: error.message });
    else { setMsg({ type: "success", text: "Đã lưu!" }); fetchItems(); setTimeout(() => setEditing(null), 500); }
    setSaving(false);
  };

  const handleDelete = async (item: FaqRow) => {
    if (!isSupabaseConfigured || !confirm("Xóa FAQ này?")) return;
    await supabase.from("faqs").delete().eq("id", item.id);
    fetchItems();
  };

  const columns = [
    { key: "question", label: "Câu hỏi" },
    { key: "answer", label: "Trả lời", render: (f: FaqRow) => <span className="text-xs text-muted-foreground">{f.answer.slice(0, 80)}...</span> },
    { key: "sort_order", label: "STT", className: "w-16" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">❓ Quản lý FAQ</h1>
      <p className="text-muted-foreground mb-6">{items.length} câu hỏi</p>
      {msg && <div className={`mb-4 rounded-lg p-3 text-sm ${msg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>{msg.text}</div>}
      <DataTable columns={columns} data={items} loading={loading} searchPlaceholder="Tìm theo câu hỏi..." searchKeys={["question"]} getId={(f) => f.id} onEdit={(f) => setEditing({ ...f })} onDelete={handleDelete} onAdd={() => setEditing({ id: `s-${Date.now()}`, question: "", answer: "", sort_order: items.length })} />
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-xl border shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b"><h2 className="font-bold text-lg">{editing.id.startsWith("s-") ? "Thêm" : "Sửa"} FAQ</h2><button onClick={() => setEditing(null)} className="p-1.5 hover:bg-muted rounded"><X className="h-5 w-5" /></button></div>
            <div className="p-4 space-y-4">
              <div><label className="text-sm font-medium">Câu hỏi</label><textarea value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} rows={2} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
              <div><label className="text-sm font-medium">Trả lời</label><textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={4} className="w-full mt-1 px-3 py-2 rounded-lg border bg-background text-sm" /></div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t"><button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-muted">Hủy</button><button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Đang lưu..." : "Lưu"}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
