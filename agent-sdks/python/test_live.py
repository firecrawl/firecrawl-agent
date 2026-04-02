"""Live test: Call the Firecrawl Agent API from Python."""
import requests
import json
import time

BASE_URL = "http://localhost:3005/api/v1"

def main():
    print("Python SDK test")
    print("=" * 50)

    start = time.time()
    resp = requests.post(f"{BASE_URL}/run", json={
        "prompt": "Search for the current top story on Hacker News and tell me its title and point count.",
        "maxSteps": 5,
    }, timeout=120)
    elapsed = time.time() - start

    assert resp.status_code == 200, f"ERROR: {resp.status_code} — {resp.text[:200]}"
    result = resp.json()

    print(f"Completed in {elapsed:.1f}s")
    print(f"Steps: {len(result.get('steps', []))}")
    print(f"Tokens: {result.get('usage', {}).get('totalTokens', 'N/A')}")
    print(f"\nResponse:\n{result.get('text', '')[:500]}")
    print("\nPython test PASSED")

if __name__ == "__main__":
    main()
