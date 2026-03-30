import { workerProgress } from "@/lib/agents/workers";

export async function GET() {
  const entries: Record<string, unknown> = {};
  for (const [id, progress] of workerProgress) {
    entries[id] = progress;
  }
  return Response.json(entries);
}
