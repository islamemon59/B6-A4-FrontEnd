import { Routes } from "@/types/routes.type";

export const studentRoutes: Routes[] = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "Create Bookings",
        url: "/dashboard/create-bookings",
      },
      {
        title: "My Bookings",
        url: "/dashboard/my-bookings",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];
