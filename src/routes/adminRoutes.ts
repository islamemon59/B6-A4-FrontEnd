import { Routes } from "@/types/routes.type";

export const adminRoutes: Routes[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Manage Users",
        url: "/dashboard/all-users",
      },
      {
        title: "All Bookings",
        url: "/dashboard/all-bookings",
      },
      {
        title: "Manage Categories",
        url: "/dashboard/manage-categories",
      },
    ],
  },
];
