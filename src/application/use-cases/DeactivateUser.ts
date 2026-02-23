import { UserRepository } from "../../domain/repositories/user.repositories";
import { DeactivateUserDTO } from "../dto/DeactivateUserDTO";

export class DeactivateUser {
  constructor(private useRepository: UserRepository) {}

  async execute(data: DeactivateUserDTO): Promise<void> {
    const user = await this.useRepository.findById(data.id);

    if (!user) throw new Error("User doesn't exist!");

    user.deactivate();

    await this.useRepository.update(user);
  }
}
