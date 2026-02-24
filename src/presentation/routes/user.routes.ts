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
import { GetAllUserUsecase } from "../../application/use-cases/GetAllUser";
import { CreateNewAccessToken } from "../../application/use-cases/CreateNewAccessToken";
import { authMiddleware } from "../../infrastructure/http/middleware/authMiddleware";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret || !refreshTokenSecret) {
  throw new NotFoundError(
    "ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not defined in environment variables",
  );
}

// database
const userRepo = new UserRepositoryImpl(prisma);

// service
const bcryptPasswordHasher = new BcryptPasswordHasher();
const jwtService = new JWTServiceImpl(accessTokenSecret, refreshTokenSecret);

// use cases
const createUserUseCase = new CreateUser(userRepo, bcryptPasswordHasher);
const deactivateUser = new DeactivateUser(userRepo);
const activateUser = new ActivateUser(userRepo);
const updateUserInfo = new UpdateUserInfo(userRepo);
const loginUser = new LoginUser(userRepo, bcryptPasswordHasher, jwtService);
const getAllUser = new GetAllUserUsecase(userRepo);
const createNewAccessToken = new CreateNewAccessToken(jwtService);
// controller
const userController = new UserController(
  createUserUseCase,
  deactivateUser,
  activateUser,
  updateUserInfo,
  loginUser,
  getAllUser,
  createNewAccessToken,
);

const router = Router();

// private endpoints
router.patch(
  "/deactivate/:id",
  authMiddleware(jwtService),
  userController.deactivate,
);
router.patch(
  "/activate/:id",
  authMiddleware(jwtService),
  userController.activate,
);
router.patch("/update/:id", authMiddleware(jwtService), userController.update);
router.get("/findAll", authMiddleware(jwtService), userController.findAll);

// public endpoints
router.post(
  "/create",
  authLimiter,
  userController.create,
);
router.post("/refresh", authLimiter, userController.refresh);
router.post("/login", authLimiter, userController.login);
export default router;
