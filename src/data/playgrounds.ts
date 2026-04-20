export interface PlaygroundSnippet {
  slug: string;
  title: string;
  code: string;
}

export const PLAYGROUND_SNIPPETS: PlaygroundSnippet[] = [
  {
    slug: "kotlin-intro",
    title: "Hello World",
    code: `fun main() {
    // In ra màn hình console
    println("Hello, World!")
    println("Xin chào Việt Nam!")
    
    // Khai báo biến với val (không thể thay đổi)
    val greeting = "Chào mừng bạn đến với Kotlin"
    println(greeting)
}`,
  },
  {
    slug: "kotlin-variables",
    title: "Val vs Var & String Templates",
    code: `fun main() {
    // val = immutable (không thể thay đổi)
    val name = "Kotlin"
    val version = 21
    
    // var = mutable (có thể thay đổi)
    var count = 0
    count = 5  // OK, var có thể thay đổi
    
    // String templates
    println("Ngôn ngữ: $name")
    println("Phiên bản: $version")
    println("Số lượng: $count")
    
    // Biểu thức trong template
    println("1 + 2 = \${1 + 2}")
    println("Tên dài: \${name.length} ký tự")
}`,
  },
  {
    slug: "kotlin-functions",
    title: "Functions & Lambda",
    code: `// Hàm cơ bản
fun greet(name: String): String {
    return "Xin chào, $name!"
}

// Hàm một dòng (single expression)
fun add(a: Int, b: Int) = a + b

// Default parameter
fun introduce(name: String, age: Int = 18) {
    println("Tôi là $name, $age tuổi")
}

// Lambda expression
val multiply = { a: Int, b: Int -> a * b }

// Higher-order function
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

fun main() {
    println(greet("Kotlin"))
    println("3 + 4 = \${add(3, 4)}")
    introduce("An")           // dùng default age
    introduce("Bình", 25)     // override age
    println("3 × 4 = \${multiply(3, 4)}")
    println("10 - 3 = \${calculate(10, 3) { a, b -> a - b }}")
}`,
  },
  {
    slug: "kotlin-control-flow",
    title: "When Expression & Loops",
    code: `fun main() {
    val score = 85
    
    // When expression (enhanced switch-case)
    val grade = when {
        score >= 90 -> "A"
        score >= 80 -> "B"
        score >= 70 -> "C"
        score >= 60 -> "D"
        else -> "F"
    }
    println("Điểm $score → Grade: $grade")
    
    // When với giá trị
    val day = 3
    val dayName = when (day) {
        1 -> "Thứ Hai"
        2 -> "Thứ Ba"
        3 -> "Thứ Tư"
        4 -> "Thứ Năm"
        5 -> "Thứ Sáu"
        6, 7 -> "Cuối tuần"
        else -> "Không hợp lệ"
    }
    println("Ngày $day là $dayName")
    
    // For loop với range
    println("\\nĐếm từ 1 đến 5:")
    for (i in 1..5) {
        print("$i ")
    }
    
    // For loop với step
    println("\\n\\nSố chẵn từ 2 đến 10:")
    for (i in 2..10 step 2) {
        print("$i ")
    }
    
    // While loop
    println("\\n\\nWhile loop:")
    var x = 5
    while (x > 0) {
        print("$x ")
        x--
    }
}`,
  },
  {
    slug: "kotlin-oop",
    title: "Class, Data Class & Interface",
    code: `// Class cơ bản
class Person(val name: String, var age: Int) {
    fun introduce() {
        println("Tôi là $name, $age tuổi")
    }
}

// Data class — tự动生成 toString, equals, hashCode, copy
data class Student(
    val name: String,
    val age: Int,
    val grade: String
)

// Interface
interface Drawable {
    fun draw()
    fun description() = "Vẽ đối tượng"  // default implementation
}

// Abstract class
abstract class Shape(val color: String) {
    abstract fun area(): Double
}

// Kế thừa
class Circle(color: String, val radius: Double) : Shape(color), Drawable {
    override fun area() = Math.PI * radius * radius
    override fun draw() {
        println("Vẽ hình tròn màu $color, bán kính $radius")
    }
}

fun main() {
    // Class
    val person = Person("An", 25)
    person.introduce()
    
    // Data class
    val student1 = Student("Bình", 20, "A")
    val student2 = student1.copy(name = "Cường")  // copy với thay đổi
    println(student1)
    println(student2)
    println("Bằng nhau: \${student1 == student2}")
    
    // Interface + Abstract class
    val circle = Circle("đỏ", 5.0)
    circle.draw()
    println("Diện tích: %.2f".format(circle.area()))
    println(circle.description())
}`,
  },
  {
    slug: "kotlin-collections",
    title: "List, Map & Collection Operations",
    code: `fun main() {
    // List
    val fruits = listOf("Táo", "Chuối", "Cam", "Xoài", "Dưa hấu")
    println("Fruits: $fruits")
    println("Đầu tiên: \${fruits.first()}")
    println("Số lượng: \${fruits.size}")
    
    // Mutable list
    val numbers = mutableListOf(1, 2, 3, 4, 5)
    numbers.add(6)
    numbers.removeAt(0)
    println("Numbers: $numbers")
    
    // Map
    val capitals = mapOf(
        "Việt Nam" to "Hà Nội",
        "Nhật Bản" to "Tokyo",
        "Hàn Quốc" to "Seoul"
    )
    println("Thủ đô VN: \${capitals["Việt Nam"]}")
    
    // Collection operations
    val scores = listOf(85, 92, 78, 95, 60, 88, 73)
    
    // filter — lọc
    val passed = scores.filter { it >= 80 }
    println("\\nĐiểm đạt (≥80): $passed")
    
    // map — chuyển đổi
    val doubled = scores.map { it * 2 }
    println("Nhân đôi: $doubled")
    
    // reduce — gộp
    val sum = scores.reduce { acc, i -> acc + i }
    println("Tổng: $sum")
    
    // sorted — sắp xếp
    println("Sắp xếp: \${scores.sorted()}")
    println("Giảm dần: \${scores.sortedDescending()}")
    
    // Chaining operations
    val topScores = scores
        .filter { it >= 80 }
        .sortedDescending()
        .take(3)
    println("Top 3 điểm cao (≥80): $topScores")
}`,
  },
  {
    slug: "kotlin-null-safety",
    title: "Null Safety & Extension Functions",
    code: `// Nullable types
fun getLength(text: String?): Int {
    // Safe call operator ?.
    return text?.length ?: 0  // Elvis operator ?: — giá trị mặc định nếu null
}

// Extension function
fun String.addExclamation() = "$this!"

// Extension function with nullable
fun String?.orDefault(default: String = "Không có giá trị"): String {
    return this ?: default
}

fun main() {
    // Nullable vs Non-nullable
    val name: String = "Kotlin"        // Không thể null
    val nickname: String? = null       // Có thể null
    
    println("Tên: $name")
    println("Nickname: $nickname")
    
    // Safe call — không crash khi null
    println("Độ dài nickname: \${nickname?.length}")          // null
    println("Độ dài nickname: \${nickname?.length ?: 0}")     // 0
    
    // Safe call chaining
    val user: String? = null
    val email = user?.uppercase()?.take(3) ?: "N/A"
    println("Email: $email")
    
    // Non-null assertion !! (cẩn thận — có thể throw NPE)
    val definitelyNotNull: String? = "Hello"
    println("Uppercase: \${definitelyNotNull!!.uppercase()}")
    
    // Extension functions
    val greeting = "Xin chào".addExclamation()
    println(greeting)
    
    // Nullable extension
    val nullString: String? = null
    println(nullString.orDefault("Mặc định"))
    println("Hello".orDefault("Mặc định"))
}`,
  },
  {
    slug: "compose-intro",
    title: "Composable Functions (Preview)",
    code: `// Jetpack Compose — Code mẫu (chạy trên Android, không chạy ở đây)
// Mở trong Android Studio để test

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun Greeting(name: String) {
    Text(text = "Xin chào, $name!")
}

@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    
    Column {
        Text("Bạn đã nhấn $count lần")
        Button(onClick = { count++ }) {
            Text("Nhấn tôi")
        }
    }
}

// Preview trong Android Studio
@Preview
@Composable
fun GreetingPreview() {
    Greeting("Kotlin")
}`,
  },
  {
    slug: "coroutines-flow",
    title: "Coroutines Basics",
    code: `import kotlinx.coroutines.*

// Suspend function — có thể暂停 mà không block thread
suspend fun fetchData(): String {
    delay(1000)  // Giả lập network call
    return "Dữ liệu đã tải xong"
}

suspend fun processData(): Int {
    delay(500)
    return 42
}

fun main() = runBlocking {
    println("Bắt đầu...")
    
    // launch — fire and forget
    launch {
        delay(100)
        println("Coroutine 1 hoàn thành")
    }
    
    // async — trả về kết quả
    val result = async { fetchData() }
    val number = async { processData() }
    
    println("Đang chờ kết quả...")
    println(result.await())   // Chờ fetchData
    println(number.await())   // Chờ processData
    
    // withContext — đổi dispatcher
    val computed = withContext(Dispatchers.Default) {
        (1..1000000).sum()
    }
    println("Tổng: $computed")
}`,
  },
  {
    slug: "mvvm-intro",
    title: "MVVM Pattern (Preview)",
    code: `// MVVM Pattern — Code mẫu (chạy trên Android)

// Model
data class User(val id: Int, val name: String, val email: String)

// Repository
class UserRepository {
    suspend fun getUsers(): List<User> {
        // Giả lập API call
        delay(1000)
        return listOf(
            User(1, "An", "an@email.com"),
            User(2, "Bình", "binh@email.com")
        )
    }
}

// ViewModel
class UserViewModel(private val repository: UserRepository) : ViewModel() {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users
    
    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading
    
    fun loadUsers() {
        viewModelScope.launch {
            _loading.value = true
            _users.value = repository.getUsers()
            _loading.value = false
        }
    }
}

// View (Compose)
@Composable
fun UserScreen(viewModel: UserViewModel) {
    val users by viewModel.users.collectAsState()
    val loading by viewModel.loading.collectAsState()
    
    LaunchedEffect(Unit) { viewModel.loadUsers() }
    
    if (loading) CircularProgressIndicator()
    else LazyColumn {
        items(users) { user ->
            Text("\${user.name} - \${user.email}")
        }
    }
}`,
  },
];

export function getPlaygroundBySlug(slug: string): PlaygroundSnippet[] {
  return PLAYGROUND_SNIPPETS.filter((s) => s.slug === slug);
}
