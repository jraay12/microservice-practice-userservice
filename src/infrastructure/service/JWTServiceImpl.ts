import { JWTService } from "../../domain/service/JwtService";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../shared/error/AppError";

interface JWTPayload {
  id: string;
  role: string;
}

export class JWTServiceImpl implements JWTService {
  constructor(private readonly secret: string) {}
  async sign(
    payload: { id: string; role: string },
    expiresIn: string | number,
  ): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
    });
  }
  async verify<T = unknown>(token: string): Promise<T> {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (error) {
      throw new BadRequestError("Invalid or expired token!");
    }
  }

  async generateTokens(
    payload: JWTPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.sign(payload, "15m");
    const refreshToken = await this.sign(payload, "7d");

    return { accessToken, refreshToken };
  }
}
