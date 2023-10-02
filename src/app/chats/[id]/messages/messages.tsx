"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { supabase } from "@/lib/supabase/client";
import { useChatContext } from "@/providers/chat-provider";
import { AesEncryption } from "@/utils/encryption";
import type { FormEventHandler } from "react";
import { MessageList } from "./message-list";

interface Props {}
type Component = (props: Props) => JSX.Element;

const aes = new AesEncryption();

export const ChatMessages: Component = () => {
  const user = useAuthUser();
  const {
    getJwk,
    chat: { id: chatId },
  } = useChatContext();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      const jwk = getJwk();

      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);

      const message = formData.get("message")?.toString() ?? "";

      const encryptedMessage = await aes.encrypt(message, jwk);

      await supabase.from("ChatMessages").insert({
        message: encryptedMessage,
        sender_id: user.id,
        chat_id: chatId,
      });

      form.reset();
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
        <button type="reset">Reset</button>
      </form>
      <MessageList />
    </>
  );
};
