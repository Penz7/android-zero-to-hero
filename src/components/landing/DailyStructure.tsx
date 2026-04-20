import { BookOpen, Code2, Building2 } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "📖 Lý thuyết",
    desc: "Giải thích concept từ cơ bản đến nâng cao. Tại sao cần biết? Khi nào dùng?",
  },
  {
    icon: Code2,
    title: "💻 Ví dụ code",
    desc: "Code snippet có comment từng dòng. Copy-paste chạy được.",
  },
  {
    icon: Building2,
    title: "🏗️ Case study",
    desc: "Phân tích cách dùng trong app thực tế. Kết nối lý thuyết với thực hành.",
  },
];

export function DailyStructure() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            📅 Cấu trúc mỗi ngày
          </h2>
          <p className="mt-3 text-muted-foreground">
            Mỗi bài học được chia thành 3 phần rõ ràng
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <step.icon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-muted-foreground">
          Học theo tốc độ của bạn. Không áp lực. Không deadline.
        </p>
      </div>
    </section>
  );
}
