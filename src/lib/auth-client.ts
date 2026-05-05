import { createAuthClient } from "better-auth/react";

function getAuthBaseURL() {
  if (typeof window === "undefined") {
    return process.env.NODE_ENV === "production"
      ? ""
      : process.env.LOCAL_BACKEND_API || "http://localhost:5000";
  }

  const isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocalHost) {
    return process.env.NEXT_PUBLIC_LOCAL_BACKEND_API || "http://localhost:5000";
  }

  return window.location.origin;
}

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
});
