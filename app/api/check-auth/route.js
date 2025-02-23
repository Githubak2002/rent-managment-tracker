// app/api/check-auth/route.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(req) {
  try {
    // Get the auth-token cookie
    const token = req.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 });
    }

    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    // If the token is valid, the user is authenticated
    return NextResponse.json({ isAuthenticated: true }, { status: 200 });
  } catch (error) {
    console.error('Error in check-auth route:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 200 });
  }
}