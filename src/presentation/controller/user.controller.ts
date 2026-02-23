import { Response, Request, NextFunction } from "express";
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

export class UserController {
  constructor(
    private createUser: CreateUser,
    private deactivateUser: DeactivateUser,
    private activiateUser: ActivateUser,
    private updateInfo: UpdateUserInfo,
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const dto: CreateUserDTO = CreateUserSchema.parse(req.body);
      const result = await this.createUser.execute(dto);

      return res.status(201).json(result);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten() });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  deactivate = async (req: Request, res: Response) => {
    try {
      const dto: DeactivateUserDTO = DeactivateUserSchema.parse(req.params);
      await this.deactivateUser.execute(dto);
      return res.status(200).json({ message: "successfully deactivated" });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten() });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  activate = async (req: Request, res: Response) => {
    try {
      const dto = DeactivateUserSchema.parse(req.params);
      await this.activiateUser.execute(dto);
      return res.status(200).json({ message: "successfully activated" });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten() });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const dtoParams = UpdateUserParamsSchema.parse(req.params);
      const dtoBody = UpdateUserBodySchema.parse(req.body);
      const dto: UpdateUserDTO = { id: dtoParams.id, ...dtoBody };
      const result = await this.updateInfo.execute(dto);
      return res.status(200).json({
        message: "Successfully updated",
        data: result,
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten() });
      }

      return res.status(500).json({ error: error.message });
    }
  };
}
