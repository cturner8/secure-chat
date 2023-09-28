"use server";

import { supabase } from "@/lib/supabase/server";

import type { Database } from "@/lib/database.types";
import { getAuthUser } from "@/utils/getAuthUser";

type Chat = Database["public"]["Tables"]["Chats"]["Row"];

export default async function Page() {
  const user = await getAuthUser();

  let chats: Chat[] = [];
  const { data } = await supabase
    .from("Chats")
    .select("*, ChatMembers(id)")
    .eq("ChatMembers.user_id", user.id);

  chats = data ?? [];

  return (
    <>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>{chat.name}</li>
        ))}
      </ul>
    </>
  );
}
