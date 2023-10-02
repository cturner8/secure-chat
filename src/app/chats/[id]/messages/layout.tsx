"use client";

import { useAuthUser } from "@/hooks/useAuthUser";

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props) {
  useAuthUser();
  return (
    <main>
      <div className="flex flex-row justify-between">
        <h1 className="mb-4">Chat</h1>
      </div>
      <div>{children}</div>
    </main>
  );
}
