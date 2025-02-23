import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

// Common function to validate JWT token
const checkAuth = async () => {
  const router = useRouter();
  const token = localStorage.getItem("token");  // Get the token from localStorage

  // If token is missing
  if (!token) {
    router.push("/login");
    return { authorized: false, message: "Authorization token missing" };
  }

  try {
    // Verify the token using JWT (The JWT_SECRET should be in your environment variables)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is valid, return true
    if (decoded) {
      return { authorized: true };
    }
  } catch (error) {
    // If the token is invalid or expired, clear it from localStorage and redirect to login page
    localStorage.removeItem("token");
    router.push("/login");
    return { authorized: false, message: "Invalid or expired token" };
  }

  return { authorized: false, message: "Unknown error" };
};

export default checkAuth;
