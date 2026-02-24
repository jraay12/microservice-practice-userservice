import { ActivateUser } from "./../../../../src/application/use-cases/ActivateUser";
import { UserRepository } from "../../../../src/domain/repositories/user.repositories";
import { UserRole } from "../../../../src/domain/entities/user";
import { User } from "../../../../src/domain/entities/user";
describe("ActivateUserusecase", () => {
  let userRepo: jest.Mocked<UserRepository>;
  let activateUser: ActivateUser;

  const baseUserData = {
    id: "test-id",
    name: "Test123",
    email: "test@mail.com",
    password: "hashed",
    role: UserRole.USER,
    isActive: false,
  };

  beforeEach(() => {
    userRepo = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    activateUser = new ActivateUser(userRepo);
  });

  it("should throw error if user doesnt exist", async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(activateUser.execute({ id: baseUserData.id })).rejects.toThrow(
      "User doesn't exist!",
    );

    expect(userRepo.update).not.toHaveBeenCalled();
  });

  it("should throw error if user is already activated", async () => {
    const userData = User.create(baseUserData);
    userRepo.findById.mockResolvedValue(userData);

    await expect(activateUser.execute({ id: userData.id })).rejects.toThrow(
      "User is already active",
    );

    expect(userRepo.update).not.toHaveBeenCalled();
  });
});
