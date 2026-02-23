import { UserRepository } from "../../domain/repositories/user.repositories";
import { NotFoundError } from "../../shared/error/AppError";
import { DeactivateUserDTO } from "../dto/DeactivateUserDTO";
export class ActivateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(data: DeactivateUserDTO): Promise<void> {
    const user = await this.userRepo.findById(data.id);

    if (!user) throw new NotFoundError("User doesn't exist!");

    user.activate();

    await this.userRepo.update(user);
  }
}
