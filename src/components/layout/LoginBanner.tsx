"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { X, Info } from "lucide-react";

export function LoginBanner() {
  const { user, loading } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("login_banner_dismissed");
    if (isDismissed) setDismissed(true);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("login_banner_dismissed", "true");
  };

  // Don't show if: loading, logged in, or dismissed
  if (loading || user || dismissed) return null;

  return (
    <div className="border-b bg-blue-50/80 dark:bg-blue-950/30">
      <div className="container mx-auto px-4 py-2.5 flex items-center gap-3 text-sm">
        <Info className="h-4 w-4 text-blue-600 shrink-0" />
        <p className="flex-1 text-blue-800 dark:text-blue-200">
          💡 Bạn chưa đăng nhập — tiến độ học sẽ không được lưu lại giữa các
          thiết bị.{" "}
          <span className="hidden sm:inline">
            Đăng nhập bằng GitHub để đồng bộ miễn phí.
          </span>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        >
          <X className="h-4 w-4 text-blue-600" />
        </button>
      </div>
    </div>
  );
}
