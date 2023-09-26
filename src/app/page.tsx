"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { supabase } from "@/lib/supabase/client";

export default function Home() {
  const user = useAuthUser();

  return (
    <main>
      <p>Hello, {user.email}</p>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </main>
  );
}
