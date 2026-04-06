import java.net.HttpURLConnection
import java.net.URL

val baseUrl = System.getenv("AGENT_URL") ?: "http://localhost:3000/api/v1"
val url = URL("$baseUrl/run")

val payload = """{"prompt":"What are the top 3 stories on Hacker News right now?","maxSteps":5}"""

val conn = (url.openConnection() as HttpURLConnection).apply {
    requestMethod = "POST"
    doOutput = true
    setRequestProperty("Content-Type", "application/json")
    outputStream.use { it.write(payload.toByteArray()) }
}

if (conn.responseCode != 200) {
    val err = conn.errorStream?.bufferedReader()?.readText() ?: "unknown error"
    System.err.println("server error ${conn.responseCode}: $err")
    kotlin.system.exitProcess(1)
}

val body = conn.inputStream.bufferedReader().readText()
val text = Regex(""""text"\s*:\s*"((?:[^"\\]|\\.)*)"""").find(body)?.groupValues?.get(1)
val steps = Regex(""""steps"\s*:\s*\[""").find(body)?.let {
    body.substring(it.range.first).count { c -> c == '{' }
} ?: 0

println(text?.replace("\\n", "\n") ?: "(no text)")
println("\nSteps: $steps")
