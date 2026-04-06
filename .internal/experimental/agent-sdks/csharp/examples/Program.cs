using System.Net.Http.Json;
using System.Text.Json;

var baseUrl = Environment.GetEnvironmentVariable("AGENT_URL") ?? "http://localhost:3000/api/v1";

using var http = new HttpClient();
var resp = await http.PostAsJsonAsync($"{baseUrl}/run", new
{
    prompt = "What are the top 3 stories on Hacker News right now?",
    maxSteps = 5
});

resp.EnsureSuccessStatusCode();

var result = await resp.Content.ReadFromJsonAsync<JsonElement>();

Console.WriteLine(result.GetProperty("text").GetString());

if (result.TryGetProperty("usage", out var usage))
    Console.WriteLine($"\nTokens: {usage.GetProperty("totalTokens")}");
