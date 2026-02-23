import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { UserRepositoryImpl } from "../../infrastructure/database/UserRepositoryImpl";
import { DeactivateUser } from "../../application/use-cases/DeactivateUser";
import { BcryptPasswordHasher } from "../../infrastructure/service/BcryptPasswordHasher";

// database
const userRepo = new UserRepositoryImpl();

// service
const bcryptPasswordHasher = new BcryptPasswordHasher();

// use cases
const createUserUseCase = new CreateUser(userRepo, bcryptPasswordHasher);
const deactivateUser = new DeactivateUser(userRepo);

// controller
const userController = new UserController(createUserUseCase, deactivateUser);

const router = Router();

router.post("/create", userController.create);
router.post("/deactivate/:id", userController.deactivate);

export default router;
