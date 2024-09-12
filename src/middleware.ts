import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { lucia } from "./lib/lucia";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, res: NextResponse) {
  const sessionId = request.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    res.cookies.delete("google_code_verifier");
    res.cookies.delete("google_state");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (!session) {
    res.cookies.delete("google_code_verifier");
    res.cookies.delete("google_state");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const response = NextResponse.next();
  if (session.fresh) {
    // Refreshing the User Session
    const sessionCookie = lucia.createSessionCookie(session.id);
    response.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }
  return response;
}
// // See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/private/:path*"],
};
