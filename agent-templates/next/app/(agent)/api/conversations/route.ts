import { getHistoryConfig } from "@agent/_config";

async function getDbModule() {
  return import("@agent/_lib/db");
}

export async function GET() {
  if (!getHistoryConfig().enabled) {
    return Response.json([]);
  }

  try {
    const { listConversations } = await getDbModule();
    const conversations = listConversations();
    return Response.json(conversations);
  } catch {
    return Response.json([]);
  }
}

export async function POST(req: Request) {
  const { id, title, config } = await req.json();

  if (!getHistoryConfig().enabled) {
    return Response.json({ id, title, persistenceDisabled: true });
  }

  try {
    const { createConversation } = await getDbModule();
    createConversation(id, title, config ?? {});
    return Response.json({ id, title, persistenceDisabled: false });
  } catch {
    return Response.json({ id, title, persistenceDisabled: true });
  }
}
