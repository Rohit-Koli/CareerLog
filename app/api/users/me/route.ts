import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// User profile update using the token from cookies
export async function PATCH(req: Request) {
  await connectDb();

  // Extracting token from cookies
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const updateData = await req.json();

    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(decoded.id, updateData, { new: true }).select("-password");

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ message: "Profile updated successfully", user });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
// User profile retrieval using the token from cookies
export async function GET(req: Request) {
  await connectDb();
  
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}