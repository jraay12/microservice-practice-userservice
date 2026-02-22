import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { UserRepositoryImpl } from "../../infrastructure/database/UserRepositoryImpl";

const userRepo = new UserRepositoryImpl();
const createUserUseCase = new CreateUser(userRepo); 
const userController = new UserController(createUserUseCase); 

const router = Router();

router.post("/create", userController.create);

export default router;
