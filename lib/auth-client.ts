import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { config } from "dotenv";

config({ path: ".env" }); // or .env.local

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [usernameClient()],
});
export const { useSession, signIn, signOut, signUp } = authClient;
export type Session = typeof authClient.$Infer.Session;
