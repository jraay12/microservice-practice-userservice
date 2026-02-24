import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { UserRepositoryImpl } from "../../infrastructure/database/UserRepositoryImpl";
import { DeactivateUser } from "../../application/use-cases/DeactivateUser";
import { BcryptPasswordHasher } from "../../infrastructure/service/BcryptPasswordHasher";
import { ActivateUser } from "../../application/use-cases/ActivateUser";
import { UpdateUserInfo } from "../../application/use-cases/UpdateUseInfo";
import { JWTServiceImpl } from "../../infrastructure/service/JWTServiceImpl";
import { LoginUser } from "../../application/use-cases/LoginUser";
import { NotFoundError } from "../../shared/error/AppError";
import { authLimiter } from "../../infrastructure/http/middleware/rateLimiter";
import { prisma } from "../../config/prisma";
const secret = process.env.ACCESS_TOKEN_SECRET;

if (!secret) {
  throw new NotFoundError(
    "ACCESS_TOKEN_SECRET is not defined in environment variables",
  );
}

// database
const userRepo = new UserRepositoryImpl(prisma);

// service
const bcryptPasswordHasher = new BcryptPasswordHasher();
const jwtService = new JWTServiceImpl(secret);

// use cases
const createUserUseCase = new CreateUser(userRepo, bcryptPasswordHasher);
const deactivateUser = new DeactivateUser(userRepo);
const activateUser = new ActivateUser(userRepo);
const updateUserInfo = new UpdateUserInfo(userRepo);
const loginUser = new LoginUser(userRepo, bcryptPasswordHasher, jwtService);
// controller
const userController = new UserController(
  createUserUseCase,
  deactivateUser,
  activateUser,
  updateUserInfo,
  loginUser,
);

const router = Router();

router.post("/create", authLimiter, userController.create);
router.patch("/deactivate/:id", userController.deactivate);
router.patch("/activate/:id", userController.activate);
router.patch("/update/:id", userController.update);
router.post("/login", authLimiter, userController.login);
export default router;
