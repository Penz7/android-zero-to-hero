import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RoadmapContent } from "./RoadmapContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lộ trình 30 ngày",
  description:
    "Lộ trình học Android Development 30 ngày: Kotlin → Jetpack Compose → Architecture → Engineering Level.",
};

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: "Lộ trình" }]} />
      <RoadmapContent />
    </div>
  );
}
