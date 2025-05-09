import { readParam } from "~/server/utils/readParam";
import { type TaskDeleteRouteInterface } from "~/types/api/tasks.types";

export default defineEventHandler(
  async (event): Promise<TaskDeleteRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const taskId = readParam(event, "taskId");

    const { error } = await supabase
      .from("household_tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return { success: true };
  },
);
