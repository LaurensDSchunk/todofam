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
    const { household } = useHouseholds();
    // If the current household contains the task, delete it on the user's side
    const existingIndex = household.value?.tasks.findIndex(
      (d) => d.id == taskId,
    );
    let deletedTask;
    if (existingIndex) {
      deletedTask = household.value?.tasks[existingIndex];

      household.value?.tasks.splice(existingIndex, 1);
    }

    const { error } = await apiRequest<TaskDeleteRouteInterface>(
      `/tasks/${taskId}`,
      "DELETE",
    );

    if (error) {
      alert(error.message);
      if (deletedTask) {
        household.value?.tasks.push(deletedTask);
        household.value?.tasks.sort((a, b) => (a.sortOrder = b.sortOrder));
      }
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

    return data.tasks.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
  };
}
