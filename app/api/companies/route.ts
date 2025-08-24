// app/api/companies/route.ts
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDb();
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader.split("; ").find(c => c.startsWith("token="))?.split("=")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  const company = await req.json();

  const user = await User.findById(decoded.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  user.companies.push(company);
  await user.save();

  return NextResponse.json({ message: "Company added successfully", companies: user.companies });
}

export async function GET(req: Request) {
  await connectDb();
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader.split("; ").find(c => c.startsWith("token="))?.split("=")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  const user = await User.findById(decoded.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ companies: user.companies });
}
