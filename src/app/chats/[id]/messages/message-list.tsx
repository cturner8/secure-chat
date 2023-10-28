"use client";

import { useChatMessages } from "@/hooks/useChatMessages";
import { MessageDisplay } from "./message-display";

interface Props {}
type Component = (props: Props) => JSX.Element;

export const MessageList: Component = () => {
  const messages = useChatMessages();
  return (
    <>
      <div className="flex flex-col gap-4 h-full w-full overflow-auto my-6">
        {messages.map((message) => (
          <MessageDisplay key={message.id} chatMessage={message} />
        ))}
      </div>
    </>
  );
};
