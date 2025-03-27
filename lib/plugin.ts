import { BetterAuthPlugin, createAuthEndpoint } from "better-auth/plugins";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "./auth";

export async function getUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}
