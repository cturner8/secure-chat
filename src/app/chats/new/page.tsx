import { logger } from "@/lib/logger";
import { supabase as supabaseAdmin } from "@/lib/supabase/admin";
import { AesEncryption, RsaEncryption } from "@/utils/encryption";
import { getAuthUser } from "@/utils/getAuthUser";
import { getUserPublicKey } from "@/utils/getUserPublicKey";
import { redirect } from "next/navigation";

const aes = new AesEncryption();
const rsa = new RsaEncryption();

export const dynamic = "force-dynamic";

const createChat = async (formData: FormData) => {
  "use server";

  const user = await getAuthUser();

  const name = formData.get("name")?.toString();

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
      user_id: user.id,
    });

    // generate symmetric encryption key
    const chatKey = await aes.generateKey();
    const chatJwk = await aes.exportKey(chatKey);

    // encrypt using user's public key
    const userPublicKey = await getUserPublicKey(user.id);
    const encryptedChatKey = await rsa.encrypt(
      aes.toBase64(chatJwk),
      userPublicKey,
    );

    // save in user chat keys table
    await supabaseAdmin.from("UserChatKeys").insert({
      chat_id: chat.id,
      user_id: user.id,
      key: encryptedChatKey,
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
