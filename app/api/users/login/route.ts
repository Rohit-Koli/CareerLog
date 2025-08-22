import { NextResponse } from "next/server"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDb as connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    // ✅ Simple validation
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // ✅ Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Password verification
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username }, // payload
      jwtSecret, 
      { expiresIn: "10h" }
    );

    // ✅ Store token in HttpOnly cookie
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,     // secure against XSS
      secure: process.env.NODE_ENV === "production", // use HTTPS in production
      sameSite: "strict", // CSRF protection
      path: "/",          // cookie valid for entire site
      maxAge: 60 * 60 * 10 // 10 hours
    });

    return response;

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
