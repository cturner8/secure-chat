import "@/lib/logger";
import { AuthProvder } from "@/providers/auth-provider";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secure Chat",
  description: "The safest way to chat",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-neutral text-white")}>
        <AuthProvder>{children}</AuthProvder>
      </body>
    </html>
  );
}
