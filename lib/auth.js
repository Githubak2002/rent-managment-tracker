import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;

// === used as middleware function ===
export async function validateToken(req) {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return { error: "Unauthorized: No token provided", status: 401 };
    }

    // Verify the token using JWT secret
    const decoded = jwt.verify(token, secretKey);

    // If the token is invalid or expired
    if (!decoded) {
      return { error: "Unauthorized: Invalid token", status: 401 };
    }

    // Return the decoded token (which usually contains user data)
    return { decoded, error: null };
  } catch (error) {
    return { error: `Unauthorized: ${error.message}`, status: 401 };
  }
}

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.log("Error validatin Token", err);
    return null;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded = verifyToken(token);
  if (!decoded) return false;

  return true;
};

export function getTokenData() {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
  } catch (error) {
    return null;
  }
}

export function verifyAuth() {
  const token = cookies().get("token")?.value;
  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    return true;
  } catch (error) {
    return false;
  }
}
