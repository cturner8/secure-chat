"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props) {
  useAuthUser();
  return (
    <main>
      <div className="flex flex-row justify-between">
        <h1 className="mb-4">My Chats</h1>
        <Link href="/chats/new">New Chat</Link>
      </div>
      <div>{children}</div>
    </main>
  );
}
