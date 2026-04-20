import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProjectCard } from "@/components/content/ProjectCard";
import { PROJECTS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự án thực hành",
  description:
    "4 dự án Android thực tế từ dễ đến khó: Habit Tracker, Notes App, Movie Browser, Clean Architecture Sample.",
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: "Dự án" }]} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          🛠️ Dự án thực hành
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          4 dự án từ dễ đến khó, giúp bạn áp dụng kiến thức vào thực tế.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
      </div>
    </div>
  );
}
