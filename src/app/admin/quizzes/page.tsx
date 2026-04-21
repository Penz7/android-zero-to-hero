"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { DataTable } from "@/components/admin/DataTable";
import { X, Save, Plus, Trash2 } from "lucide-react";

interface Question {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  sort_order: number;
}

interface QuizWithQuestions {
  lesson_slug: string;
  questions: Question[];
}

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizWithQuestions[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<QuizWithQuestions | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchQuizzes = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) { setLoading(false); return; }
    const { data: quizData } = await supabase.from("quizzes").select("id, lesson_slug").order("lesson_slug");
    if (!quizData) { setLoading(false); return; }

    const results: QuizWithQuestions[] = [];
    for (const q of quizData) {
      const { data: qData } = await supabase.from("quiz_questions").select("*").eq("quiz_id", q.id).order("sort_order");
      results.push({ lesson_slug: q.lesson_slug, questions: (qData as Question[]) ?? [] });
    }
    setQuizzes(results);
    setLoading(false);
  };

  useEffect(() => { fetchQuizzes(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured) return;
    setSaving(true); setMsg(null);

    const { data: quizRow } = await supabase.from("quizzes").select("id").eq("lesson_slug", editing.lesson_slug).single();
    if (!quizRow) { setMsg({ type: "error", text: "Quiz không tồn tại" }); setSaving(false); return; }

    // Delete existing questions and re-insert
    await supabase.from("quiz_questions").delete().eq("quiz_id", quizRow.id);
    const inserts = editing.questions.map((q, i) => ({
      quiz_id: quizRow.id,
      question: q.question,
      options: q.options,
      correct_index: q.correct_index,
      explanation: q.explanation,
      sort_order: i,
    }));
    const { error } = await supabase.from("quiz_questions").insert(inserts);
    if (error) {
      setMsg({ type: "error", text: `Lỗi: ${error.message}` });
    } else {
      setMsg({ type: "success", text: "Đã lưu!" });
      fetchQuizzes();
      setTimeout(() => setEditing(null), 500);
    }
    setSaving(false);
  };

  const columns = [
    { key: "lesson_slug", label: "Lesson", className: "font-mono text-xs" },
    { key: "questions", label: "Câu hỏi", render: (q: QuizWithQuestions) => `${q.questions.length} câu` },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">🧠 Quản lý Quiz</h1>
      <p className="text-muted-foreground mb-6">{quizzes.length} quiz</p>
      {msg && <div className={`mb-4 rounded-lg p-3 text-sm ${msg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>{msg.text}</div>}

      <DataTable columns={columns} data={quizzes} loading={loading} searchPlaceholder="Tìm theo lesson slug..." searchKeys={["lesson_slug"]} getId={(q) => q.lesson_slug} onEdit={(q) => setEditing(JSON.parse(JSON.stringify(q)))} />

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-xl border shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background">
              <h2 className="font-bold text-lg">Sửa Quiz: {editing.lesson_slug}</h2>
              <button onClick={() => setEditing(null)} className="p-1.5 hover:bg-muted rounded"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-6">
              {editing.questions.map((q, qi) => (
                <div key={qi} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Câu {qi + 1}</span>
                    <button onClick={() => setEditing({ ...editing, questions: editing.questions.filter((_, i) => i !== qi) })} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <textarea value={q.question} onChange={(e) => { const qs = [...editing.questions]; qs[qi] = { ...qs[qi], question: e.target.value }; setEditing({ ...editing, questions: qs }); }} rows={2} className="w-full px-3 py-2 rounded-lg border bg-background text-sm" placeholder="Câu hỏi..." />
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <input type="radio" checked={q.correct_index === oi} onChange={() => { const qs = [...editing.questions]; qs[qi] = { ...qs[qi], correct_index: oi }; setEditing({ ...editing, questions: qs }); }} className="accent-green-600" />
                        <input value={opt} onChange={(e) => { const qs = [...editing.questions]; const opts = [...qs[qi].options]; opts[oi] = e.target.value; qs[qi] = { ...qs[qi], options: opts }; setEditing({ ...editing, questions: qs }); }} className="flex-1 px-3 py-1.5 rounded border bg-background text-sm" placeholder={`Đáp án ${String.fromCharCode(65 + oi)}`} />
                      </div>
                    ))}
                  </div>
                  <textarea value={q.explanation} onChange={(e) => { const qs = [...editing.questions]; qs[qi] = { ...qs[qi], explanation: e.target.value }; setEditing({ ...editing, questions: qs }); }} rows={2} className="w-full px-3 py-2 rounded-lg border bg-background text-sm" placeholder="Giải thích..." />
                </div>
              ))}
              <button onClick={() => setEditing({ ...editing, questions: [...editing.questions, { id: "", quiz_id: "", question: "", options: ["", "", "", ""], correct_index: 0, explanation: "", sort_order: editing.questions.length }] })} className="flex items-center gap-1.5 text-sm text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors">
                <Plus className="h-4 w-4" /> Thêm câu hỏi
              </button>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t sticky bottom-0 bg-background">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-muted">Hủy</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50">
                <Save className="h-4 w-4" /> {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
