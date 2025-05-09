import { readParam } from "~/server/utils/readParam";
import { type TaskListRouteInterface } from "~/types/api/tasks.types";

import { Task } from "~/types/task.types";

export default defineEventHandler(
  async (event): Promise<TaskListRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const userId = await getUserId(event);

    // Get the households the user belongs to
    const { data: households, error: householdsError } = await supabase
      .from("household_members")
      .select("household_id")
      .eq("user_id", userId);

    if (householdsError) {
      throw createError({
        statusCode: 500,
        message: householdsError.message,
      });
    }

    const { data: tasks, error } = await supabase
      .from("household_tasks")
      .select()
      .in(
        "household_id",
        households.map((h) => h.household_id),
      );

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
