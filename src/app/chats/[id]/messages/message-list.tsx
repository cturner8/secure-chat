"use client";

import { useChatContext } from "@/providers/chat-provider";
import { MessageDisplay } from "./message-display";

interface Props {}
type Component = (props: Props) => JSX.Element;

export const MessageList: Component = () => {
  const { messages } = useChatContext();
  return (
    <>
      <div className="h-full w-full overflow-auto">
        {messages.map((message) => (
          <MessageDisplay key={message.id} chatMessage={message} />
        ))}
      </div>
    </>
  );
};
