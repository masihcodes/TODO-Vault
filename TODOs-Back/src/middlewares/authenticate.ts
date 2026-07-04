import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';


const secret = process.env.ACCESS_JWT_SECRET!;



export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token)
    return next({ status: 401, details: "Not authenticated" })


  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    if (!decoded.userID) {
      return next({ status: 401, details: "Invalid token" })
    }

    req.user = { id: decoded.userID, role: decoded.role ?? "user" };

    next();
  }
  catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return next({ status: 401, details: "Expired access token" })

    return next({ status: 401, details: "Invalid token" })
  }
};