import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PROJECTS } from "@/lib/constants";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `Dự án: ${project.title}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb
        items={[
          { label: "Dự án", href: "/projects" },
          { label: project.title },
        ]}
      />

      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="text-sm font-medium">{project.difficulty}</span>
          <h1 className="text-4xl font-bold tracking-tight mt-2">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{project.week}</p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">
            🛠️ Hướng dẫn dự án sẽ được viết bằng MDX.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Dự án: {project.title}
          </p>
        </div>
      </article>
    </div>
  );
}
