import { z } from "zod";

import type { User } from "./auth.types";
import type { Task } from "./task.types";

export const HouseholdNameSchema = z
  .string()
  .trim()
  .min(3, "Household name must be at least 3 characters long")
  .max(50, "Household name must be at most 50 characters")
  .regex(/^\p{L}[\p{L}\s'-]*\p{L}?$/u, {
    message: "Name can only contain letter, spaces, apostrophes, or hyphens.",
  });

export interface Household {
  id: string;
  name: string;
  tasks: Task[];
  members: User[];
}

export interface HouseholdSummary {
  id: string;
  name: string;
}
