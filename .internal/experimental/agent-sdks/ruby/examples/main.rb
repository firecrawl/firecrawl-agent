require "net/http"
require "json"
require "uri"

base_url = ENV.fetch("AGENT_URL", "http://localhost:3000/api/v1")
uri = URI("#{base_url}/run")

resp = Net::HTTP.post(uri, { prompt: "What are the top 3 stories on Hacker News right now?" }.to_json,
                      "Content-Type" => "application/json")

abort "server error #{resp.code}: #{resp.body}" unless resp.is_a?(Net::HTTPSuccess)

result = JSON.parse(resp.body)

puts result["text"]

steps = result["steps"] || []
usage = result["usage"] || {}
puts "\nSteps:  #{steps.length}"
puts "Tokens: #{usage["totalTokens"]}"
