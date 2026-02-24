import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,

  handler: (req: Request, res: Response, next: NextFunction, options) => {
    res
      .status(429)
      .send({ message: "Too many attempts, please try again later" });
  },
});
