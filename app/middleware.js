import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

export default async function middleware(req) {
  const session = await getSession();
  if (!session?.userId) return NextResponse.redirect("/login");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile"],
};
