import { roles } from "@/Constant/roles";
import { userService } from "@/services/user.service";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;
  let isStudent = false;
  let isTutor = false;

  const { data } = await userService.getSession();

  if (data?.user) {
    isAuthenticated = true;
    isAdmin = data.user.role === roles.admin;
    isStudent = data.user.role === roles.student;
    isTutor = data.user.role === roles.tutor;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (data.user.role === "USER") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
