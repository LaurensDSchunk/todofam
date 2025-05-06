import { Task } from "~/types/task.types";

export default defineEventHandler(async (event): Promise<{ tasks: Task[] }> => {
  const householdId = event.context.params?.householdId;
  const taskId = event.context.params?.taskId;
  if (!householdId || !taskId) {
    throw createError({ statusCode: 400, message: "Missing paramater" });
  }

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
});
