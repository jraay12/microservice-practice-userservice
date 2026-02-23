import { CreateUserDTO } from "../dto/CreateUserDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { UserRepository } from "../../domain/repositories/user.repositories";
import { User } from "../../domain/entities/user";
import { PasswordHasher } from "../../domain/service/PasswordHasher";
export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
  ) {}

  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
    const hashPassword = await this.passwordHasher.hashPassword(data.password);

    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) throw new Error("Email already exists");

    const user = User.create({ ...data, password: hashPassword });

    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
