import { z } from "zod";

export const DeactivateUserSchema = z.object({
  id: z.string().uuid({ message: "Invalid user ID" }),
});

export type DeactivateUserDTO = z.infer<typeof DeactivateUserSchema>;
