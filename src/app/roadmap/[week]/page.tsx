import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { WEEKS } from "@/lib/constants";
import { WeekPageContent } from "./WeekPageContent";
import type { Metadata } from "next";

interface WeekPageProps {
  params: Promise<{ week: string }>;
}

export async function generateStaticParams() {
  return WEEKS.map((w) => ({ week: `week-${w.number}` }));
}

export async function generateMetadata({ params }: WeekPageProps): Promise<Metadata> {
  const { week: weekParam } = await params;
  const weekNum = parseInt(weekParam.replace("week-", ""));
  const week = WEEKS.find((w) => w.number === weekNum);
  if (!week) return { title: "Not Found" };
  return {
    title: `Tuần ${week.number}: ${week.title}`,
    description: week.description,
  };
}

export default async function WeekPage({ params }: WeekPageProps) {
  const { week: weekParam } = await params;
  const weekNum = parseInt(weekParam.replace("week-", ""));
  const weekExists = WEEKS.some((w) => w.number === weekNum);
  if (!weekExists) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb
        items={[
          { label: "Lộ trình", href: "/roadmap" },
          { label: `Tuần ${weekNum}` },
        ]}
      />
      <WeekPageContent weekNum={weekNum} />
    </div>
  );
}
