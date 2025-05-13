import { parseBody } from "~/server/utils/parseBody";
import { readParam } from "~/server/utils/readParam";
import {
  type TaskUpdateRouteInterface,
  TaskUpdateRequestSchema,
} from "~/types/api/tasks.types";

export default defineEventHandler(
  async (event): Promise<TaskUpdateRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const taskId = readParam(event, "taskId");

    const { title, description, isCompleted } = await parseBody(
      event,
      TaskUpdateRequestSchema,
    );

    const update = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(isCompleted !== undefined && { is_completed: isCompleted }),
    };

    const { data, error } = await supabase
      .from("household_tasks")
      .update(update)
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
