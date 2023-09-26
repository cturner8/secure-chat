"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { redirect } from "next/navigation";

export default function Page() {
  useAuthUser();
  redirect("/chats");
  return <main></main>;
}
