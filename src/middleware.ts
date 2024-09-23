import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (token.role === "admin" && request.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(
      new URL("/admin/dashboard/users", request.url)
    );
  }

  if (token.role === "user" && request.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/customers", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)"],
};
