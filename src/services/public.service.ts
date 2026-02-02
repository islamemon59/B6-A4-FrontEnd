import { cookies } from "next/headers";

const API_URL = process.env.API_URL;


export const publicService = {
  getFeaturedTutor: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/public/featured-tutor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },
};
