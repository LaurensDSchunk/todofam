import { H3Event } from "h3";
import { Task } from "~/types/task.types";

// Gets the tasks from a household. Checks if the user is in said household
export async function getTasks(
  event: H3Event,
  householdId: string,
): Promise<Task[]> {
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

  return tasks.map(
    (task): Task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.is_completed,
    }),
  );
}
