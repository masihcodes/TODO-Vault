import type { RequestHandler } from "express";


import { db } from "#db/db.js";
import { users } from "#db/schema.js";
import { eq } from "drizzle-orm";

import bcrypt from 'bcrypt';

import { makeAccessToken, makeRefreshToken, setAccessCookie, setRefreshCookie } from "#utils/tokenHelper.js";
import type { User } from "#types/index.js";








export const register: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body

  const [user] = await db.select().from(users).where(eq(users.email, email))
  if (user)
    return next({ status: 400, details: "Registration Failed" })

  const hash = await bcrypt.hash(password, 10)

  const [newUser] = await db.insert(users).values({ name, email, password: hash }).returning()

  if (!newUser)
    return next({ status: 400, details: "Registration Failed" })

  const accessToken = makeAccessToken(newUser)
  const refreshToken = makeRefreshToken(newUser)

  setAccessCookie(res, accessToken)
  setRefreshCookie(res, refreshToken)

  const { password: _pw, ...safeUser } = newUser

  res.status(201).json({ message: 'Registered successfully', user: safeUser });
}


export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (!user)
    return next({ status: 401, details: "Invalid Credentials" })

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return next({ status: 401, details: "Invalid Credentials" })

  const accessToken = makeAccessToken(user)
  const refreshToken = makeRefreshToken(user)

  setAccessCookie(res, accessToken)
  setRefreshCookie(res, refreshToken)

  const { password: _pw, ...safeUser } = user

  res.status(201).json({ message: 'Logged in successfully', user: safeUser });
}



export const me: RequestHandler = async (req, res, next) => {
  const id = Number(req.user?.id)

  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1)
  if (!user)
    next({ status: 404, details: "User not found" })

  const { password: _pw, ...safeUser } = user as User
  res.status(201).json(safeUser);
};



export const logout: RequestHandler = (req, res) => {
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({ message: 'Logged out successfully' });
};