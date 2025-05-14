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

    const { data: tasks, error: tasksError } = await supabase
      .from("household_tasks")
      .select("sort_order")
      .eq("household_id", householdId);

    if (tasksError) {
      throw createError({
        statusCode: 500,
        message: tasksError.message,
      });
    }

    let highest = 0;
    if (tasks && tasks.length != 0) {
      tasks.forEach((task) => {
        if (task.sort_order > highest) {
          highest = task.sort_order;
        }
      });
    }

    highest += 100;

    const { data, error } = await supabase.from("household_tasks").insert({
      household_id: householdId,
      title: title,
      description: description,
      sort_order: highest,
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
