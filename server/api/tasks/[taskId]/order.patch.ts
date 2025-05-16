import type { TaskOrderRouteInterface } from "~/types/api/tasks.types";

// This function inserts the item into the list, then removes the old one.
// Inserting to index 0 means front of the list. Inserting into tasks.length - 1 means the end

export default defineEventHandler(
  async (event): Promise<TaskOrderRouteInterface["response"]> => {
    const supabase = event.context.supabase;
    const taskId = readParam(event, "taskId");
    const { targetIndex } =
      await readBody<TaskOrderRouteInterface["request"]>(event);

    // Get the task & it's accociated household
    const { data: task, error: taskError } = await supabase
      .from("household_tasks")
      .select()
      .eq("id", taskId)
      .maybeSingle();

    if (!task) {
      throw createError({
        statusCode: 400,
        message: "Task does not exist",
      });
    }

    const { data: rawTasks, error: tasksError } = await supabase
      .from("household_tasks")
      .select("id, sort_order")
      .eq("household_id", task.household_id);

    if (tasksError) {
      throw createError({
        statusCode: 500,
        message: tasksError.message,
      });
    }

    // Sort the tasks and remove the task to move from it.
    const tasks = rawTasks.sort((a, b) => a.sort_order - b.sort_order);
    const currentIndex = tasks.findIndex((d) => d.id == taskId);

    if (currentIndex == -1) {
      throw createError({
        statusCode: 400,
        message: "Task does not exist on household",
      });
    }

    if (currentIndex == targetIndex) {
      return { success: true };
    }

    // Check that the target index is in range
    if (targetIndex < 0 || targetIndex > tasks.length) {
      throw createError({
        statusCode: 400,
        message: "Invalid target index",
      });
    }

    /* Yes, I know that this is inneficient, but if it works, it works */
    const newTasks = [...tasks];
    const [item] = newTasks.splice(currentIndex, 1);
    newTasks.splice(targetIndex, 0, item);

    const updatedTasks = newTasks.filter((d, i) => {
      return tasks.findIndex((p) => p.id == d.id) != i;
    });

    const update = updatedTasks.map((task, i) => ({
      id: task.id,
      sort_order: newTasks.findIndex((p) => p.id == task.id),
    }));

    const { error } = await supabase.rpc("bulk_update_tasks", {
      input_tasks: update,
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
