"use client";

import type { ChatKey } from "@/hooks/useChatKey";
import type { ChatMessage } from "@/types/database";
import { MessageDisplay } from "./message-display";

interface Props {
  jwk: ChatKey;
  messages: ChatMessage[];
}
type Component = (props: Props) => JSX.Element;

export const MessageList: Component = ({ messages, jwk }) => {
  return (
    <>
      <div className="h-full w-full overflow-auto">
        {messages.map((message) => (
          <MessageDisplay key={message.id} chatMessage={message} jwk={jwk} />
        ))}
      </div>
    </>
  );
};
