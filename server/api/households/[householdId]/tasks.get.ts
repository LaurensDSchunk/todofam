import { type HouseholdGetTasksRouteInterface } from "~/types/api/household.types";

export default defineEventHandler(
  async (event): Promise<HouseholdGetTasksRouteInterface["response"]> => {
    const supabase = event.context.supabase;
    const householdId = readParam(event, "householdId");

    const { data, error } = await supabase
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
      tasks: data.map((task) => ({
        id: task.id,
        isCompleted: task.is_completed,
        description: task.description,
        title: task.title,
      })),
    };
  },
);
