import { Routes } from "@/types/routes.type";

export const tutorRoutes: Routes[] = [
  {
    title: "Tutor Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
      {
        title: "Create Profile",
        url: "/dashboard/create-profile",
      },
      {
        title: "Create Availability",
        url: "/dashboard/set-availability",
      },
      {
        title: "Teaching Session",
        url: "/dashboard/teaching-session",
      },
      {
        title: "My Reviews",
        url: "/dashboard/my-reviews",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];
