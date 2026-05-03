import { TutorsResponse } from "@/types/tutor.type";

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

    const res = await fetch(url, {
      cache: "no-store",
    });
    return (await res.json()) as TutorsResponse;
  },

  getFeaturedTutor: async function () {
    const res = await fetch(`${API_URL}/api/public/featured-tutor`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    return await res.json();
  },

  getSingleTutor: async function (id: string) {
    const res = await fetch(`${API_URL}/api/public/tutor/${id}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    return await res.json();
  },

  getPublicCategories: async function () {
    const res = await fetch(`${API_URL}/api/public/categories`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    return await res.json();
  },

  getHomeMetrics: async function () {
    const res = await fetch(`${API_URL}/api/public/home-metrics`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    return await res.json();
  },
};
