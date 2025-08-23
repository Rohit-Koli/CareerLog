import { NextResponse } from "next/server";

export async function POST() {
  // Remove cookie by setting it to empty with expiry in the past
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Expired immediately
  });

  return response;
}
