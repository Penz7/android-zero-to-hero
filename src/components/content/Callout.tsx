import { cn } from "@/lib/utils";
import { Lightbulb, AlertTriangle, Info, Zap } from "lucide-react";
import React from "react";

interface CalloutProps {
  type?: "tip" | "warning" | "info" | "important";
  title?: string;
  children: React.ReactNode;
}

const icons = {
  tip: Lightbulb,
  warning: AlertTriangle,
  info: Info,
  important: Zap,
};

const styles = {
  tip: "border-green-500/30 bg-green-500/5 text-green-900 dark:text-green-100",
  warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-900 dark:text-yellow-100",
  info: "border-blue-500/30 bg-blue-500/5 text-blue-900 dark:text-blue-100",
  important: "border-purple-500/30 bg-purple-500/5 text-purple-900 dark:text-purple-100",
};

const iconStyles = {
  tip: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  info: "text-blue-600 dark:text-blue-400",
  important: "text-purple-600 dark:text-purple-400",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = icons[type];
  return (
    <div className={cn("my-6 rounded-lg border p-4", styles[type])}>
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconStyles[type])} />
        <div className="flex-1">
          {title && <p className="mb-1 font-semibold">{title}</p>}
          <div className="text-sm [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
