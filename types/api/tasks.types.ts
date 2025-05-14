import { z } from "zod";
import { type ApiSuccessResponse, type RouteInterface } from "./api.types";
import {
  TaskDescriptionSchema,
  TaskTitleSchema,
  type Task,
} from "../task.types";

export const TaskCreateRequestSchema = z.object({
  title: TaskTitleSchema,
  description: TaskDescriptionSchema.optional(),
  householdId: z.string().uuid(),
});
export type TaskCreateRouteInterface = RouteInterface<
  z.infer<typeof TaskCreateRequestSchema>,
  ApiSuccessResponse<{ id: string }>
>;

export const TaskUpdateRequestSchema = z.object({
  title: TaskTitleSchema.optional(),
  description: TaskDescriptionSchema.optional(),
  isCompleted: z.boolean().optional(),
});
export type TaskUpdateRouteInterface = RouteInterface<
  z.infer<typeof TaskUpdateRequestSchema>,
  ApiSuccessResponse
>;

export type TaskDeleteRouteInterface = RouteInterface<
  undefined,
  ApiSuccessResponse
>;

export type TaskListRouteInterface = RouteInterface<
  undefined,
  { tasks: Task[] }
>;

export type TaskOrderRouteInterface = RouteInterface<
  { targetIndex: number },
  ApiSuccessResponse
>;
