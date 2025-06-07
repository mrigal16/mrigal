import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,

  plugins: [usernameClient()],
});
export const {
  useSession,
  signIn,
  signOut,
  signUp,
  changePassword,
  deleteUser,
  forgetPassword,
  revokeSession,
  resetPassword,
  revokeOtherSessions,
  revokeSessions,
} = authClient;
