// app/api/companies/route.ts
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

function extractToken(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1] || null;
}

export async function POST(req: Request) {
  await connectDb();
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader.split("; ").find(c => c.startsWith("token="))?.split("=")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  const company = await req.json();

  const user = await User.findById(decoded.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Push and get the last added company
  user.companies.push(company);
  await user.save();

  const newCompany = user.companies[user.companies.length - 1];

  return NextResponse.json(newCompany, { status: 201 }); // ✅ return only the new company
}

export async function GET(req: Request) {
  try {
    await connectDb();
    const token = extractToken(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ companies: user.companies }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
