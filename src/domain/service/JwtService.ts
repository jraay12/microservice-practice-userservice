export interface JWTService {
  signAccessToken(
    payload: { id: string; role: string },
    expiresIn: string | number,
  ): Promise<string>;
  signRefreshToken(
    payload: { id: string; role: string },
    expiresIn: string | number,
  ): Promise<string>;
  verifyAccessToken<T = unknown>(token: string): Promise<T>;
  verifyRefreshToken<T = unknown>(token: string): Promise<T>;
  
  generateTokens(
    payload: any,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
