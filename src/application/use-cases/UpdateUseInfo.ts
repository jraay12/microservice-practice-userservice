import { UpdateUserDTO } from "./../dto/UpdateUserInfoDTO";
import { UserRepository } from "../../domain/repositories/user.repositories";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { NotFoundError } from "../../shared/error/AppError";
export class UpdateUserInfo {
  constructor(private userRepo: UserRepository) {}

  async execute(data: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userRepo.findById(data.id);

    if (!user) throw new NotFoundError("User doesn't exist");

    user.changeEmail(data.email);
    user.changeName(data.name);

    await this.userRepo.update(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
