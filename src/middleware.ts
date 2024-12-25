import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  const includedPaths = ["/feeds", "/create-post"];
  if (!token && includedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to continue if the token exists or the path is /login or /signup
  return NextResponse.next();
}
