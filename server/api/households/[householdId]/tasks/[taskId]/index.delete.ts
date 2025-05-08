import { readParam } from "~/server/utils/readParam";
import { type TaskDeleteRouteInterface } from "~/types/api/task.types";

export default defineEventHandler(
  async (event): Promise<TaskDeleteRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const householdId = readParam(event, "householdId");
    const taskId = readParam(event, "taskId");

    const { error } = await supabase
      .from("household_tasks")
      .delete()
      .eq("id", taskId)
      .eq("household_id", householdId);

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return { success: true };
  },
);
