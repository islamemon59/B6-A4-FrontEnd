import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const publicService = {
  getAllTutor: async function (query: Record<string, any>) {
    const url = new URL(`${API_URL}/api/public/all-tutor`);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value);
        }
      });
    }

    const res = await fetch(url);
    return await res.json();
  },

  getFeaturedTutor: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/public/featured-tutor`, {
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
      credentials: "include",
    });

    return await res.json();
  },

  getSingleTutor: async function (id: string) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/public/tutor/${id}`, {
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },
};
