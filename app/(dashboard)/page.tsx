"use client";
import Landing from "@/components/Landing";
import { Footer, Header } from "./layout";
import { use } from "react";
import { useUser } from "@/lib/context";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { userPromise } = useUser();
  const user = use(userPromise);
  if (user) {
    redirect("/dashboard");
  }
  return (
    <main>
      <Landing />
    </main>
  );
}
