"use client";

import { supabase } from "@/lib/supabase/client";
import { useAuthContext } from "@/providers/auth-provider";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const NoSSR = dynamic(() => import("@/components/no-ssr"), { ssr: false });

export default function Page() {
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    redirect("/");
  }, [user]);

  return (
    <NoSSR>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["github"]}
        />
      </main>
    </NoSSR>
  );
}
