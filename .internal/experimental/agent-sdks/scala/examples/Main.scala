import java.io.{BufferedReader, InputStreamReader, OutputStream}
import java.net.Socket

object Main {
  def main(args: Array[String]): Unit = {
    val host = "127.0.0.1"
    val port = 3000
    val path = "/api/v1/run"
    val body = """{"prompt":"What are the top 3 stories on Hacker News right now?"}"""

    val request =
      s"POST $path HTTP/1.1\r\nHost: $host:$port\r\nContent-Type: application/json\r\nContent-Length: ${body.length}\r\nConnection: close\r\n\r\n$body"

    val sock = new Socket(host, port)
    val out = sock.getOutputStream
    out.write(request.getBytes("UTF-8"))
    out.flush()

    val reader = new BufferedReader(new InputStreamReader(sock.getInputStream, "UTF-8"))
    val sb = new StringBuilder
    var line = reader.readLine()
    while (line != null) { sb.append(line).append("\n"); line = reader.readLine() }

    sock.close()

    val raw = sb.toString
    val sep = raw.indexOf("\r\n\r\n")
    val jsonBody = if (sep >= 0) raw.substring(sep + 4) else raw
    println(jsonBody)
  }
}
