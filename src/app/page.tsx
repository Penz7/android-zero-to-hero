import { HeroSection } from "@/components/landing/HeroSection";
import { StatsBar } from "@/components/landing/StatsBar";
import { RoadmapPreview } from "@/components/landing/RoadmapPreview";
import { WhatYouLearn } from "@/components/landing/WhatYouLearn";
import { DailyStructure } from "@/components/landing/DailyStructure";
import { LessonPreview } from "@/components/landing/LessonPreview";
import { ProjectsPreview } from "@/components/landing/ProjectsPreview";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";
import { NewsletterForm } from "@/components/landing/NewsletterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Android từ số 0 đến Engineering trong 1 tháng",
  description:
    "Lộ trình học Android Development 30 ngày với Kotlin & Jetpack Compose. Từ người mới bắt đầu đến Junior Android Developer.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <RoadmapPreview />
      <WhatYouLearn />
      <DailyStructure />
      <LessonPreview />
      <ProjectsPreview />
      <FAQSection />
      <CTASection />
      <NewsletterForm />
    </>
  );
}
