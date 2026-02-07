import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      if (!AUTH_URL) {
        return { data: null, error: { message: "AUTH_URL is missing" } };
      }

      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
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
