"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4 max-w-md text-center">
        <h3 className="font-semibold text-lg">📧 Nhận cập nhật bài học mới</h3>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "..." : "Đăng ký"}
          </Button>
        </form>
        {status === "success" && (
          <p className="mt-2 text-sm text-green-600">
            ✅ Đăng ký thành công!
          </p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Không spam. Chỉ gửi khi có bài học mới. Hủy bất cứ lúc nào.
        </p>
      </div>
    </section>
  );
}
