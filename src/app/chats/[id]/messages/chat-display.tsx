"use client";

import { ChatProvider } from "@/providers/chat-provider";
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
  return (
    <ChatProvider chatKey={chatKey} chat={chat} messages={messages}>
      <ChatDetails />
      <ChatMessages />
    </ChatProvider>
  );
};
