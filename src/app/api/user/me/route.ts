import { lucia } from "@/lib/lucia";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.fresh) {
    // Refreshing the User Session
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  // Return actual user data
  return Response.json({
    firstName: user.firstName || "N/A",
    lastName: user.lastName || "N/A",
    email: user.email || "N/A",
    roleId: user.roleId || "N/A",
    profilePicture: user.profilePicture || "default.png",
  });
}
