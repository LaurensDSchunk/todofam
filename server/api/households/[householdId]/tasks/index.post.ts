import { ApiSuccessResponse } from "~/types/api/api.types";
import { TaskCreateRequest } from "~/types/task.types";

export default defineEventHandler(
  async (event): Promise<ApiSuccessResponse> => {
    const householdId = event.context.params?.householdId;
    if (!householdId) {
      throw createError({ statusCode: 400, message: "Missing household ID" });
    }

    const body = await readBody<TaskCreateRequest>(event);
    const { title, description } = body;

    if (!title) {
      throw createError({
        statusCode: 400,
        message: "No title included in body",
      });
    }

    const supabase = event.context.supabase;

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
