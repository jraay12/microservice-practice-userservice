export interface PasswordHasher {
  hashPassword(password: string): Promise<string>;
  compare(plainPassword: string, hashPassword: string): Promise<boolean>;
}
