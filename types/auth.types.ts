import { z } from "zod";

import { NameSchema } from "./api/auth.types";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: NameSchema,
  email: z.string().email().optional(),
});
export type User = z.infer<typeof UserSchema>;
