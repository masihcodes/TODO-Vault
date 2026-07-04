import type { ErrorRequestHandler } from "express";


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  if ("status" in err && "details" in err)
    return res.status(err.status).json(err.details)

  res.status(500).json({
    success: false,
    message: String(err),
  });

}