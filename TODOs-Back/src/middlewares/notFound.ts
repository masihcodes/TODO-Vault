import type { RequestHandler } from "express";



export const notFound: RequestHandler = (req, res, next) => {
  next({ status: 404, details: "Route Not Found" })
}