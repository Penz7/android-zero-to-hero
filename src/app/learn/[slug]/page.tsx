import { notFound } from "next/navigation";
import { ALL_LESSONS } from "@/lib/constants";
import { LessonPageContent } from "./LessonPageContent";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = ALL_LESSONS.find((l) => l.slug === slug);
  if (!lesson) return { title: "Not Found" };
  return {
    title: `${lesson.title} — Day ${lesson.day}/30`,
    description: lesson.description,
    keywords: ["android", "kotlin", ...lesson.tags],
    openGraph: {
      title: `${lesson.title} — Day ${lesson.day}/30`,
      description: lesson.description,
      images: ["/images/og/lesson.svg"],
    },
  };
}

// Fallback: read MDX from filesystem at build time
function getStaticLessonContent(slug: string): string | null {
  try {
    const lessonsDir = path.join(process.cwd(), "src/content/lessons");
    const files = fs.readdirSync(lessonsDir);
    const file = files.find((f) => f.includes(slug) && f.endsWith(".mdx"));
    if (!file) return null;
    return fs.readFileSync(path.join(lessonsDir, file), "utf-8");
  } catch {
    return null;
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lessonExists = ALL_LESSONS.some((l) => l.slug === slug);
  if (!lessonExists) notFound();

  // Pre-load MDX content as fallback (used when Supabase is not configured)
  const staticContent = getStaticLessonContent(slug);

  return <LessonPageContent slug={slug} staticContent={staticContent} />;
}
