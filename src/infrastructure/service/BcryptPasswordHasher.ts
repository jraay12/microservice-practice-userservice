import { PasswordHasher } from "../../domain/service/PasswordHasher";
import bcrypt from "bcrypt";
export class BcryptPasswordHasher implements PasswordHasher {
  private readonly saltRounds = 10;

  async compare(plainPassword: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashPassword);
  }
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
