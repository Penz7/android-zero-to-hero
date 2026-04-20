import {
  Code2,
  Palette,
  Building2,
  FlaskConical,
  Wifi,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Kotlin",
    desc: "Ngôn ngữ chính thức cho Android. Học từ cú pháp cơ bản đến OOP, Null safety, Extension functions.",
  },
  {
    icon: Palette,
    title: "Jetpack Compose",
    desc: "UI toolkit hiện đại thay thế XML. Declarative UI, State management, Animations.",
  },
  {
    icon: Building2,
    title: "Architecture",
    desc: "MVVM, Clean Architecture, Repository pattern, Dependency Injection với Hilt.",
  },
  {
    icon: FlaskConical,
    title: "Testing",
    desc: "Unit Test, UI Test, Integration Test. CI/CD với GitHub Actions.",
  },
  {
    icon: Wifi,
    title: "Networking",
    desc: "Retrofit, OkHttp, Coroutines, Flow. Fetch, parse, cache dữ liệu từ REST API.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    desc: "Build, sign, optimize APK/AAB. Deploy lên Google Play Store.",
  },
];

export function WhatYouLearn() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            🎯 Bạn sẽ học được gì?
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border bg-background p-5">
              <f.icon className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
