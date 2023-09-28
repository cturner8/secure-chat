import { logger } from "@/lib/logger";
import { supabase as supabaseAdmin } from "@/lib/supabase/admin";
import { supabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const createChat = async (formData: FormData) => {
  "use server";

  const name = formData.get("name")?.valueOf().toString();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { user } = session ?? {};

  const { data, error } = await supabaseAdmin
    .from("Chats")
    .insert({
      name,
    })
    .select();

  if (error) {
    logger.error(error);
  }
  const [chat] = data ?? [];

  if (chat) {
    await supabaseAdmin.from("ChatMembers").insert({
      chat_id: chat.id,
      user_id: user?.id,
    });
  }

  redirect("/chats");
};

export default function Page() {
  return (
    <>
      <h1 className="mb-4">New Chat</h1>
      <form className="flex flex-col" action={createChat}>
        <label id="name" htmlFor="name">
          Chat Name
        </label>
        <input name="name" type="text" className="text-black" />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
