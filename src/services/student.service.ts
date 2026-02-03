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
};
