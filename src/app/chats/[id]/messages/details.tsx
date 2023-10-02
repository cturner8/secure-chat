"use client";

import { Chat } from "@/types/database";

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
