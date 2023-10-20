import { createServerClient } from "@/lib/supabase/server";
import { ChatMemberWithProfile, ChatMessageWithFiles } from "@/types/database";
import { getAuthUser } from "@/utils/getAuthUser";
import { notFound } from "next/navigation";
import { ChatDisplay } from "./chat-display";

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
  const supabase = createServerClient();

  const { id } = params;

  const user = await getAuthUser();

  const { data: chat } = await supabase
    .from("Chats")
    .select("*, ChatMembers(id)")
    .eq("ChatMembers.user_id", user.id)
    .eq("id", id)
    .single();
  if (!chat) {
    return notFound();
  }
  const { data: messageData } = await supabase
    .from("ChatMessages")
    .select("*, files:ChatMessageFiles(path)")
    .order("created_at", { ascending: true })
    .eq("chat_id", id)
    .eq("ChatMessageFiles.chat_id", id)
    .returns<ChatMessageWithFiles[]>();
  const { data: userChatKey } = await supabase
    .from("UserChatKeys")
    .select("key")
    .eq("chat_id", id)
    .eq("user_id", user.id)
    .single();
  const { data: chatMemberData } = await supabase
    .from("ChatMembers")
    .select("user_id, profile:user_id(email, firstname, lastname)")
    .eq("chat_id", id)
    .returns<ChatMemberWithProfile[]>();
  const chatKey = userChatKey?.key ?? "";
  const messages = messageData ?? [];
  const chatMembers = chatMemberData ?? [];

  return (
    <ChatDisplay
      chatKey={chatKey}
      chat={chat}
      messages={messages}
      members={chatMembers}
    />
  );
}
