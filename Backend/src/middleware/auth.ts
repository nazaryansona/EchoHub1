import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // session-based: we store userId in req.session.userId
  // @ts-ignore
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: "Unauthorized" });
};
