import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/plugin";
import { Suspense } from "react";
import GeneralPage from "./GeneralPage";

export default async function GeneralPageContent() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <Suspense fallback={<Loader2 />}>
      <GeneralPage />
    </Suspense>
  );
}
