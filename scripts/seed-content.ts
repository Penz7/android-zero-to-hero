/**
 * Seed script: migrate hardcoded data → Supabase
 *
 * Run: npx tsx scripts/seed-content.ts
 *
 * Prerequisites:
 * 1. Run supabase/content-schema.sql in Supabase SQL Editor first
 * 2. Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars
 *    (Service Role Key needed for INSERT — NOT anon key)
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// ─── Config ────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "";

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Missing env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY");
  console.error("   Get SERVICE_KEY from Supabase Dashboard → Settings → API → service_role key");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── Lesson metadata (from constants.ts) ──────────────────────
const ALL_LESSONS = [
  { slug: "kotlin-intro", title: "Giới thiệu Kotlin & Cài đặt môi trường", day: 1, week: 1, difficulty: "beginner", prerequisites: [], duration: "40 phút", tags: ["kotlin", "setup"], description: "Tổng quan về Kotlin, cài đặt Android Studio, tạo project đầu tiên." },
  { slug: "kotlin-variables", title: "Biến, Kiểu dữ liệu & String templates", day: 2, week: 1, difficulty: "beginner", prerequisites: ["kotlin-intro"], duration: "45 phút", tags: ["kotlin", "variables", "types"], description: "Khai báo biến val/var, kiểu dữ liệu cơ bản, string templates." },
  { slug: "kotlin-functions", title: "Functions, Lambda & Higher-order functions", day: 3, week: 1, difficulty: "beginner", prerequisites: ["kotlin-variables"], duration: "50 phút", tags: ["kotlin", "functions", "lambda"], description: "Định nghĩa hàm, tham số mặc định, lambda expressions, higher-order functions." },
  { slug: "kotlin-control-flow", title: "Điều kiện, When expression & Loops", day: 4, week: 1, difficulty: "beginner", prerequisites: ["kotlin-functions"], duration: "45 phút", tags: ["kotlin", "control-flow"], description: "if/else, when expression, for, while, do-while loops." },
  { slug: "kotlin-oop", title: "Lớp, Đối tượng, Kế thừa & Interface", day: 5, week: 1, difficulty: "intermediate", prerequisites: ["kotlin-control-flow"], duration: "60 phút", tags: ["kotlin", "oop"], description: "Class, object, inheritance, interface, abstract class, data class, sealed class." },
  { slug: "kotlin-collections", title: "List, Map, Set & Collection operations", day: 6, week: 1, difficulty: "intermediate", prerequisites: ["kotlin-oop"], duration: "50 phút", tags: ["kotlin", "collections"], description: "Các collection cơ bản, operations: filter, map, reduce, sorted." },
  { slug: "kotlin-null-safety", title: "Null safety, Elvis operator & Extension functions", day: 7, week: 1, difficulty: "intermediate", prerequisites: ["kotlin-collections"], duration: "45 phút", tags: ["kotlin", "null-safety"], description: "Nullable types, safe calls, Elvis operator, extension functions." },
  { slug: "compose-intro", title: "Jetpack Compose là gì? Composable functions", day: 8, week: 2, difficulty: "intermediate", prerequisites: ["kotlin-null-safety"], duration: "50 phút", tags: ["compose", "composable"], description: "Giới thiệu Compose, @Composable annotation, Text, Button, Image." },
  { slug: "compose-layouts", title: "Column, Row, Box, Spacer & Modifier", day: 9, week: 2, difficulty: "intermediate", prerequisites: ["compose-intro"], duration: "55 phút", tags: ["compose", "layouts", "modifier"], description: "Các layout cơ bản, Modifier chain, padding, size, alignment." },
  { slug: "compose-state", title: "State management: remember, mutableStateOf", day: 10, week: 2, difficulty: "intermediate", prerequisites: ["compose-layouts"], duration: "50 phút", tags: ["compose", "state"], description: "State trong Compose, remember, mutableStateOf, state hoisting." },
  { slug: "compose-navigation", title: "Navigation Component trong Compose", day: 11, week: 2, difficulty: "advanced", prerequisites: ["compose-state"], duration: "55 phút", tags: ["compose", "navigation"], description: "NavHost, NavController, navigate, arguments, deep links." },
  { slug: "compose-lists", title: "LazyColumn, LazyRow & hiệu suất list", day: 12, week: 2, difficulty: "advanced", prerequisites: ["compose-navigation"], duration: "50 phút", tags: ["compose", "lists"], description: "LazyColumn, LazyRow, items, keys, performance optimization." },
  { slug: "compose-theming", title: "Theme, Color, Typography, Dark mode", day: 13, week: 2, difficulty: "advanced", prerequisites: ["compose-lists"], duration: "50 phút", tags: ["compose", "theming"], description: "MaterialTheme, custom colors, typography, dark/light mode." },
  { slug: "compose-advanced-ui", title: "Animations, Custom layouts, Canvas", day: 14, week: 2, difficulty: "advanced", prerequisites: ["compose-theming"], duration: "60 phút", tags: ["compose", "animations"], description: "animateAsState, AnimatedVisibility, custom layouts, Canvas." },
  { slug: "mvvm-intro", title: "MVVM Architecture & Separation of concerns", day: 15, week: 3, difficulty: "advanced", prerequisites: ["compose-advanced-ui"], duration: "50 phút", tags: ["architecture", "mvvm"], description: "MVVM pattern, separation of concerns, data flow." },
  { slug: "viewmodel-livedata", title: "ViewModel, StateFlow, UI state management", day: 16, week: 3, difficulty: "advanced", prerequisites: ["mvvm-intro"], duration: "55 phút", tags: ["architecture", "viewmodel"], description: "ViewModel lifecycle, StateFlow, collectAsState, UI state." },
  { slug: "coroutines-flow", title: "Kotlin Coroutines & Flow cơ bản", day: 17, week: 3, difficulty: "expert", prerequisites: ["viewmodel-livedata"], duration: "60 phút", tags: ["kotlin", "coroutines", "flow"], description: "suspend, launch, async/await, Flow, operators." },
  { slug: "room-database", title: "Room Database: Entity, DAO, Database", day: 18, week: 3, difficulty: "expert", prerequisites: ["coroutines-flow"], duration: "55 phút", tags: ["data", "room"], description: "Room ORM, Entity, DAO, Database, migrations." },
  { slug: "retrofit-networking", title: "Networking với Retrofit & JSON parsing", day: 19, week: 3, difficulty: "expert", prerequisites: ["room-database"], duration: "55 phút", tags: ["networking", "retrofit"], description: "Retrofit setup, API interface, Moshi/Gson, error handling." },
  { slug: "hilt-di", title: "Dependency Injection với Hilt", day: 20, week: 3, difficulty: "expert", prerequisites: ["retrofit-networking"], duration: "50 phút", tags: ["architecture", "hilt", "di"], description: "Hilt setup, @Inject, @Module, @Provides, scopes." },
  { slug: "clean-architecture", title: "Clean Architecture: Domain, Data, Presentation", day: 21, week: 3, difficulty: "expert", prerequisites: ["hilt-di"], duration: "60 phút", tags: ["architecture", "clean"], description: "Clean Architecture layers, use cases, repository pattern." },
  { slug: "testing-unit", title: "Unit Testing với JUnit & Mockito", day: 22, week: 4, difficulty: "expert", prerequisites: ["clean-architecture"], duration: "50 phút", tags: ["testing", "junit"], description: "JUnit 5, Mockito, test ViewModel, test Repository." },
  { slug: "testing-ui", title: "UI Testing với Compose Test", day: 23, week: 4, difficulty: "expert", prerequisites: ["testing-unit"], duration: "50 phút", tags: ["testing", "compose-test"], description: "ComposeTestRule, onNodeWithText, performClick, assertions." },
  { slug: "ci-cd-basics", title: "CI/CD cơ bản: GitHub Actions cho Android", day: 24, week: 4, difficulty: "expert", prerequisites: ["testing-ui"], duration: "45 phút", tags: ["devops", "ci-cd"], description: "GitHub Actions workflow, build APK, run tests, deploy." },
  { slug: "performance", title: "Performance: Memory, Layout, Recomposition", day: 25, week: 4, difficulty: "expert", prerequisites: ["ci-cd-basics"], duration: "50 phút", tags: ["performance"], description: "Memory leaks, Layout Inspector, recomposition optimization." },
  { slug: "security-basics", title: "Security: ProGuard, Network Security, Data", day: 26, week: 4, difficulty: "expert", prerequisites: ["performance"], duration: "45 phút", tags: ["security"], description: "R8/ProGuard, network security config, EncryptedSharedPreferences." },
  { slug: "play-store-deploy", title: "Deploy lên Google Play Store", day: 27, week: 4, difficulty: "expert", prerequisites: ["security-basics"], duration: "40 phút", tags: ["deploy", "play-store"], description: "Build AAB, signing, Play Console, store listing." },
  { slug: "interview-prep", title: "Chuẩn bị phỏng vấn Android Developer", day: 28, week: 4, difficulty: "expert", prerequisites: ["play-store-deploy"], duration: "50 phút", tags: ["career", "interview"], description: "Câu hỏi phỏng vấn, portfolio, tips." },
  { slug: "portfolio-project", title: "Xây dựng Portfolio Project hoàn chỉnh", day: 29, week: 4, difficulty: "expert", prerequisites: ["interview-prep"], duration: "60 phút", tags: ["project", "portfolio"], description: "Kết hợp tất cả kiến thức vào 1 project hoàn chỉnh." },
  { slug: "next-steps", title: "Roadmap tiếp theo: Senior Android Engineer", day: 30, week: 4, difficulty: "expert", prerequisites: ["portfolio-project"], duration: "30 phút", tags: ["career"], description: "Con đường tiếp theo sau 30 ngày." },
];

// ─── Quiz data (from quizzes.ts) ──────────────────────────────
// Simplified: just slug → questions mapping
function getQuizData(): { slug: string; questions: { question: string; options: string[]; correctIndex: number; explanation: string }[] }[] {
  const quizzesPath = path.join(process.cwd(), "src/data/quizzes.ts");
  const raw = fs.readFileSync(quizzesPath, "utf-8");
  // Parse the QUIZZES array from the file
  // This is a simplified extraction — works for the current format
  const quizzes: { slug: string; questions: { question: string; options: string[]; correctIndex: number; explanation: string }[] }[] = [];
  
  // Find each quiz block: slug: "...", questions: [...]
  const slugRegex = /slug:\s*"([^"]+)"/g;
  const slugs: string[] = [];
  let match;
  while ((match = slugRegex.exec(raw)) !== null) {
    slugs.push(match[1]);
  }

  for (const slug of slugs) {
    // Find the questions array for this slug
    const slugIndex = raw.indexOf(`slug: "${slug}"`);
    const nextSlugIndex = raw.indexOf("slug:", slugIndex + 1);
    const block = nextSlugIndex > 0 ? raw.slice(slugIndex, nextSlugIndex) : raw.slice(slugIndex);
    
    const questions: { question: string; options: string[]; correctIndex: number; explanation: string }[] = [];
    
    // Find all question blocks
    const qRegex = /question:\s*"((?:[^"\\]|\\.)*)"/g;
    const oRegex = /options:\s*\[([\s\S]*?)\]/g;
    const cRegex = /correctIndex:\s*(\d+)/g;
    const eRegex = /explanation:\s*"((?:[^"\\]|\\.)*)"/g;
    
    let qm, om, cm, em;
    const qMatches: string[] = [];
    const oMatches: string[][] = [];
    const cMatches: number[] = [];
    const eMatches: string[] = [];
    
    while ((qm = qRegex.exec(block)) !== null) qMatches.push(qm[1]);
    while ((om = oRegex.exec(block)) !== null) {
      const opts = om[1].match(/"((?:[^"\\]|\\.)*)"/g)?.map(s => s.slice(1, -1)) || [];
      oMatches.push(opts);
    }
    while ((cm = cRegex.exec(block)) !== null) cMatches.push(parseInt(cm[1]));
    while ((em = eRegex.exec(block)) !== null) eMatches.push(em[1]);
    
    for (let i = 0; i < qMatches.length; i++) {
      questions.push({
        question: qMatches[i],
        options: oMatches[i] || [],
        correctIndex: cMatches[i] ?? 0,
        explanation: eMatches[i] || "",
      });
    }
    
    if (questions.length > 0) {
      quizzes.push({ slug, questions });
    }
  }
  
  return quizzes;
}

// ─── Playground data (from playgrounds.ts) ─────────────────────
function getPlaygroundData(): { slug: string; label: string; code: string }[] {
  const pgPath = path.join(process.cwd(), "src/data/playgrounds.ts");
  const raw = fs.readFileSync(pgPath, "utf-8");
  
  const snippets: { slug: string; label: string; code: string }[] = [];
  
  // Find PLAYGROUND_SNIPPETS entries
  const snippetBlocks = raw.split(/{\s*\n\s*slug:/).slice(1);
  
  for (const block of snippetBlocks) {
    const slugMatch = block.match(/^\s*"([^"]+)"/);
    const titleMatch = block.match(/title:\s*"([^"]+)"/);
    // Code is between backticks
    const codeMatch = block.match(/code:\s*`([\s\S]*?)`/);
    
    if (slugMatch && codeMatch) {
      snippets.push({
        slug: slugMatch[1],
        label: titleMatch?.[1] || "Code",
        code: codeMatch[1],
      });
    }
  }
  
  // Also find PLAYGROUND_GROUPS entries
  const groupBlocks = raw.split(/slug:\s*"/).slice(1);
  for (const block of groupBlocks) {
    const slugMatch = block.match(/^([^"]+)"/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    
    // Skip if already captured as snippet
    if (snippets.some(s => s.slug === slug)) continue;
    
    // Find label
    const labelMatch = block.match(/label:\s*"([^"]+)"/);
    
    // Find all snippets in the group
    const snippetEntries = block.split(/{\s*label:/).slice(1);
    let sortOrder = 0;
    for (const entry of snippetEntries) {
      const labelM = entry.match(/label:\s*"([^"]+)"/);
      const codeM = entry.match(/code:\s*`([\s\S]*?)`/);
      if (codeM) {
        snippets.push({
          slug,
          label: labelM?.[1] || `Example ${++sortOrder}`,
          code: codeM[1],
        });
      }
    }
  }
  
  return snippets;
}

// ─── Read MDX content ─────────────────────────────────────────
function readMdxContent(slug: string): string {
  const lessonsDir = path.join(process.cwd(), "src/content/lessons");
  const files = fs.readdirSync(lessonsDir);
  const file = files.find(f => f.includes(slug) && f.endsWith(".mdx"));
  if (!file) return "";
  return fs.readFileSync(path.join(lessonsDir, file), "utf-8");
}

// ─── Main seed function ───────────────────────────────────────
async function seed() {
  console.log("🌱 Starting content seed...\n");

  // 1. Seed lessons
  console.log(`📚 Seeding ${ALL_LESSONS.length} lessons...`);
  for (const lesson of ALL_LESSONS) {
    const content = readMdxContent(lesson.slug);
    const { error } = await supabase.from("lessons").upsert({
      slug: lesson.slug,
      title: lesson.title,
      day: lesson.day,
      week: lesson.week,
      difficulty: lesson.difficulty,
      prerequisites: lesson.prerequisites,
      duration: lesson.duration,
      tags: lesson.tags,
      description: lesson.description,
      content,
    }, { onConflict: "slug" });

    if (error) {
      console.error(`  ❌ ${lesson.slug}: ${error.message}`);
    } else {
      console.log(`  ✅ ${lesson.slug} (${content.length} chars)`);
    }
  }

  // 2. Seed quizzes
  console.log("\n🧠 Seeding quizzes...");
  const quizzes = getQuizData();
  for (const quiz of quizzes) {
    // Create quiz record
    const { data: quizRecord, error: quizError } = await supabase
      .from("quizzes")
      .upsert({ lesson_slug: quiz.slug }, { onConflict: "lesson_slug" })
      .select("id")
      .single();

    if (quizError || !quizRecord) {
      console.error(`  ❌ Quiz ${quiz.slug}: ${quizError?.message}`);
      continue;
    }

    // Delete existing questions for this quiz
    await supabase.from("quiz_questions").delete().eq("quiz_id", quizRecord.id);

    // Insert questions
    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      const { error: qError } = await supabase.from("quiz_questions").insert({
        quiz_id: quizRecord.id,
        question: q.question,
        options: q.options,
        correct_index: q.correctIndex,
        explanation: q.explanation,
        sort_order: i,
      });

      if (qError) {
        console.error(`    ❌ Q${i + 1}: ${qError.message}`);
      }
    }
    console.log(`  ✅ ${quiz.slug}: ${quiz.questions.length} questions`);
  }

  // 3. Seed playgrounds
  console.log("\n💻 Seeding playgrounds...");
  const playgrounds = getPlaygroundData();
  
  // Group by slug
  const pgBySlug = new Map<string, { label: string; code: string; sort: number }[]>();
  for (const pg of playgrounds) {
    const arr = pgBySlug.get(pg.slug) || [];
    arr.push({ label: pg.label, code: pg.code, sort: arr.length });
    pgBySlug.set(pg.slug, arr);
  }

  for (const [slug, snippets] of pgBySlug) {
    // Delete existing snippets for this lesson
    await supabase.from("playground_snippets").delete().eq("lesson_slug", slug);

    for (const s of snippets) {
      const { error } = await supabase.from("playground_snippets").insert({
        lesson_slug: slug,
        label: s.label,
        code: s.code,
        sort_order: s.sort,
      });
      if (error) {
        console.error(`  ❌ ${slug} / ${s.label}: ${error.message}`);
      }
    }
    console.log(`  ✅ ${slug}: ${snippets.length} snippets`);
  }

  console.log("\n🎉 Seed complete!");
}

seed().catch(console.error);
