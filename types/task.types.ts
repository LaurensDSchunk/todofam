import { z } from "zod";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  sortOrder: number;
}

export const TaskTitleSchema = z.string().min(1).max(100);
export const TaskDescriptionSchema = z.string().min(0).max(500);
