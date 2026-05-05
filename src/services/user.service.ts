import { cookies } from "next/headers";

const AUTH_URL =
  process.env.NODE_ENV === "production"
    ? process.env.AUTH_URL
    : process.env.LOCAL_AUTH_URL || "http://localhost:5000/api/auth";

function getSessionEndpoint() {
  if (!AUTH_URL) return null;

  const normalized = AUTH_URL.replace(/\/$/, "");
  return normalized.endsWith("/api/auth")
    ? `${normalized}/get-session`
    : `${normalized}/api/auth/get-session`;
}

export const userService = {
  getSession: async function () {
    try {
      const sessionEndpoint = getSessionEndpoint();

      if (!sessionEndpoint) {
        return { data: null, error: { message: "AUTH_URL is missing" } };
      }

      const cookieStore = await cookies();

      const res = await fetch(sessionEndpoint, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: `Session fetch failed: ${res.status}` },
        };
      }

      const session = await res.json();
      return { data: session ?? null, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message ?? "Unknown error" },
      };
    }
  },
};
