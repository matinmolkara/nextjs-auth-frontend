import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// export async function middleware(req) {
// const cookieStore = await cookies(); // ← اینجا await اضافه شد
// const token = cookieStore.get("token")?.value;

//   if (!token) {
//     const loginUrl = new URL("/users/login", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: ["/dashboard", "/profile/:path*", "/admin-panel/:path*"],
};
