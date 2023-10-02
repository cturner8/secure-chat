"use client";

import { useChatKey } from "@/hooks/useChatKey";
import type { Chat, ChatMessage } from "@/types/database";
import { ChatDetails } from "./details";
import { ChatMessages } from "./messages";

interface Props {
  chatKey: string;
  chat: Chat;
  messages: ChatMessage[];
}
type Component = (props: Props) => JSX.Element;

export const ChatDisplay: Component = ({ chat, messages, chatKey }) => {
  const jwk = useChatKey(chatKey);
  if (!jwk) return <p>Loading...</p>;

  return (
    <>
      <ChatDetails chat={chat} chatKey={chatKey} />
      <ChatMessages chatId={chat.id} jwk={jwk} messages={messages} />
    </>
  );
};
