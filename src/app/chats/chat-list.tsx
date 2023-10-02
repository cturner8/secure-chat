"use client";

import { Header } from "@/components/header";
import type { ChatWithKey } from "@/types/database";
import { ChatLink } from "./chat-link";

interface Props {
  chats: ChatWithKey[];
}
type Component = (props: Props) => JSX.Element;

export const ChatList: Component = ({ chats }) => {
  return (
    <>
      <Header text="My Chats" />
      <ul className="flex flex-col text-xl">
        {chats.map((chat) => (
          <ChatLink key={chat.id} chat={chat} />
        ))}
      </ul>
    </>
  );
};
