import type { User } from "./user.types";
import type { Task } from "./task.types";

export interface Household {
  id: string;
  name: string;
  tasks: Task[];
  members: User[];
}
