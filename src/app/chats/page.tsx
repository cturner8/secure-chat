"use server";

import { supabase } from "@/lib/supabase/server";

import type { Database } from "@/lib/database.types";

type Chat = Database["public"]["Tables"]["Chats"]["Row"];

export default async function Page() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { user } = session ?? {};

  let chats: Chat[] = [];

  if (user) {
    const { data } = await supabase
      .from("Chats")
      .select("*, ChatMembers(id)")
      .eq("ChatMembers.user_id", user.id);

    chats = data ?? [];
  }

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
