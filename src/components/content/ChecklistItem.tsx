"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  text: string;
  defaultChecked?: boolean;
}

export function ChecklistItem({
  text,
  defaultChecked = false,
}: ChecklistItemProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <button
      onClick={() => setChecked(!checked)}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all",
        checked
          ? "border-green-500/30 bg-green-500/5"
          : "hover:border-primary/30 hover:bg-accent/50"
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-green-500 bg-green-500 text-white"
            : "border-muted-foreground/30"
        )}
      >
        {checked && <Check className="h-3 w-3" />}
      </div>
      <span
        className={cn(
          "text-sm transition-all",
          checked && "text-muted-foreground line-through"
        )}
      >
        {text}
      </span>
    </button>
  );
}
