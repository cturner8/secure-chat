"use server";

import { supabase } from "@/lib/supabase/server";

import type { ChatWithKey } from "@/types/database";
import { getAuthUser } from "@/utils/getAuthUser";
import { ChatList } from "./chat-list";

export default async function Page() {
  const user = await getAuthUser();

  const { data } = await supabase
    .from("Chats")
    .select("*, ChatMembers(id), chatKey:UserChatKeys(key)")
    .eq("ChatMembers.user_id", user.id)
    .eq("UserChatKeys.user_id", user.id)
    .order("updated_at", { ascending: false })
    .returns<ChatWithKey[]>();
  const chats = data ?? [];

  return (
    <>
      <ChatList chats={chats} />
    </>
  );
}
