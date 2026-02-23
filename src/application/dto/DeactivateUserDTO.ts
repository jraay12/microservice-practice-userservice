import { z } from "zod";

export const DeactivateUserSchema = z
  .object({
    id: z.string(),
  })
  .strict();

export type DeactivateUserDTO = z.infer<typeof DeactivateUserSchema>;
