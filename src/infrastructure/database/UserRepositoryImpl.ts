import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repositories";
import { prisma } from "../../config/prisma";
import { UserRole } from "../../domain/entities/user";

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return User.rehydrate({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role as UserRole,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return User.rehydrate({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role as UserRole,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.getPassword,
        id: user.id,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  async update(user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        updatedAt: user.updatedAt,
      },
    });
  }
}
