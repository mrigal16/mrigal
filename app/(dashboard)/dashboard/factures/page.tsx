import { redirect } from "next/navigation";
import ActivityPage from "./ActivityPage";
import { getUser } from "@/lib/plugin";

export default async function ActivityPageContent() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  return <ActivityPage />;
}
