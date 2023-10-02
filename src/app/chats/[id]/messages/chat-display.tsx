"use client";

import { ChatProvider } from "@/providers/chat-provider";
import type {
  Chat,
  ChatMemberWithProfile,
  ChatMessage,
} from "@/types/database";
import { ChatMessages } from "./messages";

interface Props {
  chatKey: string;
  chat: Chat;
  messages: ChatMessage[];
  members: ChatMemberWithProfile[];
}
type Component = (props: Props) => JSX.Element;

export const ChatDisplay: Component = ({
  chat,
  messages,
  chatKey,
  members,
}) => {
  return (
    <ChatProvider
      chatKey={chatKey}
      chat={chat}
      messages={messages}
      members={members}
    >
      <ChatMessages />
    </ChatProvider>
  );
};
