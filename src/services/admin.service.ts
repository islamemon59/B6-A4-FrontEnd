import { FormValues } from "@/types/category.type";
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
  getAllBookings: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },

  getAllCategory: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },

  getSingleCategory: async function (id: string) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },

  // getSingleTutor: async function (id: string) {
  //   const cookieStore = await cookies();
  //   const res = await fetch(`${API_URL}/api/admin/tutor/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie: cookieStore.toString(),
  //     },
  //     cache: "no-store",
  //   });

  //   return await res.json();
  // },

  updateStatus: async function (id: string, payload: string) {
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

  createCategory: async function (payload: FormValues) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  },

  updateCategory: async function (id: string, payload: FormValues) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  },

  deleteCategory: async function (id: string) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    return await res.json();
  },
};
