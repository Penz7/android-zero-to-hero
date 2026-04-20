import { Week, FAQ, NavLink } from "./types";

export const SITE_CONFIG = {
  name: "Android Zero to Hero",
  description:
    "Lộ trình học Android Development 30 ngày với Kotlin & Jetpack Compose. Từ số 0 đến Junior Android Developer.",
  url: "https://android-zero-to-hero.github.io",
  ogImage: "/images/og/home.svg",
  links: {
    github: "https://github.com/android-zero-to-hero",
    roadmap: "https://roadmap.sh/android",
  },
};

export const NAV_LINKS: NavLink[] = [
  {
    title: "Lộ trình",
    href: "/roadmap",
    items: [
      { title: "Tuần 1: Kotlin", href: "/roadmap/week-1", description: "Kotlin Fundamentals" },
      { title: "Tuần 2: Compose", href: "/roadmap/week-2", description: "Jetpack Compose Basics" },
      { title: "Tuần 3: Architecture", href: "/roadmap/week-3", description: "MVVM, Room, Retrofit" },
      { title: "Tuần 4: Engineering", href: "/roadmap/week-4", description: "Testing, CI/CD, Deploy" },
    ],
  },
  { title: "Dự án", href: "/projects" },
  { title: "Tài liệu", href: "/resources" },
  { title: "Checklist", href: "/checklist" },
];

export const WEEKS: Week[] = [
  {
    number: 1,
    title: "Kotlin Fundamentals",
    theme: "Nền tảng ngôn ngữ",
    description:
      "Bắt đầu từ cài đặt môi trường, học cú pháp Kotlin cơ bản: biến, hàm, điều kiện, OOP, Collections, Null safety.",
    difficulty: "⭐",
    lessons: [
      "kotlin-intro",
      "kotlin-variables",
      "kotlin-functions",
      "kotlin-control-flow",
      "kotlin-oop",
      "kotlin-collections",
      "kotlin-null-safety",
    ],
  },
  {
    number: 2,
    title: "Jetpack Compose Basics",
    theme: "UI hiện đại",
    description:
      "Làm chủ UI với Compose: Composable functions, Layouts, State, Navigation, Lists, Theming, Animations.",
    difficulty: "⭐⭐",
    lessons: [
      "compose-intro",
      "compose-layouts",
      "compose-state",
      "compose-navigation",
      "compose-lists",
      "compose-theming",
      "compose-advanced-ui",
    ],
  },
  {
    number: 3,
    title: "Architecture & Data",
    theme: "Xây dựng chuyên nghiệp",
    description:
      "MVVM, ViewModel, Coroutines, Room Database, Retrofit, Hilt DI, Clean Architecture.",
    difficulty: "⭐⭐⭐",
    lessons: [
      "mvvm-intro",
      "viewmodel-livedata",
      "coroutines-flow",
      "room-database",
      "retrofit-networking",
      "hilt-di",
      "clean-architecture",
    ],
  },
  {
    number: 4,
    title: "Engineering Level",
    theme: "Kỹ năng Engineer",
    description:
      "Unit/UI Testing, CI/CD, Performance, Security, Deploy Play Store, Phỏng vấn.",
    difficulty: "⭐⭐⭐⭐",
    lessons: [
      "testing-unit",
      "testing-ui",
      "ci-cd-basics",
      "performance",
      "security-basics",
      "play-store-deploy",
      "interview-prep",
    ],
  },
];

export const ALL_LESSONS = [
  // Week 1
  { slug: "kotlin-intro", title: "Giới thiệu Kotlin & Cài đặt môi trường", day: 1, week: 1, difficulty: "beginner" as const, prerequisites: [], duration: "40 phút", tags: ["kotlin", "setup"], description: "Tổng quan về Kotlin, cài đặt Android Studio, tạo project đầu tiên." },
  { slug: "kotlin-variables", title: "Biến, Kiểu dữ liệu & String templates", day: 2, week: 1, difficulty: "beginner" as const, prerequisites: ["kotlin-intro"], duration: "45 phút", tags: ["kotlin", "variables", "types"], description: "Khai báo biến val/var, kiểu dữ liệu cơ bản, string templates." },
  { slug: "kotlin-functions", title: "Functions, Lambda & Higher-order functions", day: 3, week: 1, difficulty: "beginner" as const, prerequisites: ["kotlin-variables"], duration: "50 phút", tags: ["kotlin", "functions", "lambda"], description: "Định nghĩa hàm, tham số mặc định, lambda expressions, higher-order functions." },
  { slug: "kotlin-control-flow", title: "Điều kiện, When expression & Loops", day: 4, week: 1, difficulty: "beginner" as const, prerequisites: ["kotlin-functions"], duration: "45 phút", tags: ["kotlin", "control-flow"], description: "if/else, when expression, for, while, do-while loops." },
  { slug: "kotlin-oop", title: "Lớp, Đối tượng, Kế thừa & Interface", day: 5, week: 1, difficulty: "intermediate" as const, prerequisites: ["kotlin-control-flow"], duration: "60 phút", tags: ["kotlin", "oop"], description: "Class, object, inheritance, interface, abstract class, data class, sealed class." },
  { slug: "kotlin-collections", title: "List, Map, Set & Collection operations", day: 6, week: 1, difficulty: "intermediate" as const, prerequisites: ["kotlin-oop"], duration: "50 phút", tags: ["kotlin", "collections"], description: "Các collection cơ bản, operations: filter, map, reduce, sorted." },
  { slug: "kotlin-null-safety", title: "Null safety, Elvis operator & Extension functions", day: 7, week: 1, difficulty: "intermediate" as const, prerequisites: ["kotlin-collections"], duration: "45 phút", tags: ["kotlin", "null-safety"], description: "Nullable types, safe calls, Elvis operator, extension functions." },
  // Week 2
  { slug: "compose-intro", title: "Jetpack Compose là gì? Composable functions", day: 8, week: 2, difficulty: "intermediate" as const, prerequisites: ["kotlin-null-safety"], duration: "50 phút", tags: ["compose", "composable"], description: "Giới thiệu Compose, @Composable annotation, Text, Button, Image." },
  { slug: "compose-layouts", title: "Column, Row, Box, Spacer & Modifier", day: 9, week: 2, difficulty: "intermediate" as const, prerequisites: ["compose-intro"], duration: "55 phút", tags: ["compose", "layouts", "modifier"], description: "Các layout cơ bản, Modifier chain, padding, size, alignment." },
  { slug: "compose-state", title: "State management: remember, mutableStateOf", day: 10, week: 2, difficulty: "intermediate" as const, prerequisites: ["compose-layouts"], duration: "50 phút", tags: ["compose", "state"], description: "State trong Compose, remember, mutableStateOf, state hoisting." },
  { slug: "compose-navigation", title: "Navigation Component trong Compose", day: 11, week: 2, difficulty: "advanced" as const, prerequisites: ["compose-state"], duration: "55 phút", tags: ["compose", "navigation"], description: "NavHost, NavController, navigate, arguments, deep links." },
  { slug: "compose-lists", title: "LazyColumn, LazyRow & hiệu suất list", day: 12, week: 2, difficulty: "advanced" as const, prerequisites: ["compose-navigation"], duration: "50 phút", tags: ["compose", "lists"], description: "LazyColumn, LazyRow, items, keys, performance optimization." },
  { slug: "compose-theming", title: "Theme, Color, Typography, Dark mode", day: 13, week: 2, difficulty: "advanced" as const, prerequisites: ["compose-lists"], duration: "50 phút", tags: ["compose", "theming"], description: "MaterialTheme, custom colors, typography, dark/light mode." },
  { slug: "compose-advanced-ui", title: "Animations, Custom layouts, Canvas", day: 14, week: 2, difficulty: "advanced" as const, prerequisites: ["compose-theming"], duration: "60 phút", tags: ["compose", "animations"], description: "animateAsState, AnimatedVisibility, custom layouts, Canvas." },
  // Week 3
  { slug: "mvvm-intro", title: "MVVM Architecture & Separation of concerns", day: 15, week: 3, difficulty: "advanced" as const, prerequisites: ["compose-advanced-ui"], duration: "50 phút", tags: ["architecture", "mvvm"], description: "MVVM pattern, separation of concerns, data flow." },
  { slug: "viewmodel-livedata", title: "ViewModel, StateFlow, UI state management", day: 16, week: 3, difficulty: "advanced" as const, prerequisites: ["mvvm-intro"], duration: "55 phút", tags: ["architecture", "viewmodel"], description: "ViewModel lifecycle, StateFlow, collectAsState, UI state." },
  { slug: "coroutines-flow", title: "Kotlin Coroutines & Flow cơ bản", day: 17, week: 3, difficulty: "expert" as const, prerequisites: ["viewmodel-livedata"], duration: "60 phút", tags: ["kotlin", "coroutines", "flow"], description: "suspend, launch, async/await, Flow, operators." },
  { slug: "room-database", title: "Room Database: Entity, DAO, Database", day: 18, week: 3, difficulty: "expert" as const, prerequisites: ["coroutines-flow"], duration: "55 phút", tags: ["data", "room"], description: "Room ORM, Entity, DAO, Database, migrations." },
  { slug: "retrofit-networking", title: "Networking với Retrofit & JSON parsing", day: 19, week: 3, difficulty: "expert" as const, prerequisites: ["room-database"], duration: "55 phút", tags: ["networking", "retrofit"], description: "Retrofit setup, API interface, Moshi/Gson, error handling." },
  { slug: "hilt-di", title: "Dependency Injection với Hilt", day: 20, week: 3, difficulty: "expert" as const, prerequisites: ["retrofit-networking"], duration: "50 phút", tags: ["architecture", "hilt", "di"], description: "Hilt setup, @Inject, @Module, @Provides, scopes." },
  { slug: "clean-architecture", title: "Clean Architecture: Domain, Data, Presentation", day: 21, week: 3, difficulty: "expert" as const, prerequisites: ["hilt-di"], duration: "60 phút", tags: ["architecture", "clean"], description: "Clean Architecture layers, use cases, repository pattern." },
  // Week 4
  { slug: "testing-unit", title: "Unit Testing với JUnit & Mockito", day: 22, week: 4, difficulty: "expert" as const, prerequisites: ["clean-architecture"], duration: "50 phút", tags: ["testing", "junit"], description: "JUnit 5, Mockito, test ViewModel, test Repository." },
  { slug: "testing-ui", title: "UI Testing với Compose Test", day: 23, week: 4, difficulty: "expert" as const, prerequisites: ["testing-unit"], duration: "50 phút", tags: ["testing", "compose-test"], description: "ComposeTestRule, onNodeWithText, performClick, assertions." },
  { slug: "ci-cd-basics", title: "CI/CD cơ bản: GitHub Actions cho Android", day: 24, week: 4, difficulty: "expert" as const, prerequisites: ["testing-ui"], duration: "45 phút", tags: ["devops", "ci-cd"], description: "GitHub Actions workflow, build APK, run tests, deploy." },
  { slug: "performance", title: "Performance: Memory, Layout, Recomposition", day: 25, week: 4, difficulty: "expert" as const, prerequisites: ["ci-cd-basics"], duration: "50 phút", tags: ["performance"], description: "Memory leaks, Layout Inspector, recomposition optimization." },
  { slug: "security-basics", title: "Security: ProGuard, Network Security, Data", day: 26, week: 4, difficulty: "expert" as const, prerequisites: ["performance"], duration: "45 phút", tags: ["security"], description: "R8/ProGuard, network security config, EncryptedSharedPreferences." },
  { slug: "play-store-deploy", title: "Deploy lên Google Play Store", day: 27, week: 4, difficulty: "expert" as const, prerequisites: ["security-basics"], duration: "40 phút", tags: ["deploy", "play-store"], description: "Build AAB, signing, Play Console, store listing." },
  { slug: "interview-prep", title: "Chuẩn bị phỏng vấn Android Developer", day: 28, week: 4, difficulty: "expert" as const, prerequisites: ["play-store-deploy"], duration: "50 phút", tags: ["career", "interview"], description: "Câu hỏi phỏng vấn, portfolio, tips." },
  // Summary
  { slug: "portfolio-project", title: "Xây dựng Portfolio Project hoàn chỉnh", day: 29, week: 4, difficulty: "expert" as const, prerequisites: ["interview-prep"], duration: "60 phút", tags: ["project", "portfolio"], description: "Kết hợp tất cả kiến thức vào 1 project hoàn chỉnh." },
  { slug: "next-steps", title: "Roadmap tiếp theo: Senior Android Engineer", day: 30, week: 4, difficulty: "expert" as const, prerequisites: ["portfolio-project"], duration: "30 phút", tags: ["career"], description: "Con đường tiếp theo sau 30 ngày." },
];

export const FAQS: FAQ[] = [
  {
    question: "Tôi cần biết gì trước khi bắt đầu?",
    answer:
      "Bạn chỉ cần biết cơ bản về lập trình (biến, hàm, điều kiện — ngôn ngữ nào cũng được). Nếu chưa biết gì, hãy học cơ bản programming trước 1-2 tuần.",
  },
  {
    question: "Tại sao chọn Kotlin thay vì Java?",
    answer:
      "Kotlin là ngôn ngữ chính thức được Google推荐 cho Android từ 2019. Ngắn gọn hơn, an toàn hơn (null safety), và là tương lai của Android development.",
  },
  {
    question: "Học 30 ngày có đủ để đi làm không?",
    answer:
      "30 ngày đủ để bạn có nền tảng vững và hiểu cách xây dựng app Android hoàn chỉnh. Để thành thạo và tự tin phỏng vấn, bạn cần thêm 1-2 tháng thực hành và build thêm project riêng.",
  },
  {
    question: "Tôi cần cài đặt những gì?",
    answer:
      "Chỉ cần Android Studio (miễn phí), máy tính có 8GB RAM trở lên, và kết nối internet. Bài 1 sẽ hướng dẫn cài đặt chi tiết.",
  },
  {
    question: "Có cần trả phí gì không?",
    answer:
      "Không. Tất cả nội dung, code, và tài liệu đều miễn phí và mã nguồn mở trên GitHub.",
  },
  {
    question: "Tôi có thể học nhanh hơn/chậm hơn không?",
    answer:
      "Tất nhiên! Lộ trình 30 ngày chỉ là gợi ý. Học theo tốc độ của bạn. Mỗi bài học có duration ước tính nhưng không có áp lực deadline.",
  },
];

export const PROJECTS = [
  {
    slug: "habit-tracker",
    title: "Habit Tracker",
    week: "Tuần 1-2",
    difficulty: "🟢 Beginner",
    skills: ["Variables", "Functions", "Composable", "State"],
    description: "App theo dõi thói quen hàng ngày",
  },
  {
    slug: "notes-app",
    title: "Notes App",
    week: "Tuần 2-3",
    difficulty: "🟡 Intermediate",
    skills: ["Navigation", "Room", "ViewModel", "Coroutines"],
    description: "App ghi chú với lưu trữ local database",
  },
  {
    slug: "movie-browser",
    title: "Movie Browser",
    week: "Tuần 3",
    difficulty: "🟠 Advanced",
    skills: ["Retrofit", "Hilt", "Flow", "Repository"],
    description: "Duyệt phim từ TMDB API, cache offline",
  },
  {
    slug: "clean-arch-sample",
    title: "Clean Architecture Sample",
    week: "Tuần 3-4",
    difficulty: "🔴 Professional",
    skills: ["DI", "Testing", "CI/CD", "Performance"],
    description: "Ứng dụng mẫu với kiến trúc sạch hoàn chỉnh",
  },
];
