import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { roles } from "@/Constant/roles";
import { userService } from "@/services/user.service";
import React from "react";

const DashboardLayout = async ({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) => {
  const { data } = await userService.getSession();

  const userInfo = data.user;
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === roles.admin
            ? admin
            : userInfo.role === roles.student
              ? student
              : tutor}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
