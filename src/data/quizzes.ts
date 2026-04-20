export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonQuiz {
  slug: string;
  questions: QuizQuestion[];
}

export const QUIZZES: LessonQuiz[] = [
  {
    slug: "kotlin-intro",
    questions: [
      {
        question: "Kotlin được phát triển bởi công ty nào?",
        options: ["Google", "JetBrains", "Microsoft", "Apple"],
        correctIndex: 1,
        explanation: "Kotlin được phát triển bởi JetBrains — công ty đứng sau IntelliJ IDEA.",
      },
      {
        question: "Từ khóa nào dùng để khai báo hàm trong Kotlin?",
        options: ["function", "def", "fun", "func"],
        correctIndex: 2,
        explanation: "Trong Kotlin, dùng 'fun' để khai báo hàm: fun main() { }",
      },
      {
        question: "Năm nào Google công bố Kotlin là ngôn ngữ ưu tiên cho Android?",
        options: ["2015", "2017", "2019", "2020"],
        correctIndex: 1,
        explanation: "Google công bố Kotlin là first-class language cho Android tại Google I/O 2017.",
      },
    ],
  },
  {
    slug: "kotlin-variables",
    questions: [
      {
        question: "val và var khác nhau như thế nào?",
        options: [
          "val là mutable, var là immutable",
          "val là immutable, var là mutable",
          "Cả hai đều mutable",
          "Cả hai đều immutable",
        ],
        correctIndex: 1,
        explanation: "val (value) không thể thay đổi sau khi gán. var (variable) có thể thay đổi.",
      },
      {
        question: "String template trong Kotlin sử dụng ký tự nào?",
        options: ["#", "$", "@", "&"],
        correctIndex: 1,
        explanation: "String template dùng ký tự $: \"Hello, $name\" hoặc biểu thức: \"${a + b}\"",
      },
      {
        question: "Kết quả của: val x = 10; val y = 3; println(x / y)",
        options: ["3.33", "3", "3.0", "Lỗi"],
        correctIndex: 1,
        explanation: "Chia 2 số Int trong Kotlin trả về Int (làm tròn xuống): 10 / 3 = 3",
      },
    ],
  },
  {
    slug: "kotlin-functions",
    questions: [
      {
        question: "Lambda expression trong Kotlin có cú pháp như thế nào?",
        options: [
          "{ a, b -> a + b }",
          "(a, b) => a + b",
          "lambda(a, b): a + b",
          "fun(a, b) = a + b",
        ],
        correctIndex: 0,
        explanation: "Lambda trong Kotlin: { params -> body }. Ví dụ: { a: Int, b: Int -> a + b }",
      },
      {
        question: "Higher-order function là gì?",
        options: [
          "Hàm có nhiều tham số",
          "Hàm trả về hoặc nhận hàm khác làm tham số",
          "Hàm có tên dài",
          "Hàm chạy trên thread riêng",
        ],
        correctIndex: 1,
        explanation: "Higher-order function là hàm nhận hàm khác làm parameter hoặc trả về hàm.",
      },
      {
        question: "Default parameter trong Kotlin khai báo như thế nào?",
        options: [
          "fun greet(name = \"World\")",
          "fun greet(name := \"World\")",
          "fun greet(name: \"World\")",
          "fun greet(default name = \"World\")",
        ],
        correctIndex: 0,
        explanation: "Default parameter: fun greet(name: String = \"World\") — gán giá trị mặc định trong signature.",
      },
    ],
  },
  {
    slug: "kotlin-control-flow",
    questions: [
      {
        question: "when expression trong Kotlin tương tự cái nào trong Java?",
        options: ["if-else", "switch-case", "for loop", "ternary"],
        correctIndex: 1,
        explanation: "when expression là enhanced version của switch-case trong Java.",
      },
      {
        question: "Kết quả của: val x = 15; println(when { x > 10 -> \"big\" x > 5 -> \"medium\" else -> \"small\" })",
        options: ["big", "medium", "small", "Lỗi"],
        correctIndex: 0,
        explanation: "when evaluate theo thứ tự, x > 10 (15 > 10) = true → trả về \"big\".",
      },
      {
        question: "Cách iterate qua range 1..5 trong Kotlin?",
        options: [
          "for (i in 1..5)",
          "for (i : 1..5)",
          "for (i = 1; i <= 5; i++)",
          "Cả A và C đều đúng",
        ],
        correctIndex: 0,
        explanation: "for (i in 1..5) là cú pháp idiomatic của Kotlin. C-style for cũng hỗ trợ nhưng ít dùng.",
      },
    ],
  },
  {
    slug: "kotlin-oop",
    questions: [
      {
        question: "data class trong Kotlin tự động generate những gì?",
        options: [
          "toString(), equals(), hashCode(), copy()",
          "Chỉ toString()",
          "Chỉ constructor",
          "Không generate gì thêm",
        ],
        correctIndex: 0,
        explanation: "data class tự动生成 toString(), equals(), hashCode(), copy(), componentN() functions.",
      },
      {
        question: "sealed class dùng khi nào?",
        options: [
          "Khi cần kế thừa từ nhiều class",
          "Khi cần restrict class hierarchy — số lượng subclass đã biết",
          "Khi class quá lớn",
          "Khi cần abstract class",
        ],
        correctIndex: 1,
        explanation: "Sealed class restrict kế thừa — tất cả subclass phải khai báo cùng file hoặc cùng module.",
      },
      {
        question: "Interface trong Kotlin có thể chứa implementation không?",
        options: [
          "Không, chỉ khai báo",
          "Có, có thể có default implementations",
          "Chỉ với abstract methods",
          "Chỉ trong Kotlin 2.0",
        ],
        correctIndex: 1,
        explanation: "Interface trong Kotlin có thể chứa default implementations và properties.",
      },
    ],
  },
  {
    slug: "kotlin-collections",
    questions: [
      {
        question: "Phép nào KHÔNG thay đổi collection gốc?",
        options: ["add()", "remove()", "filter()", "clear()"],
        correctIndex: 2,
        explanation: "filter() trả về list MỚI, không thay đổi list gốc. add(), remove(), clear() mutate collection.",
      },
      {
        question: "Kết quả của: listOf(1,2,3).map { it * 2 }",
        options: ["[1, 2, 3]", "[2, 4, 6]", "6", "Unit"],
        correctIndex: 1,
        explanation: "map transform mỗi phần tử: 1*2=2, 2*2=4, 3*2=6 → [2, 4, 6]",
      },
      {
        question: "List, Set, Set khác nhau ở điểm nào?",
        options: [
          "List有序, Set无重复, Map key-value",
          "Cả ba đều giống nhau",
          "List là mutable, Set và Map là immutable",
          "Set有序, List无重复",
        ],
        correctIndex: 0,
        explanation: "List:有序,允许重复. Set:无序,不允许重复. Map: key-value pairs.",
      },
    ],
  },
  {
    slug: "kotlin-null-safety",
    questions: [
      {
        question: "Ký tự nào khai báo nullable type trong Kotlin?",
        options: ["!", "?", "??", "&"],
        correctIndex: 1,
        explanation: "Dấu ? sau type: String? = nullable. String = non-nullable (mặc định).",
      },
      {
        question: "Elvis operator (?:) làm gì?",
        options: [
          "Throw exception nếu null",
          "Trả về giá trị thay thế nếu null",
          "Chuyển đổi kiểu dữ liệu",
          "So sánh 2 giá trị",
        ],
        correctIndex: 1,
        explanation: "Elvis operator: val len = name?.length ?: 0 — nếu null thì trả về 0.",
      },
      {
        question: "Cách an toàn để gọi method trên nullable object?",
        options: ["obj.method()", "obj?.method()", "obj!!.method()", "obj->method()"],
        correctIndex: 1,
        explanation: "Safe call operator ?. — nếu obj là null, trả về null thay vì throw NPE.",
      },
    ],
  },
  {
    slug: "compose-intro",
    questions: [
      {
        question: "@Composable annotation đánh dấu điều gì?",
        options: [
          "Hàm chạy trên background thread",
          "Hàm mô tả UI — có thể gọi các Composable khác",
          "Hàm chỉ chạy 1 lần",
          "Hàm private",
        ],
        correctIndex: 1,
        explanation: "@Composable cho biết hàm này tạo UI. Có thể gọi các @Composable functions khác bên trong.",
      },
      {
        question: "Jetpack Compose dùng approach nào để xây dựng UI?",
        options: [
          "XML layouts",
          "Declarative UI (khai báo UI như code)",
          "HTML/CSS",
          "Canvas drawing",
        ],
        correctIndex: 1,
        explanation: "Compose dùng declarative approach — khai báo UI trông như thế nào dựa trên state hiện tại.",
      },
      {
        question: "Composable function chạy lại khi nào?",
        options: [
          "Mỗi 1 giây",
          "Khi input/state thay đổi (recomposition)",
          "Chỉ 1 lần khi mount",
          "Khi user scroll",
        ],
        correctIndex: 1,
        explanation: "Recomposition: Composable re-execute khi state hoặc parameters thay đổi để cập nhật UI.",
      },
    ],
  },
  {
    slug: "compose-layouts",
    questions: [
      {
        question: "Column, Row, Box khác nhau như thế nào?",
        options: [
          "Column: dọc, Row: ngang, Box: chồng lớp",
          "Cả ba đều giống nhau",
          "Column: ngang, Row: dọc",
          "Box: dọc, Column: ngang",
        ],
        correctIndex: 0,
        explanation: "Column sắp xếp children theo chiều dọc, Row theo chiều ngang, Box chồng lên nhau.",
      },
      {
        question: "Modifier chain trong Compose có thứ tự quan trọng không?",
        options: [
          "Không, thứ tự nào cũng được",
          "Có — thứ tự quyết định hành vi",
          "Chỉ quan trọng với padding",
          "Modifier không có chain",
        ],
        correctIndex: 1,
        explanation: "Thứ tự Modifier rất quan trọng! .padding(16.dp).fillMaxWidth() khác .fillMaxWidth().padding(16.dp)",
      },
      {
        question: "Spacer dùng để làm gì?",
        options: [
          "Tạo khoảng trống giữa các elements",
          "Ẩn element",
          "Tạo animation",
          "Định nghĩa màu nền",
        ],
        correctIndex: 0,
        explanation: "Spacer tạo khoảng trống: Spacer(modifier = Modifier.height(8.dp))",
      },
    ],
  },
  {
    slug: "compose-state",
    questions: [
      {
        question: "remember trong Compose dùng để làm gì?",
        options: [
          "Ghi nhớ giá trị qua recomposition",
          "Lưu dữ liệu vào database",
          "Gửi network request",
          "Tạo animation",
        ],
        correctIndex: 0,
        explanation: "remember giữ giá trị qua recomposition. Không remember → giá trị reset mỗi lần recompose.",
      },
      {
        question: "State hoisting là gì?",
        options: [
          "Di chuyển state xuống child component",
          "Di chuyển state lên parent component để quản lý",
          "Xóa state",
          "Copy state",
        ],
        correctIndex: 1,
        explanation: "State hoisting: move state lên parent, child nhận state + callback. Giúp reusable và testable.",
      },
      {
        question: "mutableStateOf và LiveData khác nhau điểm nào?",
        options: [
          "Không khác gì",
          "mutableStateOf là Compose-native, LiveData cần observe",
          "LiveData nhanh hơn",
          "mutableStateOf chỉ dùng cho String",
        ],
        correctIndex: 1,
        explanation: "mutableStateOf tích hợp trực tiếp với Compose (auto-recompose). LiveData cần collectAsState() bridge.",
      },
    ],
  },
  {
    slug: "compose-navigation",
    questions: [
      {
        question: "Thành phần nào định nghĩa các routes trong Navigation Compose?",
        options: ["NavController", "NavHost", "NavGraph", "NavDestination"],
        correctIndex: 1,
        explanation: "NavHost định nghĩa map các routes. NavController điều hướng giữa chúng.",
      },
      {
        question: "Cách truyền argument qua navigation trong Compose?",
        options: [
          "Chỉ qua Intent",
          "Qua navArgument trong route definition",
          "Không thể truyền argument",
          "Qua global variable",
        ],
        correctIndex: 1,
        explanation: "navArgument trong route: navController.navigate(\"detail/$id\") + navArgument(\"id\") { type = NavType.IntType }",
      },
      {
        question: "deepLink trong Navigation dùng để làm gì?",
        options: [
          "Link đến URL web",
          "Mở app từ URL/link bên ngoài",
          "Tạo button link",
          "Navigate trong app",
        ],
        correctIndex: 1,
        explanation: "Deep link cho phép mở app trực tiếp đến screen cụ thể từ URL bên ngoài (email, web, notification).",
      },
    ],
  },
  {
    slug: "compose-lists",
    questions: [
      {
        question: "Tại sao cần đặt key cho items trong LazyColumn?",
        options: [
          "Để đẹp hơn",
          "Để Compose track item đúng khi data thay đổi — tránh recomposition không cần thiết",
          "Để sort items",
          "Không cần key",
        ],
        correctIndex: 1,
        explanation: "Key giúp Compose identify items khi list thay đổi. Không key → animation xấu, performance kém.",
      },
      {
        question: "LazyColumn khác gì Column thông thường?",
        options: [
          "Không khác gì",
          "LazyColumn chỉ render visible items (lazy)",
          "Column nhanh hơn",
          "LazyColumn không hỗ trợ scroll",
        ],
        correctIndex: 1,
        explanation: "LazyColumn chỉ render items đang visible trên screen → tiết kiệm memory với list dài.",
      },
      {
        question: "Cách tối ưu hiệu suất list trong Compose?",
        options: [
          "Dùng key, avoid heavy computation trong item, dùng derivedStateOf",
          "Load tất cả data 1 lần",
          "Không cần tối ưu",
          "Dùng Column thay LazyColumn",
        ],
        correctIndex: 0,
        explanation: "Key techniques: item keys, stable data classes, derivedStateOf, minimize recomposition scope.",
      },
    ],
  },
  {
    slug: "compose-theming",
    questions: [
      {
        question: "MaterialTheme cung cấp những gì?",
        options: [
          "Chỉ màu sắc",
          "ColorScheme, Typography, Shapes",
          "Chỉ font",
          "Layout components",
        ],
        correctIndex: 1,
        explanation: "MaterialTheme bao gồm ColorScheme (màu), Typography (font), và Shapes (bo góc).",
      },
      {
        question: "Cách implement dark mode trong Compose?",
        options: [
          "Dùng if-else cho từng element",
          "Dùng darkColorScheme/lightColorScheme trong Theme",
          "Không hỗ trợ dark mode",
          "Chỉ cần đổi background color",
        ],
        correctIndex: 1,
        explanation: "Dùng isSystemInDarkTheme() + darkColorScheme()/lightColorScheme() trong Theme.kt.",
      },
    ],
  },
  {
    slug: "compose-advanced-ui",
    questions: [
      {
        question: "animateAsState dùng cho mục đích gì?",
        options: [
          "Animate giá trị đơn: Int, Float, Color, Dp",
          "Animate layout changes",
          "Animate page transitions",
          "Animate list items",
        ],
        correctIndex: 0,
        explanation: "animateAsState animate 1 giá trị: val size by animateDpAsState(if (big) 100.dp else 50.dp)",
      },
      {
        question: "AnimatedVisibility làm gì?",
        options: [
          "Ẩn/hiện element với animation",
          "Đổi màu element",
          "Di chuyển element",
          "Xóa element",
        ],
        correctIndex: 0,
        explanation: "AnimatedVisibility tự động animate enter/exit khi visible thay đổi.",
      },
    ],
  },
  {
    slug: "mvvm-intro",
    questions: [
      {
        question: "MVVM gồm những thành phần nào?",
        options: [
          "Model-View-ViewModel",
          "Model-ViewController-ViewModel",
          "Model-View-Manager",
          "Model-View-Adapter",
        ],
        correctIndex: 0,
        explanation: "MVVM: Model (data/business logic), View (UI), ViewModel (bridge giữa View và Model).",
      },
      {
        question: "Lợi ích chính của MVVM là gì?",
        options: [
          "Code ngắn hơn",
          "Separation of concerns — tách biệt UI và business logic",
          "Chạy nhanh hơn",
          "Ít file hơn",
        ],
        correctIndex: 1,
        explanation: "MVVM tách biệt: View chỉ hiển thị, ViewModel xử lý logic, Model quản lý data → dễ test, maintain.",
      },
    ],
  },
  {
    slug: "viewmodel-livedata",
    questions: [
      {
        question: "ViewModel sống qua configuration change (rotate screen) không?",
        options: [
          "Không, bị destroy",
          "Có, survive configuration changes",
          "Chỉ khi dùng retain",
          "Tùy Android version",
        ],
        correctIndex: 1,
        explanation: "ViewModel survive screen rotation. Data trong ViewModel không bị mất khi config change.",
      },
      {
        question: "StateFlow và LiveData khác nhau thế nào?",
        options: [
          "Không khác gì",
          "StateFlow là Kotlin Coroutines, LiveData là Android Architecture",
          "LiveData nhanh hơn",
          "StateFlow không hỗ trợ Compose",
        ],
        correctIndex: 1,
        explanation: "StateFlow: Kotlin Coroutines, type-safe, Compose-native. LiveData: Android-specific, cần lifecycle-aware.",
      },
    ],
  },
  {
    slug: "coroutines-flow",
    questions: [
      {
        question: "suspend function là gì?",
        options: [
          "Hàm chạy mãi mãi",
          "Hàm có thể暂停 mà không block thread",
          "Hàm chạy trên main thread",
          "Hàm không có return value",
        ],
        correctIndex: 1,
        explanation: "Suspend function có thể暂停 execution, nhường thread cho work khác, rồi resume sau.",
      },
      {
        question: "launch và async khác nhau điểm nào?",
        options: [
          "Không khác gì",
          "launch trả về Job, async trả về Deferred (có giá trị trả về)",
          "async nhanh hơn",
          "launch dùng cho background, async cho main",
        ],
        correctIndex: 1,
        explanation: "launch: fire-and-forget (Job). async: trả về result (Deferred<T>), cần await().",
      },
      {
        question: "Flow trong Kotlin là gì?",
        options: [
          "Chỉ là List",
          "Cold async stream — emit multiple values theo thời gian",
          "HTTP response",
          "Database query",
        ],
        correctIndex: 1,
        explanation: "Flow là cold stream: không emit cho đến khi có collector. Hữu ích cho async data streams.",
      },
    ],
  },
  {
    slug: "room-database",
    questions: [
      {
        question: "@Entity annotation đánh dấu điều gì?",
        options: [
          "Một function",
          "Một bảng trong database",
          "Một API endpoint",
          "Một UI component",
        ],
        correctIndex: 1,
        explanation: "@Entity đánh dấu data class là bảng Room database. Mỗi field = 1 column.",
      },
      {
        question: "@Dao dùng cho mục đích gì?",
        options: [
          "Khai báo database version",
          "Định nghĩa các query methods cho database",
          "Khai báo entity",
          "Migration database",
        ],
        correctIndex: 1,
        explanation: "@Dao (Data Access Object) định nghĩa interface với @Query, @Insert, @Update, @Delete.",
      },
    ],
  },
  {
    slug: "retrofit-networking",
    questions: [
      {
        question: "Retrofit annotation @GET dùng cho mục đích gì?",
        options: [
          "Tạo database",
          "Định nghĩa HTTP GET request",
          "Khai báo dependency",
          "Tạo UI component",
        ],
        correctIndex: 1,
        explanation: "@GET(\"/path\") định nghĩa HTTP GET endpoint. Retrofit convert interface thành HTTP calls.",
      },
      {
        question: "Converter trong Retrofit làm gì?",
        options: [
          "Đổi ngôn ngữ",
          "Chuyển đổi JSON response thành Kotlin objects",
          "Đổi theme",
          "Chuyển đổi file",
        ],
        correctIndex: 1,
        explanation: "Converter (Moshi/Gson) tự động parse JSON response thành data class instances.",
      },
    ],
  },
  {
    slug: "hilt-di",
    questions: [
      {
        question: "@HiltAndroidApp annotation đặt ở đâu?",
        options: [
          "MainActivity",
          "Application class",
          "ViewModel",
          "Repository",
        ],
        correctIndex: 1,
        explanation: "@HiltAndroidApp đặt trên Application class — trigger Hilt code generation.",
      },
      {
        question: "@Module + @InstallIn dùng để làm gì?",
        options: [
          "Cài đặt app",
          "Định nghĩa cách cung cấp dependencies",
          "Tạo UI module",
          "Khai báo permissions",
        ],
        correctIndex: 1,
        explanation: "@Module chứa @Provides functions. @InstallIn(scope) xác định lifecycle: SingletonComponent, ActivityRetainedComponent.",
      },
    ],
  },
  {
    slug: "clean-architecture",
    questions: [
      {
        question: "Clean Architecture có mấy layer chính?",
        options: ["1", "2", "3 (Data, Domain, Presentation)", "5"],
        correctIndex: 2,
        explanation: "3 layers: Data (API, DB), Domain (Use Cases, Entities), Presentation (ViewModel, UI).",
      },
      {
        question: "Dependency Rule trong Clean Architecture?",
        options: [
          "Outer layers depend on inner layers",
          "Inner layers depend on outer layers",
          "Layers không depend vào nhau",
          "Tất cả depend vào Data layer",
        ],
        correctIndex: 0,
        explanation: "Dependency Rule: outer layers (Data, Presentation) depend vào inner layers (Domain). Domain KHÔNG depend vào ai.",
      },
    ],
  },
  {
    slug: "testing-unit",
    questions: [
      {
        question: "@Test annotation trong JUnit đánh dấu điều gì?",
        options: [
          "Class test",
          "Method là test case",
          "Test suite",
          "Mock object",
        ],
        correctIndex: 1,
        explanation: "@Test đánh dấu method là test case. JUnit sẽ chạy method này khi test suite execute.",
      },
      {
        question: "Mockito/K Mockk dùng để làm gì?",
        options: [
          "Tạo database test",
          "Tạo fake objects để test isolated units",
          "Tạo UI test",
          "Generate code",
        ],
        correctIndex: 1,
        explanation: "Mocking frameworks tạo fake objects — test logic mà không depend vào real dependencies.",
      },
    ],
  },
  {
    slug: "testing-ui",
    questions: [
      {
        question: "ComposeTestRule dùng để làm gì?",
        options: [
          "Test database",
          "Setup và run Compose UI tests",
          "Test network calls",
          "Test build config",
        ],
        correctIndex: 1,
        explanation: "ComposeTestRule khởi tạo Compose trong test environment, cho phép interact với UI.",
      },
      {
        question: "Cách tìm element trong Compose UI test?",
        options: [
          "findViewById",
          "onNodeWithText(), onNodeWithTag()",
          "querySelector",
          "getElementById",
        ],
        correctIndex: 1,
        explanation: "Compose testing dùng semantic tree: onNodeWithText(\"Hello\"), onNodeWithTag(\"button\").",
      },
    ],
  },
  {
    slug: "ci-cd-basics",
    questions: [
      {
        question: "GitHub Actions workflow được định nghĩa trong file nào?",
        options: [".github/workflows/*.yml", "Dockerfile", "build.gradle", ".gitignore"],
        correctIndex: 0,
        explanation: "GitHub Actions workflows được định nghĩa trong .github/workflows/ directory dưới dạng YAML files.",
      },
      {
        question: "CI/CD pipeline cho Android thường gồm những bước nào?",
        options: [
          "Chỉ build",
          "Lint → Test → Build → Deploy",
          "Chỉ test",
          "Chỉ deploy",
        ],
        correctIndex: 1,
        explanation: "Standard pipeline: Lint check → Unit/UI Tests → Build APK/AAB → Deploy (Play Store/Firebase).",
      },
    ],
  },
  {
    slug: "performance",
    questions: [
      {
        question: "Memory leak trong Android thường xảy ra do?",
        options: [
          "Dùng quá nhiều colors",
          "Giữ reference đến Context/Activity sau khi destroyed",
          "Dùng nhiều images",
          "Code quá dài",
        ],
        correctIndex: 1,
        explanation: "Memory leak phổ biến: static reference to Activity, listener không unregister, coroutine scope sai.",
      },
      {
        question: "Recomposition trong Compose nên được tối ưu bằng cách?",
        options: [
          "Tránh dùng Composable",
          "Dùng stable classes, key, derivedStateOf, minimize scope",
          "Dùng XML thay Compose",
          "Tăng RAM device",
        ],
        correctIndex: 1,
        explanation: "Stable data classes, remember, derivedStateOf, key → minimize recomposition scope → better performance.",
      },
    ],
  },
  {
    slug: "security-basics",
    questions: [
      {
        question: "R8/ProGuard dùng để làm gì?",
        options: [
          "Test app",
          "Shrink, obfuscate, optimize code trước khi release",
          "Deploy app",
          "Design UI",
        ],
        correctIndex: 1,
        explanation: "R8/ProGuard: shrink (giảm size), obfuscate (làm khó reverse engineer), optimize code.",
      },
      {
        question: "EncryptedSharedPreferences khác SharedPreferences thường ở điểm nào?",
        options: [
          "Nhanh hơn",
          "Mã hóa dữ liệu trước khi lưu",
          "Lưu được nhiều hơn",
          "Không khác gì",
        ],
        correctIndex: 1,
        explanation: "EncryptedSharedPreferences tự động encrypt/decrypt data — bảo vệ sensitive data.",
      },
    ],
  },
  {
    slug: "play-store-deploy",
    questions: [
      {
        question: "AAB (Android App Bundle) khác APK như thế nào?",
        options: [
          "Không khác gì",
          "AAB nhỏ hơn vì Google Play chỉ deliver resources cần thiết cho device",
          "APK nhỏ hơn",
          "AAB chỉ dùng cho iOS",
        ],
        correctIndex: 1,
        explanation: "AAB: Google Play tạo optimized APK cho từng device config → smaller download size.",
      },
      {
        question: "App signing key nên được quản lý như thế nào?",
        options: [
          "Commit lên Git",
          "Upload lên Play App Signings, backup an toàn",
          "Để trong source code",
          "Không cần quản lý",
        ],
        correctIndex: 1,
        explanation: "Upload signing key lên Google Play App Signings. Backup keystore an toàn — mất = không update được app.",
      },
    ],
  },
  {
    slug: "interview-prep",
    questions: [
      {
        question: "Khi được hỏi 'Hãy kể về project bạn đã làm', cách trả lời tốt nhất?",
        options: [
          "Liệt kê tất cả technologies",
          "STAR method: Situation, Task, Action, Result — focus vào contribution của bạn",
          "Nói project lớn nhất",
          "Đọc lại code",
        ],
        correctIndex: 1,
        explanation: "STAR method giúp structured answer: Context (S), Challenge (T), What you did (A), Outcome (R).",
      },
      {
        question: "Portfolio quan trọng nhất điều gì?",
        options: [
          "Nhiều projects nhất có thể",
          "Code quality, documentation, và ability to explain decisions",
          "Dùng nhiều frameworks",
          "UI đẹp nhất",
        ],
        correctIndex: 1,
        explanation: "Interviewers đánh giá code quality, clean architecture, tests, và khả năng giải thích design decisions.",
      },
    ],
  },
];

export function getQuizBySlug(slug: string): LessonQuiz | undefined {
  return QUIZZES.find((q) => q.slug === slug);
}
