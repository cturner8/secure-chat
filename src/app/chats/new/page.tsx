import { logger } from "@/lib/logger";
import { supabase as supabaseAdmin } from "@/lib/supabase/admin";
import { AesEncryption, RsaEncryption } from "@/utils/encryption";
import { getAuthUser } from "@/utils/getAuthUser";
import { getUserPublicKey } from "@/utils/getUserPublicKey";
import type { JWK } from "jose";
import { redirect } from "next/navigation";

const aes = new AesEncryption();
const rsa = new RsaEncryption();

export const dynamic = "force-dynamic";

const encryptUserChatKey = async (
  chatId: string,
  userId: string,
  chatJwk: JWK,
) => {
  // get the user public key
  const userPublicKey = await getUserPublicKey(userId);
  // encrypt the chat key for the user using their public key
  const encryptedChatKey = await rsa.encrypt(chatJwk, userPublicKey);
  // save encrypted key in user chat keys table
  return supabaseAdmin.from("UserChatKeys").insert({
    chat_id: chatId,
    user_id: userId,
    key: encryptedChatKey,
  });
};

const createChat = async (formData: FormData) => {
  "use server";

  const user = await getAuthUser();

  const name = formData.get("name")?.toString();
  const recipient = formData.get("recipient")?.toString();

  // generate symmetric encryption key
  const chatKey = await aes.generateKey();
  const chatJwk = await aes.exportKey(chatKey);

  // encrypt the input name, if provided
  const encryptedName = name ? await aes.encrypt(name, chatKey) : undefined;

  const { data, error } = await supabaseAdmin
    .from("Chats")
    .insert({
      name: encryptedName,
    })
    .select();

  if (error) {
    logger.error(error);
  }
  const [chat] = data ?? [];

  const memberUserIds = [user.id];

  if (recipient) {
    const { data: chatMembers } = await supabaseAdmin
      .from("UserProfiles")
      .select("id")
      .eq("email", recipient);
    if (chatMembers) {
      memberUserIds.push(...chatMembers.map((member) => member.id));
    }
  }

  if (chat) {
    await Promise.all([
      ...memberUserIds.map((userId) =>
        supabaseAdmin.from("ChatMembers").insert({
          chat_id: chat.id,
          user_id: userId,
        }),
      ),
    ]);

    // encrypt the chat key for each member user
    await Promise.all([
      ...memberUserIds.map(async (userId) =>
        encryptUserChatKey(chat.id, userId, chatJwk),
      ),
    ]);
  }

  redirect(`/chats/${chat.id}/messages`);
};

export default function Page() {
  return (
    <>
      <h1 className="mb-4">New Chat</h1>
      <form className="flex flex-col gap-2" action={createChat}>
        <label id="name" htmlFor="name">
          Chat Name
        </label>
        <input
          name="name"
          type="text"
          className="rounded-md mb-4 focus:outline-none bg-gray-100 border-gray-300"
        />
        <label id="name" htmlFor="name">
          Recipient Email
        </label>
        <input
          name="recipient"
          type="text"
          className="rounded-md mb-4 focus:outline-none bg-gray-100 border-gray-300"
        />
        <button type="submit" className="rounded-md bg-primary h-10 text-white">
          Save
        </button>
      </form>
    </>
  );
}
