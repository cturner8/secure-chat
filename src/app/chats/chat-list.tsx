"use client";

import type { ChatWithKey } from "@/types/database";
import { ChatLink } from "./chat-link";

interface Props {
  chats: ChatWithKey[];
}
type Component = (props: Props) => JSX.Element;

export const ChatList: Component = ({ chats }) => {
  return (
    <>
      <ul className="flex flex-col">
        {chats.map((chat) => (
          <ChatLink key={chat.id} chat={chat} />
        ))}
      </ul>
    </>
  );
};
