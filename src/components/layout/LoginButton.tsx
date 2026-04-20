"use client";

import { useAuth } from "@/lib/auth-context";
import { LogIn, LogOut, RefreshCw, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LoginButton() {
  const { user, loading, signInWithGitHub, signOut, syncProgress, lastSyncTime } = useAuth();
  const [open, setOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    await syncProgress();
    setSyncing(false);
  };

  if (loading) {
    return (
      <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={signInWithGitHub}
        className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Đăng nhập</span>
      </button>
    );
  }

  const avatar = user.user_metadata?.avatar_url;
  const name = user.user_metadata?.full_name || user.user_metadata?.user_name || user.email;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border px-2 py-1.5 text-sm hover:bg-accent transition-colors"
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-5 w-5 rounded-full"
          />
        ) : (
          <User className="h-4 w-4" />
        )}
        <span className="hidden sm:inline max-w-[100px] truncate">{name}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border bg-popover p-2 shadow-lg z-50">
          <div className="px-3 py-2 border-b mb-1">
            <p className="text-sm font-medium truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>

          <button
            onClick={async () => {
              await handleSync();
              setOpen(false);
            }}
            disabled={syncing}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <RefreshCw className={cn("h-4 w-4", syncing && "animate-spin")} />
            {syncing ? "Đang đồng bộ..." : "Đồng bộ ngay"}
          </button>

          {lastSyncTime && (
            <p className="px-3 py-1 text-xs text-muted-foreground">
              Lần sync: {lastSyncTime.toLocaleTimeString("vi-VN")}
            </p>
          )}

          <div className="border-t mt-1 pt-1">
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
