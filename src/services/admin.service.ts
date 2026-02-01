import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const adminService = {
  getAllUser: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },
  updateStatus: async function (id: string, payload: string) {
    console.log({ status: payload });
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/update-status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
        
      },
      credentials: "include",
      body: JSON.stringify({ status: payload }),
    });

    return await res.json();
  },
};
