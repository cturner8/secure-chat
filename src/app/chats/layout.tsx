"use client";

import { useAuthUser } from "@/hooks/useAuthUser";

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props) {
  useAuthUser();
  return (
    <main>
      <h1 className="mb-4">My Chats</h1>
      <div>{children}</div>
    </main>
  );
}
