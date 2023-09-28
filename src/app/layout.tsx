import { Navigation } from "@/components/navigation";
import "@/lib/logger";
import { AuthProvider } from "@/providers/auth-provider";
import clsx from "clsx";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secure Chat",
  description: "The safest way to chat",
  icons: [
    {
      type: "icon",
      url: "./favicon.ico",
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={clsx(font.className, "bg-neutral text-white")}>
        <AuthProvider>
          <Navigation>{children}</Navigation>
        </AuthProvider>
      </body>
    </html>
  );
}
