import { z } from "zod";
import { UserRole } from "../../domain/entities/user";

export const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;