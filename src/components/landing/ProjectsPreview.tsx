import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { ProjectCard } from "@/components/content/ProjectCard";

export function ProjectsPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            🛠️ Dự án thực hành
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            4 dự án từ dễ đến khó, giúp bạn áp dụng kiến thức vào thực tế.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              week={p.week}
              difficulty={p.difficulty}
              skills={p.skills}
              description={p.description}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background h-9 px-4 text-sm font-medium hover:bg-muted transition-colors"
          >
            Xem tất cả dự án <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
