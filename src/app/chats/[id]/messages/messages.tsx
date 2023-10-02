"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserKeys } from "@/hooks/userUserKeys";
import { supabase } from "@/lib/supabase/client";
import { AesEncryption, RsaEncryption } from "@/utils/encryption";
import type { FormEventHandler } from "react";

interface Props {
  chatId: string;
  chatKey: string;
}
type Component = (props: Props) => JSX.Element;

const aes = new AesEncryption();
const rsa = new RsaEncryption();

export const ChatMessages: Component = ({ chatId, chatKey }) => {
  const user = useAuthUser();
  const { privateKey } = useUserKeys();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const message = formData.get("message")?.toString() ?? "";

      const decryptedChatKey = await rsa.decrypt(chatKey, privateKey);
      const jwk = await aes.importKey(decryptedChatKey);
      const encryptedMessage = await aes.encrypt(message, jwk);

      await supabase.from("ChatMessages").insert({
        message: encryptedMessage,
        sender_id: user.id,
        chat_id: chatId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>Messages</h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <input
          name="message"
          type="text"
          className="text-black"
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};
