"use server";

import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase/server";

type Chat = Database["public"]["Tables"]["Chats"]["Row"];

export default async function Home() {
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
    <main>
      <h1 className="mb-4">My Chats</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>{chat.name}</li>
        ))}
      </ul>
    </main>
  );
}
