"use client";

import { useChatKey } from "@/hooks/useChatKey";
import { useDecrypt } from "@/hooks/useDecrypt";
import type { ChatWithKey } from "@/types/database";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  chat: ChatWithKey;
}
type Component = (props: Props) => JSX.Element;

export const ChatLink: Component = ({ chat }) => {
  const { id: activeChatId } = useParams();

  const chatKey = chat.chatKey[0].key ?? "";
  const jwk = useChatKey(chatKey);
  const decryptedChatName = useDecrypt(jwk, chat.name);

  const isActiveChat = chat.id === activeChatId;

  if (decryptedChatName === null) return <></>;
  return (
    <Link
      key={chat.id}
      href={`/chats/${chat.id}/messages`}
      className={clsx(
        "h-24 p-3 rounded-md",
        isActiveChat ? "bg-primary" : "bg-white",
      )}
    >
      {decryptedChatName}
    </Link>
  );
};
