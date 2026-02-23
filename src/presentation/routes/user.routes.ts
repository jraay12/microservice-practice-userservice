import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { UserRepositoryImpl } from "../../infrastructure/database/UserRepositoryImpl";
import { DeactivateUser } from "../../application/use-cases/DeactivateUser";

const userRepo = new UserRepositoryImpl();

// use cases
const createUserUseCase = new CreateUser(userRepo);
const deactivateUser = new DeactivateUser(userRepo);

// controller
const userController = new UserController(createUserUseCase, deactivateUser);

const router = Router();

router.post("/create", userController.create);
router.post("/deactivate/:id", userController.deactivate);

export default router;
