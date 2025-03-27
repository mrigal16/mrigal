"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { removeTeamMember } from "@/app/(login)/actions";
import { InviteTeamMember } from "./invite-team";

import { Toaster } from "@/components/ui/sonner";

export function Settings() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Factures</CardTitle>
        </CardHeader>
        <CardContent>
          <InviteTeamMember />
        </CardContent>
      </Card>
      <Toaster />
    </section>
  );
}
