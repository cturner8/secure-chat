"use client";

import { supabase } from "@/lib/supabase/client";
import { useAuthContext } from "@/providers/auth-provider";
import { theme } from "@/styles/tailwindTheme";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, minimal } from "@supabase/auth-ui-shared";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const NoSSR = dynamic(() => import("@/components/no-ssr"), { ssr: false });

const primaryColor = theme.colors?.["primary"].toString();
const fontFamily = theme.fontFamily?.["sans"].toString();

export default function Page() {
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    redirect("/");
  }, [user]);

  return (
    <NoSSR>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-1/5 bg-black-950 rounded-md text-center">
          <h1>Secure Chat</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  fonts: {
                    bodyFontFamily: fontFamily,
                    buttonFontFamily: fontFamily,
                    inputFontFamily: fontFamily,
                    labelFontFamily: fontFamily,
                  },
                  colors: {
                    ...minimal,
                    brand: primaryColor,
                    brandAccent: primaryColor,
                  },
                },
              },
            }}
            providers={["github"]}
          />
        </div>
      </main>
    </NoSSR>
  );
}
