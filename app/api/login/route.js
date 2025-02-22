import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    // Check credentials from .env
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: "Invalid username" }, { status: 401 });
    }

    // Compare passwords
    const isMatch = bcrypt.compare(password, ADMIN_PASSWORD);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    console.log("Error in login route:", error);
    return NextResponse.json({ error: `Server error in login route: {error}` }, { status: 500 });
  }
}
