import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default function middleware(req) {
  const token = cookies().get("token")?.value;
  const protectedRoutes = ["/dashboard", "/profile"];

  if (protectedRoutes.includes(new URL(req.url).pathname)) {
    if (!token) return NextResponse.redirect(new URL("/users/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile"],
};
