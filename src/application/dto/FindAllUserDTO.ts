import { z } from "zod";

export const FindAllUsersSchema = z.object({
  skip: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 0)), 
  take: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10)), 
});

export type FindAllUsersDTO = z.infer<typeof FindAllUsersSchema>;