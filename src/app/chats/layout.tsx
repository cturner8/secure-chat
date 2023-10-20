"use server";

import { createServerClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/utils/getAuthUser";

import type { ChatWithKey } from "@/types/database";
import type { User } from "@supabase/supabase-js";
import { ChatList } from "./chat-list";

type Props = {
  children: React.ReactNode;
};

const getUserChats = async (user: User) => {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("Chats")
    .select("*, ChatMembers(id), chatKey:UserChatKeys(key)")
    .eq("ChatMembers.user_id", user.id)
    .eq("UserChatKeys.user_id", user.id)
    .order("updated_at", { ascending: false })
    .returns<ChatWithKey[]>();
  const chats = data ?? [];

  return chats;
};

export default async function Page({ children }: Props) {
  const user = await getAuthUser();
  const chats = await getUserChats(user);

  return (
    <main className="flex flex-row h-full w-full bg-gray-100">
      <div className="w-1/5 p-4 border-r-2 border-black-200">
        <ChatList chats={chats} />
      </div>
      <div className="w-4/5 h-full">{children}</div>
    </main>
  );
}
