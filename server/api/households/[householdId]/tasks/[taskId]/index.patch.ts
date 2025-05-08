import { parseBody } from "~/server/utils/parseBody";
import { readParam } from "~/server/utils/readParam";
import {
  type TaskUpdateRouteInterface,
  TaskUpdateRequestSchema,
} from "~/types/api/task.types";

export default defineEventHandler(
  async (event): Promise<TaskUpdateRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const householdId = readParam(event, "householdId");
    const taskId = readParam(event, "taskId");

    const { title, description, isCompleted } = await parseBody(
      event,
      TaskUpdateRequestSchema,
    );

    const update = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(isCompleted !== undefined && { isCompleted }),
    };

    const { data, error } = await supabase
      .from("household_tasks")
      .update(update)
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
