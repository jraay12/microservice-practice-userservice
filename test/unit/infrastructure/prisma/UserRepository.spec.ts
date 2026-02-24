import { UserRole, User } from "./../../../../src/domain/entities/user";
import { UserRepositoryImpl } from "./../../../../src/infrastructure/database/UserRepositoryImpl";
import { prismaMock } from "../../../../singleton";

describe("UserRepositoryImpl", () => {
  let repo: UserRepositoryImpl;

  beforeEach(() => {
    repo = new UserRepositoryImpl(prismaMock);
  });
});
