import { UserRepository } from "../../domain/repositories/user.repositories";
import { JWTService } from "../../domain/service/JwtService";
import { BcryptPasswordHasher } from "../../infrastructure/service/BcryptPasswordHasher";
import { BadRequestError, NotFoundError } from "../../shared/error/AppError";
import { LoginUserDTO } from "../dto/LoginUserDTO";
import { LoginUserResponseDTO } from "../dto/LoginUserResponseDTO";

export class LoginUser {
  constructor(
    private userRepo: UserRepository,
    private bcryptService: BcryptPasswordHasher,
    private jwtService: JWTService,
  ) {}

  async execute(data: LoginUserDTO): Promise<LoginUserResponseDTO> {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) throw new NotFoundError("Email address doesn't exist!");

    const match = await this.bcryptService.compare(
      data.password,
      user.getPassword,
    );

    if (!match) throw new BadRequestError("Invalid credentials!");

    return await this.jwtService.generateTokens({ id: user.id, role: user.role });
  }
}
