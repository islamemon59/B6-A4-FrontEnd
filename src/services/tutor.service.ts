import { AvailabilityFormValues } from "@/types/availability.type";
import { CreateTutorProfilePayload } from "@/types/tutorProfile.type";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const tutorServices = {
  getCategory: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/categories`, {
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
      body: JSON.stringify(payload),
    });

    return await res.json();
  },

  getTutorSessions: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/sessions`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok || data?.success === false)
      throw new Error(data?.message || "Failed to load sessions");
    return data;
  },

  completeTutorSession: async function (bookingId: string) {
    const cookieStore = await cookies();
    const res = await fetch(
      `${API_URL}/api/tutor/sessions/complete/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );
    const data = await res.json();
    if (!res.ok || data?.success === false)
      throw new Error(data?.message || "Failed to complete session");
    return data;
  },

  cancelTutorSession: async function (bookingId: string, reason?: string) {
    const cookieStore = await cookies();
    const res = await fetch(
      `${API_URL}/api/tutor/sessions/cancel/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        body: JSON.stringify({ reason }),
      },
    );
    const data = await res.json();
    if (!res.ok || data?.success === false)
      throw new Error(data?.message || "Failed to cancel session");
    return data;
  },

  getTutorReviews: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/reviews`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok || data?.success === false)
      throw new Error(data?.message || "Failed to load reviews");
    return data;
  },
};
