import { parseBody } from "~/server/utils/parseBody";
import { readParam } from "~/server/utils/readParam";
import {
  type TaskCreateRouteInterface,
  TaskCreateRequestSchema,
} from "~/types/api/tasks.types";

export default defineEventHandler(
  async (event): Promise<TaskCreateRouteInterface["response"]> => {
    const supabase = event.context.supabase;
    const { title, description, householdId } = await parseBody(
      event,
      TaskCreateRequestSchema,
    );

    const { data, error } = await supabase.from("household_tasks").insert({
      household_id: householdId,
      title: title,
      description: description,
    });

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return { success: true };
  },
);
