import { getHistoryConfig } from "@agent/_config";

async function getDbModule() {
  return import("@agent/_lib/db");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!getHistoryConfig().enabled) {
    return Response.json({ error: "Conversation history is disabled" }, { status: 404 });
  }

  try {
    const { getConversation, getMessages } = await getDbModule();
    const conversation = getConversation(id);
    if (!conversation) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    const messages = getMessages(id);
    return Response.json({
      ...conversation,
      config: JSON.parse(conversation.config),
      messages: messages.map((m) => ({
        ...m,
        parts: JSON.parse(m.parts),
      })),
    });
  } catch {
    return Response.json({ error: "Conversation history is unavailable" }, { status: 503 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { messageId, role, content, parts } = await req.json();

  if (!getHistoryConfig().enabled) {
    return Response.json({ ok: true, persistenceDisabled: true });
  }

  try {
    const { addMessage } = await getDbModule();
    addMessage(messageId, id, role, content, parts);
    return Response.json({ ok: true, persistenceDisabled: false });
  } catch {
    return Response.json({ ok: true, persistenceDisabled: true });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!getHistoryConfig().enabled) {
    return Response.json({ ok: true, persistenceDisabled: true });
  }

  try {
    const { deleteConversation } = await getDbModule();
    deleteConversation(id);
    return Response.json({ ok: true, persistenceDisabled: false });
  } catch {
    return Response.json({ ok: true, persistenceDisabled: true });
  }
}
