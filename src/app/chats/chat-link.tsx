"use client";

import { useChatKey } from "@/hooks/useChatKey";
import { useDecrypt } from "@/hooks/useDecrypt";
import type { ChatWithKey } from "@/types/database";
import Link from "next/link";

interface Props {
  chat: ChatWithKey;
}
type Component = (props: Props) => JSX.Element;

export const ChatLink: Component = ({ chat }) => {
  const chatKey = chat.chatKey[0].key ?? "";
  const jwk = useChatKey(chatKey);
  const decryptedChatName = useDecrypt(jwk, chat.name);

  if (decryptedChatName == null) return <></>;
  return (
    <Link key={chat.id} href={`/chats/${chat.id}/messages`} className="h-24">
      {decryptedChatName}
    </Link>
  );
};
