import type { RequestHandler } from "express";

import { db } from "#db/db.js";
import { users } from "#db/schema.js";
import { eq } from "drizzle-orm";

import { makeAccessToken, setAccessCookie } from "#utils/tokenHelper.js";
import jwt from 'jsonwebtoken';





export const refresh: RequestHandler = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken)
    return next({ status: 401, details: "Not authenticated" })

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET!) as jwt.JwtPayload

    if (!decoded.userID) {
      return next({ status: 401, details: "Invalid token" })
    }

    const [user] = await db.select().from(users).where(eq(users.id, Number(decoded.userID))).limit(1)

    if (!user)
      next({ status: 404, details: "User not found" })

    const accessToken = makeAccessToken(user)
    setAccessCookie(res, accessToken)

    res.status(201).json({ message: 'Token Refreshed' });

  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return next({ status: 401, details: "Expired access token" })

    return next({ status: 401, details: "Invalid token" })
  }
}