import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ChecklistContent } from "./ChecklistContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist & Tiến độ",
  description:
    "Theo dõi tiến độ học tập qua quiz và checklist kiến thức phỏng vấn Android Developer.",
};

export default function ChecklistPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: "Checklist" }]} />
      <ChecklistContent />
    </div>
  );
}
