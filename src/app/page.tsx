"use server";

import { supabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth");
  }

  return <main>Logged in!</main>;
}
