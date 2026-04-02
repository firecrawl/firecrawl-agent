import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;

public class Main {
    public static void main(String[] args) throws Exception {
        String baseURL = System.getenv("AGENT_URL");
        if (baseURL == null || baseURL.isEmpty())
            baseURL = "http://localhost:3000/api/v1";

        var conn = (HttpURLConnection) URI.create(baseURL + "/run").toURL().openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        String payload = """
                {"prompt":"What are the top 3 stories on Hacker News right now?","maxSteps":10}""";
        try (var os = conn.getOutputStream()) { os.write(payload.getBytes()); }

        if (conn.getResponseCode() != 200) {
            var err = new String(conn.getErrorStream().readAllBytes());
            System.err.println("Error " + conn.getResponseCode() + ": " + err);
            System.exit(1);
        }

        String json = new String(conn.getInputStream().readAllBytes());

        // Print a snippet of the response
        System.out.println(json.substring(0, Math.min(json.length(), 800)));

        // Count top-level objects in the "steps" array as a rough step count
        int steps = 0, depth = 0;
        int si = json.indexOf("\"steps\":[");
        if (si >= 0) {
            for (int i = si + 9; i < json.length(); i++) {
                char c = json.charAt(i);
                if (c == '{') { if (depth == 0) steps++; depth++; }
                else if (c == '}') depth--;
                else if (c == ']' && depth == 0) break;
            }
        }
        System.out.println("\nSteps: " + steps);
    }
}
