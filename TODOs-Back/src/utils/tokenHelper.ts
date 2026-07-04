import type { Response } from "express";
import jwt from "jsonwebtoken";



const ACCESS_SECRET = process.env.ACCESS_JWT_SECRET!
const REFRESH_SECRET = process.env.REFRESH_JWT_SECRET!

const TTL = Number(process.env.ACCESS_TOKEN_TTL)
const REFRESH_TTL = Number(process.env.REFRESH_TOKEN_TTL)



export function makeAccessToken(input: any): string {
  const payload = { userID: String(input.id), role: input.role }
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: TTL })
}

export function makeRefreshToken(input: any): string {
  const payload = { userID: String(input.id) }
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL })
}


export function setAccessCookie(res: Response, token: string) {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TTL * 1000,
  })
}

export function setRefreshCookie(res: Response, token: string) {
  res.cookie("refreshCookie", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: REFRESH_TTL * 1000,
  })
}