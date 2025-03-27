import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { getUser } from "@/lib/plugin";
import { UserProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "Mrigal",
  description: "shkhsdhskjhdkjshk",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  );
}
