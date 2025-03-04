import { createAuthClient } from "better-auth/react";
import { getBaseUrl } from "@/utils/getBaseUrl";

export const authClient = createAuthClient({
  baseURL: `${getBaseUrl()}/api/auth`,
});

export const { signIn, signUp, useSession, signOut } = createAuthClient();
