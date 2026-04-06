Mix.install([{:jason, "~> 1.4"}])

base_url = System.get_env("AGENT_URL", "http://localhost:3000/api/v1")
url = ~c"#{base_url}/run"

body = Jason.encode!(%{prompt: "What are the top 3 stories on Hacker News right now?"})

:ok = :application.ensure_all_started(:inets)
:ok = :application.ensure_all_started(:ssl)

{:ok, {{_, 200, _}, _, resp_body}} =
  :httpc.request(:post, {url, [{~c"content-type", ~c"application/json"}], ~c"application/json", body}, [], [])

result = Jason.decode!(resp_body)

IO.puts(result["text"])

steps = result["steps"] || []
usage = result["usage"] || %{}
IO.puts("\nSteps:  #{length(steps)}")
IO.puts("Tokens: #{usage["totalTokens"]}")
