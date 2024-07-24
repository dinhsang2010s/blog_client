import { authApi } from "@/api-request";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken");

  return await authApi
    .profile(sessionToken?.value ?? "")
    .then((rs) => {
      if (rs && rs.id) return NextResponse.next();
    })
    .catch((_err) => {
      return NextResponse.redirect(new URL("/login", request.url));
    });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
