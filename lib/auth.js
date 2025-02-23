import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;


// === used as middleware function ===
export async function validateToken(req) {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return { error: 'Unauthorized: No token provided', status: 401 };
    }

    // Verify the token using JWT secret
    const decoded = jwt.verify(token, secretKey);

    // If the token is invalid or expired
    if (!decoded) {
      return { error: 'Unauthorized: Invalid token', status: 401 };
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
    return null;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decoded = verifyToken(token);
  if (!decoded) return false;

  return true;
};

