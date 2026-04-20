const stats = [
  { value: "30", label: "bài học", desc: "Lý thuyết + ví dụ code chi tiết" },
  { value: "4", label: "tuần", desc: "Từ cơ bản đến nâng cao" },
  { value: "4", label: "dự án", desc: "Thực hành thực tế" },
  { value: "100%", label: "miễn phí", desc: "Mã nguồn mở GitHub" },
];

export function StatsBar() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {stat.value}
              </div>
              <div className="mt-1 font-medium">{stat.label}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
