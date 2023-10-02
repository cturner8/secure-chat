"use client";

import { ChatProvider } from "@/providers/chat-provider";
import type { Chat, ChatMessageWithSender } from "@/types/database";
import { ChatDetails } from "./details";
import { ChatMessages } from "./messages";

interface Props {
  chatKey: string;
  chat: Chat;
  messages: ChatMessageWithSender[];
}
type Component = (props: Props) => JSX.Element;

export const ChatDisplay: Component = ({ chat, messages, chatKey }) => {
  return (
    <ChatProvider chatKey={chatKey} chat={chat} messages={messages}>
      <ChatDetails />
      <ChatMessages />
    </ChatProvider>
  );
};
