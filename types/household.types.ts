import type { User } from "./auth.types";
import type { Task } from "./task.types";

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

export interface HouseholdCreateRequest {
  name: string;
}
