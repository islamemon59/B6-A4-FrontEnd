import { Profile } from "@/types/profile.type";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const studentServices = {
  updateProfile: async function (payload: Profile) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/users/me`, {
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

  getAllTutors: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/student/all-tutor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    return await res.json();
  },

  createBooking: async function (payload: {
        tutorProfileId: string,
        availabilitySlotId: string,
        subject: string,
      }) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/student/create-booking`, {
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
