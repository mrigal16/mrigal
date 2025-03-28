import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://mrigal.vercel.app",

  plugins: [usernameClient()],
});
export const { useSession, signIn, signOut, signUp } = authClient;
export type Session = typeof authClient.$Infer.Session;
