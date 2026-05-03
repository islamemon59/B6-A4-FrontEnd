import { Routes } from "@/types/routes.type";

export const adminRoutes: Routes[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
      {
        title: "Manage Users",
        url: "/dashboard/all-users",
      },
      {
        title: "All Bookings",
        url: "/dashboard/all-bookings",
      },
      {
        title: "Create Categories",
        url: "/dashboard/create-category",
      },
      {
        title: "Manage Categories",
        url: "/dashboard/manage-categories",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];
