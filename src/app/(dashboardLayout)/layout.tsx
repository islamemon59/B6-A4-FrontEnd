import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/authentication/UserMenu";
import { roles } from "@/Constant/roles";
import { userService } from "@/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

const DashboardLayout = async ({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) => {
  const { data, error } = await userService.getSession();

  if (!data?.user) {
    if (!error) {
      redirect("/login");
    }

    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md rounded-[1.75rem] border border-border/70 bg-card/90 p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold">Dashboard unavailable</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We could not load your session for the dashboard right now.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {error?.message || "Please sign in again and try once more."}
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const userInfo = data.user;
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-18 shrink-0 items-center justify-between gap-4 border-b border-border/70 bg-background/85 px-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Role-based workspace
              </p>
              <p className="font-semibold">Welcome back, {userInfo.name}</p>
            </div>
          </div>
          <UserMenu />
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
