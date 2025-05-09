import {
  TaskCreateRequestSchema,
  TaskUpdateRequestSchema,
  type TaskCreateRouteInterface,
  type TaskDeleteRouteInterface,
  type TaskListRouteInterface,
  type TaskUpdateRouteInterface,
} from "~/types/api/tasks.types";
import type { Task } from "~/types/task.types";
import { apiRequest, validatedApiRequest } from "~/utils/api/apiRequest";

export function useTasks() {
  async function createTask(
    householdId: string,
    title: string,
    description?: string,
  ): Promise<{ success: boolean }> {
    const { error } = await validatedApiRequest<TaskCreateRouteInterface>(
      "/tasks",
      "POST",
      TaskCreateRequestSchema,
      { householdId, title, description },
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }
    return { success: true };
  }

  async function updateTask(
    taskId: string,
    data: TaskUpdateRouteInterface["request"],
  ) {
    const { error } = await validatedApiRequest<TaskUpdateRouteInterface>(
      `/tasks/${taskId}`,
      "PATCH",
      TaskUpdateRequestSchema,
      data,
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function deleteTask(taskId: string) {
    const { error } = await apiRequest<TaskDeleteRouteInterface>(
      `/tasks/${taskId}`,
      "DELETE",
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function getTasks(): Promise<Task[] | null> {
    const { data, error } = await apiRequest<TaskListRouteInterface>(
      "/tasks",
      "GET",
    );

    if (error) {
      alert(error.message);
      return null;
    }

    return data.tasks;
  }

  return {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
  };
}
