import { supabase } from "@/lib/supabase/server";
import { ChatMessageWithSender } from "@/types/database";
import { getAuthUser } from "@/utils/getAuthUser";
import { notFound } from "next/navigation";
import { ChatDisplay } from "./chat-display";

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
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
    .select("*, sender:sender_id(email, firstname, lastname)")
    .order("created_at", { ascending: true })
    .eq("chat_id", id)
    .returns<ChatMessageWithSender[]>();
  const { data: userChatKey } = await supabase
    .from("UserChatKeys")
    .select("key")
    .eq("chat_id", id)
    .eq("user_id", user.id)
    .single();

  const chatKey = userChatKey?.key ?? "";
  const messages = messageData ?? [];

  return <ChatDisplay chatKey={chatKey} chat={chat} messages={messages} />;
}
