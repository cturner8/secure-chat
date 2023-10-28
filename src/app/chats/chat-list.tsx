"use client";

import Pencil from "@/assets/pencil-icon.svg";
import { Header } from "@/components/header";
import type { ChatWithKey } from "@/types/database";
import Image from "next/image";
import Link from "next/link";
import { ChatLink } from "./chat-link";

interface Props {
  chats: ChatWithKey[];
}
type Component = (props: Props) => JSX.Element;

export const ChatList: Component = ({ chats }) => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center content-center mb-4">
        <Header text="My Chats" />
        <Link href="/chats/new">
          <Image src={Pencil} alt="new chat pencil" className="w-9 h-9" />
        </Link>
      </div>
      <ul className="flex flex-col text-xl gap-3">
        {chats.map((chat) => (
          <ChatLink key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};
