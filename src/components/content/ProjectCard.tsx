import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  title: string;
  week: string;
  difficulty: string;
  skills: string[];
  description: string;
  className?: string;
}

export function ProjectCard({
  slug,
  title,
  week,
  difficulty,
  skills,
  description,
  className,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <div
        className={cn(
          "group rounded-lg border p-5 transition-all hover:border-primary/50 hover:shadow-md",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-muted-foreground">
              {difficulty}
            </span>
            <h3 className="mt-1 text-lg font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{week}</p>
      </div>
    </Link>
  );
}
