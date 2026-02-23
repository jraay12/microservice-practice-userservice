export interface JWTService {
  sign(payload: { id: string; role: string }): Promise<string>;
  verify<T = unknown>(token: string): Promise<T>;
}
