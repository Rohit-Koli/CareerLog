// API for Update and Delete Company by ID
import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ companyId: string }> } // 👈 make params async
) {
  await connectDb();
  try {
    const { companyId } = await context.params; // 👈 await params

    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = typeof decoded === "string" ? undefined : decoded.id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { companies: { _id: companyId } } },
      { new: true }
    );

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ message: "Company deleted successfully" }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ companyId: string }> } // 👈 make params async
) {
  await connectDb();
  try {
    const { companyId } = await context.params; // 👈 await params

    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const data = await req.json();

    const userId = typeof decoded === "string" ? undefined : decoded.id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, "companies._id": companyId },
      {
        $set: {
          "companies.$.name": data.name,
          "companies.$.hrName": data.hrName,
          "companies.$.hrEmail": data.hrEmail,
          "companies.$.contactNumber": data.contactNumber,
          "companies.$.website": data.website,
          "companies.$.openedPositions": data.openedPositions,
          "companies.$.response": data.response,
          "companies.$.description": data.description,
          "companies.$.anyConnections": data.anyConnections,
          "companies.$.status": data.status,
          "companies.$.address": data.address,
          "companies.$.industry": data.industry,
        },
      },
      { new: true }
    );

    if (!user) return NextResponse.json({ error: "User or Company not found" }, { status: 404 });

    const updatedCompany = user.companies.find(
      (c: any) => c._id.toString() === companyId
    );
    if (!updatedCompany) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    return NextResponse.json(updatedCompany, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
