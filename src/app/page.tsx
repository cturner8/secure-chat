"use client";

import { useAuthUser } from "@/hooks/useAuthUser";

export default function Home() {
  useAuthUser();
  return <main>My Chats</main>;
}
