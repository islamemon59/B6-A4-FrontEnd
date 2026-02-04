import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userService } from "./services/user.service";
import { roles } from "./Constant/roles";

export async function proxy(request: NextRequest) {
  NextResponse.next();

  let isAuthenticated = false;
  let isAdmin = false;
  let isStudent = false;
  let isTutor = false;

  const pathName = request.nextUrl.pathname;
  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === roles.admin;
    isStudent = data.user.role === roles.student;
    isTutor = data.user.role === roles.tutor;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (isStudent && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (isTutor && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
