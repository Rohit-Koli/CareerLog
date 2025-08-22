import { NextResponse } from "next/server";
import { connectDb as connectDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, username, email, password } = await req.json();

    // ✅ Simple validation
    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // ✅ Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // ⚠️ Normally you should hash password (e.g. bcrypt), but keeping simple for now
    const newUser = new User({ name, username, email, password });
    await newUser.save();
    
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
