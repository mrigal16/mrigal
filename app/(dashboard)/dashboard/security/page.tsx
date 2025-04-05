import React, { Suspense } from "react";

import UserPasswordForm from "./user-password-form";
import { Loader2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDeleteForm from "./user-delete-form";
import { Session } from "@/db/schema";

export default async function PasswordAndSecurityPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="mx-auto w-full max-w-screen-md px-4 py-8">
      <div className="grid gap-8">
        <div className="rounded-xl bg-accent p-6">
          <h2 className="mb-4 text-2xl font-bold">Changer le mot de passe</h2>
          <Suspense fallback={<Loader2 />}>
            <UserPasswordForm />
          </Suspense>
        </div>
        <div className="rounded-xl bg-accent p-6">
          <h2 className="mb-4 text-2xl font-bold">Supprimer le compte</h2>
          <Suspense fallback={<Loader2 />}>
            <UserDeleteForm session={session as Session} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
