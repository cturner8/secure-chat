"use client";

import type { Database } from "@/lib/database.types";

type Chat = Database["public"]["Tables"]["Chats"]["Row"];

interface Props {
  chat: Chat;
  chatKey: string;
}
type Component = (props: Props) => JSX.Element;

export const ChatDetails: Component = ({ chat }) => {
  return (
    <>
      <h1>{chat.name}</h1>
    </>
  );
};
