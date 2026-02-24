import { JWTService } from "../../domain/service/JwtService";
import { BadRequestError, NotFoundError } from "../../shared/error/AppError";

interface JWTPayload {
  id: string;
  role: string;
}

export class CreateNewAccessToken {
  constructor(private jwtService: JWTService) {}

  async execute(refreshToken: string): Promise<{ newAccessToken: string }> {
    if (!refreshToken) throw new NotFoundError("Token not found");

    let payload: JWTPayload;

    try {
      payload = await this.jwtService.verifyRefreshToken(refreshToken);
    } catch (error: any) {
      throw new BadRequestError("Invalid or expired refresh token");
    }

    const newAccessToken = await this.jwtService.signAccessToken(
      { id: payload.id, role: payload.role },
      "15m",
    );

    return { newAccessToken };
  }
}
