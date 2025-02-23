// app/middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/login']; // Add public routes here
const PROTECTED_ROUTES = ['/rent', '/api/renters', '/api/renterdetails/:id', '/api/payment']; // Add protected routes here

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log(`--- Middleware running for path: ${pathname}`);

  const token = request.cookies.get('auth-token')?.value;

  // Redirect logged-in users away from public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    if (token) {
      try {
        // Verify the token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);

        // If the token is valid, redirect to /rent
        return NextResponse.redirect(new URL('/rent', request.url));
      } catch (error) {
        // If the token is invalid, clear the cookie and allow access to the public route
        const response = NextResponse.next();
        response.cookies.delete('auth-token');
        return response;
      }
    }

    // If no token, allow access to the public route
    return NextResponse.next();
  }

  // Check if the route is protected
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!token) {
      // If no token, redirect to /login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify the token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      // If the token is valid, allow access to the protected route
      return NextResponse.next();
    } catch (error) {
      // If the token is invalid, clear the cookie and redirect to /login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  // For all other routes, proceed as usual
  return NextResponse.next();
}

// Specify the routes the middleware should run on
export const config = {
  matcher: ['/rent', '/login', '/api/renters/:path*', '/api/renterdetails/:path*', '/api/payment', ]
};



// // app/middleware.js
// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// const PUBLIC_ROUTES = ['/login', '/register']; // Add public routes here
// const PROTECTED_ROUTES = ['/api/renters']; // Add protected routes here

// export async function middleware(request) {
//   const { pathname } = request.nextUrl;

//   console.log(`--- Middleware running for path: ${pathname}`);

//   // Check if the route is public
//   if (PUBLIC_ROUTES.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // Check if the route is protected
//   if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
//     const token = request.cookies.get('auth-token')?.value;

//     if (!token) {
//       return NextResponse.json(
//         { error: 'Unauthorized: No token provided' },
//         { status: 401 }
//       );
//     }

//     try {
//       // Verify the token using jose
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//       await jwtVerify(token, secret);

//       // If the token is valid, proceed with the request
//       return NextResponse.next();
//     } catch (error) {
//       console.error('Token verification failed:', error);
//       return NextResponse.json(
//         { error: 'Unauthorized: Invalid token' },
//         { status: 401 }
//       );
//     }
//   }

//   // For all other routes, proceed as usual
//   return NextResponse.next();
// }

// // Specify the routes the middleware should run on
// export const config = {
//   matcher: ['/api/renters/:path*', '/login', '/register'], // Add routes to match
// };