import type { RequestHandler } from "express";
import type { ZodObject } from "zod";





export function validateBodyZod(schema: ZodObject): RequestHandler {
  return (req, res, next) => {
    const { success, data, error } = schema.safeParse(req.body)
    if (!success) {
      const details = error.issues.map(i => ({ path: i.path.join(), message: i.message }))
      return next({ status: 400, details })
    }

    req.body = data
    next()
  }
}