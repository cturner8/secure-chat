"use client";

import { useChatContext } from "@/providers/chat-provider";

interface Props {}
type Component = (props: Props) => JSX.Element;

export const ChatDetails: Component = () => {
  const { chat } = useChatContext();
  return (
    <>
      <h1>{chat.name}</h1>
    </>
  );
};
