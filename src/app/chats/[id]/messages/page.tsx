import { supabase } from "@/lib/supabase/server";
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
    .select("*")
    .order("created_at", { ascending: false })
    .eq("chat_id", id);
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
