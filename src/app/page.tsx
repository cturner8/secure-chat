"use client";

import { useAuthContext } from "@/providers/auth-provider";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <main>
      <p>Hello, {user?.email}</p>
    </main>
  );
}
