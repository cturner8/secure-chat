"use client";

import Logout from "@/assets/logout.svg";
import Logo from "@/assets/logo.svg";
import { supabase } from "@/lib/supabase/client";
import { useAuthContext } from "@/providers/auth-provider";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}
type Component = (props: Props) => JSX.Element;

export const Navigation: Component = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) return <>{children}</>;
  return (
    <main className="flex flex-col h-full w-full">
      <div className="flex flex-row justify-between p-4 bg-neutral text-white">
        <div>
          <Link href="/" className="flex flex-row gap-3">
            <Image src={Logo} alt="logo" />
            <h1>Secure Chat</h1>
          </Link>
        </div>
        <div className="flex flex-row gap-3">
          <p>Hello, {user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>
            <Image src={Logout} alt="log out" />
          </button>
        </div>
      </div>
      <div className="h-full w-full">{children}</div>
    </main>
  );
};
