import { Response, Request, NextFunction } from "express";
import { CreateUser } from "../../application/use-cases/CreateUser";
import {
  CreateUserDTO,
  CreateUserSchema,
} from "../../application/dto/CreateUserDTO";

export class UserController {
  constructor(private createUser: CreateUser) {}

  create = async (req: Request, res: Response) => {
    try {
      const dto: CreateUserDTO = CreateUserSchema.parse(req.body);
      const result = await this.createUser.execute(dto);

      return res.status(201).json(result);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }

      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };
}
