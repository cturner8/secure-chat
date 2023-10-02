"use client";

import { supabase } from "@/lib/supabase/client";
import { useAuthContext } from "@/providers/auth-provider";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}
type Component = (props: Props) => JSX.Element;

export const Navigation: Component = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) return <>{children}</>;
  return (
    <main className="flex flex-col">
      <div className="flex flex-row justify-between p-4 bg-neutral text-white">
        <div>
          <Link href="/">
            <h1>Secure Chat</h1>
          </Link>
        </div>
        <div className="flex flex-row gap-3">
          <p>Hello, {user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </main>
  );
};
