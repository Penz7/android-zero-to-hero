"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { saveQuizToCloud } from "@/lib/sync";
import { rateLimit } from "@/lib/rate-limit";
import type { QuizQuestion } from "@/data/quizzes";

interface LessonQuizProps {
  slug: string;
  questions: QuizQuestion[];
}

interface QuizState {
  answers: (number | null)[];
  submitted: boolean;
  score: number;
}

export function LessonQuiz({ slug, questions }: LessonQuizProps) {
  const storageKey = `quiz_${slug}`;
  const { user } = useAuth();

  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState<QuizState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Validate: ensure answers array exists and has correct length
          if (Array.isArray(parsed.answers) && parsed.answers.length === questions.length) {
            return parsed;
          }
          // Data from cloud sync (no answers field) — reconstruct answers
          if (parsed.submitted && typeof parsed.score === "number") {
            return {
              answers: new Array(questions.length).fill(null),
              submitted: parsed.submitted,
              score: parsed.score,
            };
          }
        } catch {}
      }
    }
    return { answers: new Array(questions.length).fill(null), submitted: false, score: 0 };
  });

  useEffect(() => {
    if (state.submitted) {
      localStorage.setItem(storageKey, JSON.stringify(state));
      // Sync to Supabase if logged in
      if (user) {
        saveQuizToCloud(slug, state.score, questions.length);
      }
      // Dispatch custom event so checklist can listen
      window.dispatchEvent(
        new CustomEvent("quiz-completed", {
          detail: { slug, score: state.score, total: questions.length },
        })
      );
    }
  }, [state.submitted]);

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    if (state.submitted) return;
    const newAnswers = [...state.answers];
    newAnswers[questionIndex] = answerIndex;
    setState({ ...state, answers: newAnswers });
  };

  const submit = () => {
    // Rate limit: 1 submit per 3 seconds
    if (!rateLimit(`quiz-submit-${slug}`, 3000)) return;

    const score = state.answers.reduce((acc: number, answer, i) => {
      return acc + (answer === questions[i].correctIndex ? 1 : 0);
    }, 0);
    setState({ ...state, submitted: true, score });
  };

  const reset = () => {
    const newState = { answers: new Array(questions.length).fill(null), submitted: false, score: 0 };
    setState(newState);
    localStorage.removeItem(storageKey);
  };

  const allAnswered = Array.isArray(state.answers) && state.answers.every((a) => a !== null);
  const passed = state.submitted && state.score >= Math.ceil(questions.length * 0.7);

  return (
    <div className="mt-10 rounded-lg border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div className="text-left">
            <h2 className="font-semibold">Quiz kiểm tra bài học</h2>
            <p className="text-sm text-muted-foreground">
              {questions.length} câu hỏi • {state.submitted ? `${state.score}/${questions.length} đúng` : "Chưa làm"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {state.submitted && passed && (
            <span className="rounded-full bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5">
              ✅ Đã pass
            </span>
          )}
          {state.submitted && !passed && (
            <span className="rounded-full bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5">
              ❌ Chưa pass
            </span>
          )}
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="p-4 sm:p-6 space-y-6">
          {questions.map((q, qi) => (
            <div key={qi} className="space-y-3">
              <p className="font-medium">
                <span className="text-green-600 mr-1">Câu {qi + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((option, oi) => {
                  const isSelected = state.answers[qi] === oi;
                  const isCorrect = oi === q.correctIndex;
                  const showResult = state.submitted;

                  let borderColor = "border-muted-foreground/20 hover:border-green-500/50";
                  let bgColor = "";
                  let icon = null;

                  if (showResult) {
                    if (isCorrect) {
                      borderColor = "border-green-500";
                      bgColor = "bg-green-50";
                      icon = <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />;
                    } else if (isSelected && !isCorrect) {
                      borderColor = "border-red-500";
                      bgColor = "bg-red-50";
                      icon = <XCircle className="h-4 w-4 text-red-600 shrink-0" />;
                    }
                  } else if (isSelected) {
                    borderColor = "border-green-500";
                    bgColor = "bg-green-50";
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => selectAnswer(qi, oi)}
                      disabled={state.submitted}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all",
                        borderColor,
                        bgColor,
                        !state.submitted && "cursor-pointer",
                        state.submitted && "cursor-default"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                          isSelected && !showResult && "border-green-500 bg-green-500 text-white",
                          showResult && isCorrect && "border-green-500 bg-green-500 text-white",
                          showResult && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white",
                          !isSelected && !showResult && "border-muted-foreground/30"
                        )}
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {state.submitted && (
                <div
                  className={cn(
                    "rounded-lg border p-3 text-sm",
                    state.answers[qi] === q.correctIndex
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-yellow-200 bg-yellow-50 text-yellow-800"
                  )}
                >
                  <strong>💡 Giải thích:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t">
            {!state.submitted ? (
              <button
                onClick={submit}
                disabled={!allAnswered}
                className={cn(
                  "rounded-lg px-6 py-2.5 text-sm font-medium transition-colors",
                  allAnswered
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                Nộp bài
              </button>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Trophy className={cn("h-5 w-5", passed ? "text-green-600" : "text-yellow-600")} />
                  <span className="font-semibold">
                    {state.score}/{questions.length} đúng
                    {passed ? " — Chúc mừng! 🎉" : " — Ôn lại nhé!"}
                  </span>
                </div>
                <button
                  onClick={reset}
                  className="ml-auto flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Làm lại
                </button>
              </>
            )}

            {!allAnswered && !state.submitted && (
              <span className="text-sm text-muted-foreground">
                Chọn đáp án cho tất cả câu hỏi
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
