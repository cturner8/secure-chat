"use client";

import { useAuthUser } from "@/hooks/useAuthUser";

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props) {
  useAuthUser();
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
