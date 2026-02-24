import { GetAllUserUsecase } from "./../../application/use-cases/GetAllUser";
import { Response, Request } from "express";
import { ZodError } from "zod";
import { CreateUser } from "../../application/use-cases/CreateUser";
import {
  CreateUserDTO,
  CreateUserSchema,
} from "../../application/dto/CreateUserDTO";
import {
  DeactivateUserDTO,
  DeactivateUserSchema,
} from "../../application/dto/DeactivateUserDTO";
import { DeactivateUser } from "../../application/use-cases/DeactivateUser";
import { ActivateUser } from "../../application/use-cases/ActivateUser";
import {
  UpdateUserDTO,
  UpdateUserBodySchema,
  UpdateUserParamsSchema,
} from "../../application/dto/UpdateUserInfoDTO";
import { UpdateUserInfo } from "../../application/use-cases/UpdateUseInfo";
import { LoginUser } from "../../application/use-cases/LoginUser";
import {
  LoginUserDTO,
  LoginUserSchema,
} from "../../application/dto/LoginUserDTO";
import { AppError } from "../../shared/error/AppError";
import { FindAllUsersSchema } from "../../application/dto/FindAllUserDTO";

export class UserController {
  constructor(
    private createUser: CreateUser,
    private deactivateUser: DeactivateUser,
    private activiateUser: ActivateUser,
    private updateInfo: UpdateUserInfo,
    private loginUser: LoginUser,
    private getAllUserUsecase: GetAllUserUsecase,
  ) {}

  private handleError(res: Response, error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.flatten() });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }

  create = async (req: Request, res: Response) => {
    try {
      const dto: CreateUserDTO = CreateUserSchema.parse(req.body);
      const result = await this.createUser.execute(dto);
      return res.status(201).json(result);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  deactivate = async (req: Request, res: Response) => {
    try {
      const dto: DeactivateUserDTO = DeactivateUserSchema.parse(req.params);
      await this.deactivateUser.execute(dto);
      return res.status(200).json({ message: "Successfully deactivated" });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  activate = async (req: Request, res: Response) => {
    try {
      const dto: DeactivateUserDTO = DeactivateUserSchema.parse(req.params);
      await this.activiateUser.execute(dto);
      return res.status(200).json({ message: "Successfully activated" });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const dtoParams = UpdateUserParamsSchema.parse(req.params);
      const dtoBody = UpdateUserBodySchema.parse(req.body);
      const dto: UpdateUserDTO = { id: dtoParams.id, ...dtoBody };
      const result = await this.updateInfo.execute(dto);
      return res
        .status(200)
        .json({ message: "Successfully updated", data: result });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const dto: LoginUserDTO = LoginUserSchema.parse(req.body);
      const token = await this.loginUser.execute(dto);
      return res.status(200).json({ message: "Successfully login", token });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const { skip, take } = FindAllUsersSchema.parse(req.query);
      const users = await this.getAllUserUsecase.execute({ skip, take });
      return res.status(200).json({ data: users });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };
}
