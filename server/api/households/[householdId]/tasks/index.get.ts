import { readParam } from "~/server/utils/readParam";
import { type TaskListRouteInterface } from "~/types/api/task.types";

import { Task } from "~/types/task.types";

export default defineEventHandler(
  async (event): Promise<TaskListRouteInterface["response"]> => {
    const householdId = readParam(event, "householdId");
    const taskId = readParam(event, "taskId");

    const supabase = event.context.supabase;

    const { data: tasks, error } = await supabase
      .from("household_tasks")
      .select()
      .eq("household_id", householdId);

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return {
      tasks: tasks.map(
        (task): Task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          isCompleted: task.is_completed,
        }),
      ),
    };
  },
);
