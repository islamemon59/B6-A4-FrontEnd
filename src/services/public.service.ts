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
    const res = await fetch(`${API_URL}/api/public/featured-tutor`, {
      cache: "no-store",
    });

    return await res.json();
  },

  getSingleTutor: async function (id: string) {
    const res = await fetch(`${API_URL}/api/public/tutor/${id}`, {
      cache: "no-store",
    });

    return await res.json();
  },
};
