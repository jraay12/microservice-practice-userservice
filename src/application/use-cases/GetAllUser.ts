import { UserRepository } from "../../domain/repositories/user.repositories";
import { UserResponseDTO } from "../dto/UserResponseDTO";

interface FindAllUsersRequest {
  skip?: number;
  take?: number;
}

export class GetAllUserUsecase {
  constructor(private userRepo: UserRepository) {}

  async execute(request: FindAllUsersRequest): Promise<UserResponseDTO[]> {
    const skip = request.skip ?? 0;
    const take = request.take ?? 10;

    const user = await this.userRepo.findAll(skip, take);

    return user.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
}
