import { JWTService } from "../../domain/service/JwtService";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../shared/error/AppError";

interface JWTPayload {
  id: string;
  role: string;
}

export class JWTServiceImpl implements JWTService {
  constructor(
    private readonly accessTokenSecret: string,
    private readonly refreshTokenSecret: string,
  ) {}
  async signAccessToken(
    payload: { id: string; role: string },
    expiresIn: string | number,
  ): Promise<string> {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
    });
  }
  async verifyAccessToken<T = unknown>(token: string): Promise<T> {
    try {
      return jwt.verify(token, this.accessTokenSecret) as T;
    } catch (error) {
      throw new BadRequestError("Invalid or expired token!");
    }
  }

  async signRefreshToken(
    payload: { id: string; role: string },
    expiresIn: string | number,
  ): Promise<string> {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
    });
  }

  async verifyRefreshToken<T = unknown>(token: string): Promise<T> {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as T;
    } catch (error) {
      throw new BadRequestError("Invalid or expired token!");
    }
  }

  async generateTokens(
    payload: JWTPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.signAccessToken(payload, "15m");
    const refreshToken = await this.signRefreshToken(payload, "7d");

    return { accessToken, refreshToken };
  }
}
