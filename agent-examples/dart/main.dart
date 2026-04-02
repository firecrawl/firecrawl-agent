import 'dart:convert';
import 'dart:io';

void main() async {
  final baseURL = Platform.environment['AGENT_URL'] ?? 'http://localhost:3000/api/v1';
  final uri = Uri.parse('$baseURL/run');

  final client = HttpClient();
  final request = await client.postUrl(uri);
  request.headers.contentType = ContentType.json;
  request.write(jsonEncode({
    'prompt': 'What are the top 3 stories on Hacker News right now?',
    'maxSteps': 5,
  }));

  final response = await request.close();
  final body = await response.transform(utf8.decoder).join();

  if (response.statusCode != 200) {
    stderr.writeln('server error ${response.statusCode}: $body');
    exit(1);
  }

  final result = jsonDecode(body) as Map<String, dynamic>;
  print(result['text'] ?? '');
  print('\nSteps: ${(result['steps'] as List?)?.length ?? 0}');
  final usage = result['usage'] as Map<String, dynamic>?;
  if (usage != null) print('Tokens: ${usage['totalTokens']}');

  client.close();
}
