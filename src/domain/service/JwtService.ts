export interface JWTService {
  sign(payload: { id: string; role: string }, expiresIn: string | number): Promise<string>;
  verify<T = unknown>(token: string): Promise<T>;
  generateTokens(
    payload: any,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
