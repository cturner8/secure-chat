"use client";

import Send from "@/assets/send.svg";
import Undo from "@/assets/undo.svg";
import { PageHeader } from "@/components/page-header";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useDecrypt } from "@/hooks/useDecrypt";
import { supabase } from "@/lib/supabase/client";
import { useChatContext } from "@/providers/chat-provider";
import { AesEncryption } from "@/utils/encryption";
import Image from "next/image";
import type { FormEventHandler } from "react";
import { MessageList } from "./message-list";

interface Props {}
type Component = (props: Props) => JSX.Element;

const aes = new AesEncryption();

export const ChatMessages: Component = () => {
  const user = useAuthUser();
  const {
    jwk,
    getJwk,
    chat: { id: chatId, name },
  } = useChatContext();
  const decryptedChatName = useDecrypt(jwk, name);

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

  if (decryptedChatName === null) return <></>;
  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <PageHeader text={decryptedChatName} />
        <div className="h-max grow p-4">
          <MessageList />
        </div>
        <div className="h-24 bg-white p-4 flex content-center">
          <form
            className="flex flex-row justify-between rounded-md focus:outline-none bg-gray-100 border-gray-300 w-full p-2"
            onSubmit={onSubmit}
          >
            <input
              name="message"
              type="text"
              placeholder="Type a message..."
              className="bg-transparent border-none focus:outline-none w-max grow"
            />
            <div className="w-20 flex flex-row justify-end px-2 gap-2 border-l-2 border-black-200">
              <button type="reset">
                <Image src={Undo} alt="undo" />
              </button>
              <button type="submit">
                <Image src={Send} alt="send message" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
