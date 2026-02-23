import { z } from "zod";

export const UpdateUserParamsSchema = z.object({
  id: z.string(),
});

export const UpdateUserBodySchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().email("Invalid email"),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserBodySchema> & {
  id: string;
};
