import { getUser } from "@/lib/plugin";
import ActivityPageContent from "./factures/page";
import { redirect } from "next/navigation";
export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // const teamData = await getTeamForUser(user.id);
  //
  // if (!teamData) {
  //   throw new Error('Team not found');
  // }

  return <ActivityPageContent />;
}
