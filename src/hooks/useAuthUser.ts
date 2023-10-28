"use client";

import { useAuthContext } from "@/providers/auth-provider";
import { redirect } from "next/navigation";

export const useAuthUser = () => {
  const { user } = useAuthContext();
  if (!user) {
    redirect("/auth");
  }
  return user;
};
