import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { UserRepositoryImpl } from "../../infrastructure/database/UserRepositoryImpl";
import { DeactivateUser } from "../../application/use-cases/DeactivateUser";
import { BcryptPasswordHasher } from "../../infrastructure/service/BcryptPasswordHasher";
import { ActivateUser } from "../../application/use-cases/ActivateUser";
import { UpdateUserInfo } from "../../application/use-cases/UpdateUseInfo";
// database
const userRepo = new UserRepositoryImpl();

// service
const bcryptPasswordHasher = new BcryptPasswordHasher();

// use cases
const createUserUseCase = new CreateUser(userRepo, bcryptPasswordHasher);
const deactivateUser = new DeactivateUser(userRepo);
const activateUser = new ActivateUser(userRepo);
const updateUserInfo = new UpdateUserInfo(userRepo);
// controller
const userController = new UserController(
  createUserUseCase,
  deactivateUser,
  activateUser,
  updateUserInfo,
);

const router = Router();

router.post("/create", userController.create);
router.patch("/deactivate/:id", userController.deactivate);
router.patch("/activate/:id", userController.activate);
router.patch("/update/:id", userController.update);
export default router;
