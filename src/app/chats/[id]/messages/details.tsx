"use client";

import { useDecrypt } from "@/hooks/useDecrypt";
import { useChatContext } from "@/providers/chat-provider";

interface Props {}
type Component = (props: Props) => JSX.Element;

export const ChatDetails: Component = () => {
  const { chat, jwk } = useChatContext();
  const decryptedChatName = useDecrypt(jwk, chat.name);

  if (decryptedChatName === null) return <></>;
  return (
    <>
      <h1>{decryptedChatName}</h1>
    </>
  );
};
