import { Routes } from "@/types/routes.type";

export const tutorRoutes: Routes[] = [
  {
    title: "Tutor Dashboard",
    items: [
      {
        title: "Create Availability",
        url: "/dashboard/set-availability",
      },
      {
        title: "Create Profile",
        url: "/dashboard/create-profile",
      },
            {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];
