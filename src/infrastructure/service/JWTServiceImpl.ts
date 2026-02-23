import { JWTService } from "../../domain/service/JwtService";
import jwt from "jsonwebtoken";
export class JWTServiceImpl implements JWTService {
  constructor(private readonly secret: string) {}
  async sign(payload: { id: string; role: string }): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: "15m",
    });
  }
  async verify<T = unknown>(token: string): Promise<T> {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (error) {
      throw new Error("Invalid or expired token!");
    }
  }
}
