"use client";

import { supabase } from "@/lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/NoSSR"), { ssr: false });

export default function Page() {
  return (
    <NoSSR>
      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral">
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
