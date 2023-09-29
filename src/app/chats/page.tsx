"use server";

import { supabase } from "@/lib/supabase/server";

import { getAuthUser } from "@/utils/getAuthUser";
import Link from "next/link";

export default async function Page() {
  const user = await getAuthUser();

  const { data } = await supabase
    .from("Chats")
    .select("*, ChatMembers(id)")
    .eq("ChatMembers.user_id", user.id)
    .order("updated_at", { ascending: false });
  const chats = data ?? [];

  return (
    <>
      <ul className="flex flex-col">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chats/${chat.id}`}>
            {chat.name}
          </Link>
        ))}
      </ul>
    </>
  );
}
