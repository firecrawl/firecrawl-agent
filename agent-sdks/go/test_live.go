package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

func main() {
	fmt.Println("Go SDK test")
	fmt.Println("==================================================")

	body, _ := json.Marshal(map[string]any{
		"prompt":   "Search for the current top story on Hacker News and tell me its title and point count.",
		"maxSteps": 5,
	})

	start := time.Now()
	client := &http.Client{Timeout: 2 * time.Minute}
	resp, err := client.Post("http://localhost:3005/api/v1/run", "application/json", bytes.NewReader(body))
	if err != nil {
		fmt.Fprintf(os.Stderr, "ERROR: %v\n", err)
		os.Exit(1)
	}
	defer resp.Body.Close()
	elapsed := time.Since(start)

	if resp.StatusCode != 200 {
		b, _ := io.ReadAll(resp.Body)
		fmt.Fprintf(os.Stderr, "ERROR: %d — %s\n", resp.StatusCode, string(b)[:200])
		os.Exit(1)
	}

	var result map[string]any
	json.NewDecoder(resp.Body).Decode(&result)

	steps, _ := result["steps"].([]any)
	usage, _ := result["usage"].(map[string]any)

	fmt.Printf("Completed in %.1fs\n", elapsed.Seconds())
	fmt.Printf("Steps: %d\n", len(steps))
	fmt.Printf("Tokens: %.0f\n", usage["totalTokens"])

	text, _ := result["text"].(string)
	if len(text) > 500 {
		text = text[:500]
	}
	fmt.Printf("\nResponse:\n%s\n", text)
	fmt.Println("\nGo test PASSED")
}
