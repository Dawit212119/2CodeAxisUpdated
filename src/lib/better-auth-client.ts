import { createAuthClient } from "better-auth/react";

// Get base URL for better-auth client
// On client side, use window.location.origin
// On server side (shouldn't happen), fallback to environment variable or empty string
function getBaseURL(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
         process.env.NEXT_PUBLIC_BASE_URL || 
         '';
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { useSession, signIn, signOut, signUp } = authClient;
