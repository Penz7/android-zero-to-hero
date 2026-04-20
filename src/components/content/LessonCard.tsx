import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface LessonCardProps {
  slug: string;
  title: string;
  day: number;
  week: number;
  difficulty: string;
  duration: string;
  description: string;
  className?: string;
}

const difficultyColor: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  expert: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function LessonCard({
  slug,
  title,
  day,
  week,
  difficulty,
  duration,
  description,
  className,
}: LessonCardProps) {
  return (
    <Link href={`/learn/${slug}`}>
      <div
        className={cn(
          "group rounded-lg border p-4 transition-all hover:border-primary/50 hover:shadow-md",
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-medium text-muted-foreground">
                Day {day}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  difficultyColor[difficulty] || difficultyColor.beginner
                )}
              >
                {difficulty}
              </span>
            </div>
            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Tuần {week}
              </span>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 shrink-0" />
        </div>
      </div>
    </Link>
  );
}
