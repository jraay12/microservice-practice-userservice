import { UserRepository } from "../../../../src/domain/repositories/user.repositories";
import { CreateUser } from "../../../../src/application/use-cases/CreateUser";
import { UserRole, User } from "../../../../src/domain/entities/user";
import { PasswordHasher } from "../../../../src/domain/service/PasswordHasher";
describe("CraeteUseCase", () => {
  let userRepo: jest.Mocked<UserRepository>;
  let passwordHasher: jest.Mocked<PasswordHasher>;
  let createUser: CreateUser;

  const baseUserData = {
    name: "Test123",
    email: "test@mail.com",
    password: "hashed",
    role: UserRole.USER,
  };

  beforeEach(() => {
    userRepo = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    passwordHasher = {
      compare: jest.fn(),
      hashPassword: jest.fn(),
    };

    createUser = new CreateUser(userRepo, passwordHasher);
  });

  it("should craete new user", async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    passwordHasher.hashPassword.mockResolvedValue("password-hash");

    await createUser.execute(baseUserData);

    expect(userRepo.save).toHaveBeenCalled();
    expect(passwordHasher.hashPassword).toHaveBeenCalledWith("hashed");
  });

  it("should throw error if email already exists", async () => {
    const userData = User.create(baseUserData);
    userRepo.findByEmail.mockResolvedValue(userData);

    await expect(
      createUser.execute({
        email: "test@gmail.com",
        name: "123123",
        password: "asdasd123",
        role: UserRole.USER,
      }),
    ).rejects.toThrow("Email already exists");
  });

  it("should throw error if name is less than 2", async () => {
    await expect(
      createUser.execute({ ...baseUserData, name: "1" }),
    ).rejects.toThrow("Name must be at least 2 characters");
  });

  it("should throw error if password is less than 6", async () => {
    await expect(
      createUser.execute({
        ...baseUserData,
      password: "123"
      }),
    ).rejects.toThrow("Password must be at least 6 characters");
  });
});
