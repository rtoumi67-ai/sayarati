import { z } from "zod";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().min(1),
});

const saveSchema = z.object({
  conversationId: z.string().uuid().optional(),
  mode: z.enum(["customer", "mechanic"]),
  title: z.string().min(1).max(120),
  preview: z.string().max(240).optional(),
  messages: z.array(messageSchema).min(1).max(40),
});

type ConversationRow = {
  id: string;
  mode: "customer" | "mechanic";
  title: string;
  preview: string | null;
  messages: Array<{ role: "user" | "assistant"; text: string }>;
  updated_at: string;
};

async function getAuthedSupabase() {
  const supabase = await createSupabaseServerClient({ mutableCookies: true });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    return { supabase, userId: null };
  }

  return { supabase, userId: session.user.id };
}

export async function GET() {
  const { supabase, userId } = await getAuthedSupabase();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("assistant_conversations")
    .select("id, mode, title, preview, messages, updated_at")
    .order("updated_at", { ascending: false })
    .limit(8);

  if (error) {
    return Response.json({ error: "Failed to load assistant history." }, { status: 500 });
  }

  return Response.json({
    conversations: (data ?? []) as ConversationRow[],
  });
}

export async function POST(request: Request) {
  const { supabase, userId } = await getAuthedSupabase();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = saveSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: "Invalid history payload." }, { status: 400 });
  }

  const payload = {
    user_id: userId,
    mode: parsed.data.mode,
    title: parsed.data.title,
    preview: parsed.data.preview ?? null,
    messages: parsed.data.messages,
  };

  const query = parsed.data.conversationId
    ? supabase
        .from("assistant_conversations")
        .update(payload)
        .eq("id", parsed.data.conversationId)
        .select("id, mode, title, preview, messages, updated_at")
        .single()
    : supabase
        .from("assistant_conversations")
        .insert(payload)
        .select("id, mode, title, preview, messages, updated_at")
        .single();

  const { data, error } = await query;
  if (error || !data) {
    return Response.json({ error: "Failed to save assistant history." }, { status: 500 });
  }

  return Response.json({
    conversation: data as ConversationRow,
  });
}
