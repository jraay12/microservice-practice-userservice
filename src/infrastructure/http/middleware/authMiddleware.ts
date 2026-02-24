import { Request, Response, NextFunction } from "express";
import { JWTService } from "../../../domain/service/JwtService";
import { UnAuthorizeError } from "../../../shared/error/AppError";

export function authMiddleware(jwtService: JWTService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnAuthorizeError("No token provided");

    const [, token] = authHeader.split(" ");

    if (!token) throw new UnAuthorizeError("Token missing");

    try {
      const payload = await jwtService.verifyAccessToken(token);
      (req as any).user = payload;
      next();
    } catch {
      throw new UnAuthorizeError("Invalid or expired token");
    }
  };
}
