"use client";
import Landing from "@/components/Landing";
import { Footer, Header } from "./layout";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const { data: session } = authClient.useSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <main>
      <Landing />
      <Footer />
    </main>
  );
}
