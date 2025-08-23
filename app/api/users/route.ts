// All The API'S for users will be here
// Handles GET (all users) & POST (create user)
import { NextResponse } from "next/server";
import { connectDb as connectDB } from "@/lib/mongodb";
export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "GET request to /api/users" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}