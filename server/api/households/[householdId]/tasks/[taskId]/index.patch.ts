import type { TaskUpdateRequest } from "~/types/task.types";

export default defineEventHandler(async (event) => {
  const householdId = event.context.params?.householdId;
  const taskId = event.context.params?.taskId;

  if (!householdId || !taskId) {
    throw createError({
      statusCode: 400,
      message: "Invalid params",
    });
  }

  const body = await readBody<TaskUpdateRequest>(event);
  const { title, description, isCompleted } = body;

  const supabase = event.context.supabase;

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
});
