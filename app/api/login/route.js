import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db'; // Adjust the import based on your project structure

export async function POST(req) {
  try {
    await connectDB(); // Ensure database connection

    // Parse request body
    const { username, password } = await req.json();

    // Retrieve admin credentials from .env
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // Validate username
    if (username !== ADMIN_USERNAME) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Validate password using bcrypt
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,  // Cookie is accessible only via HTTP requests, not JavaScript
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      maxAge: 60 * 60 * 24,  // Cookie expires in 24 hours
      path: '/',  // Cookie is available to the entire domain
      sameSite: 'strict', // Prevent CSRF attacks
    });

    return response;
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { error: "Server error in login route" },
      { status: 500 }
    );
  }
}

// import { connectDB } from "@/lib/db";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export async function POST(req) {
//   try {
//     await connectDB(); // Ensure database connection

//     // Parse request body
//     const { username, password } = await req.json();

//     // Retrieve admin credentials from .env
//     const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
//     const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//     // Validate username
//     if (username !== ADMIN_USERNAME) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     // Validate password using bcrypt
//     const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD);

//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     // Generate JWT token
//     const token = jwt.sign({ username }, process.env.JWT_SECRET, {
//       expiresIn: "24h", // Token expires in 24 hours
//     });

//     // Set the token as an HTTP-only cookie
//     const response = NextResponse.json(
//       { success: true, message: "Login successful" },
//       { status: 200 }
//     );

//     const allCookies = await cookies();

//     // Set a new cookie
//     allCookies.set('auth-token', token, {
//       httpOnly: true,  // Cookie is accessible only via HTTP requests, not JavaScript
//       maxAge: 60 * 60 * 24,  // Cookie expires in 24 hours
//       path: '/',  // Cookie is available to the entire domain
//     });

    
//     // response.cookies.set("auth-token", token, {
//     //   httpOnly: true, // Prevent client-side access
//     //   secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
//     //   maxAge: 24 * 60 * 60, // 24 hours in seconds
//     //   sameSite: "strict", // Prevent CSRF attacks
//     //   path: "/", // Available across the entire site
//     // });

//     return response;
//   } catch (error) {
//     console.error("Error in login route:", error);
//     return NextResponse.json(
//       { error: "Server error in login route" },
//       { status: 500 }
//     );
//   }
// }

// import { connectDB } from "@/lib/db";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";



// export async function POST(req) {
//   try {
//     await connectDB(); // Ensure database connection

//     // Parse request body
//     const { username, password } = await req.json();

//     // Retrieve admin credentials from .env
//     const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
//     const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//     // console.log(" ----- user: ", ADMIN_USERNAME);
//     // console.log(" ----- pass: ", ADMIN_PASSWORD);

//     // Validate username
//     if (username !== ADMIN_USERNAME) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     // Validate password using bcrypt
//     const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD);

//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     // Generate JWT token
//     const token = jwt.sign({ username }, process.env.JWT_SECRET, {
//       // expiresIn: "24h", // Token expires in 24 hours
//       expiresIn: "60s", // Token expires in 60 sec
//     });

//     // Return success response with token
//     return NextResponse.json(
//       { success: true, token },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in login route:", error);
//     return NextResponse.json(
//       { error: "Server error in login route" },
//       { status: 500 }
//     );
//   }
// }