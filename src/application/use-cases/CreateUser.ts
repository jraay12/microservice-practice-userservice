import { CreateUserDTO } from "../dto/CreateUserDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { UserRepository } from "../../domain/repositories/user.repositories";
import { User } from "../../domain/entities/user";
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
    const user = User.create(data);
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
