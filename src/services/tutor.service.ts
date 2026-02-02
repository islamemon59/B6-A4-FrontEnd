import { AvailabilityFormValues } from "@/types/availability.type";
import { CreateTutorProfilePayload } from "@/types/tutorProfile.type";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const tutorServices = {
  getCategory: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },

  createProfile: async function (payload: CreateTutorProfilePayload) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/create-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await res.json();
  },

  getProfile: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },

  updateProfile: async function (payload: CreateTutorProfilePayload) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await res.json();
  },
  setAvailability: async function (payload: AvailabilityFormValues) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/create-slot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await res.json();
  },
};
