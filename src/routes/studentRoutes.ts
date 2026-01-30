import { Routes } from "@/types/routes.type";

export const studentRoutes: Routes[] = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "My Bookings",
        url: "/dashboard/history",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];
