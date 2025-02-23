// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create a response object
    const response = NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    );

    // Clear the auth-token cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Set the cookie to expire immediately
      path: '/', // Ensure the cookie is cleared for the entire domain
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Error in logout route:', error);
    return NextResponse.json(
      { error: 'Server error in logout route' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     // Clear the auth-token cookie
//     const response = NextResponse.json(
//       { success: true, message: "Logout successful" },
//       { status: 200 }
//     );

//     response.cookies.delete("auth-token");

//     return response;
//   } catch (error) {
//     console.error("Error in logout route:", error);
//     return NextResponse.json(
//       { error: "Server error in logout route" },
//       { status: 500 }
//     );
//   }
// }