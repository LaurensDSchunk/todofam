import type { TaskOrderRouteInterface } from "~/types/api/tasks.types";

// This function inserts the item into the list, then removes the old one.
// Inserting to index 0 means front of the list. Inserting into tasks.length means the end

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

    // Check that the target index is in range
    if (targetIndex < 0 || targetIndex > tasks.length) {
      throw createError({
        statusCode: 400,
        message: "Invalid target index",
      });
    }

    // Inserting to the end
    if (targetIndex == tasks.length) {
      await supabase
        .from("household_tasks")
        .update({ sort_order: tasks[tasks.length - 1].sort_order + 100 })
        .eq("id", taskId);
      return { success: true };
    }

    let next,
      previous = 0;

    if (targetIndex != 0) {
      previous = tasks[targetIndex - 1].sort_order;
    }
    next = tasks[targetIndex].sort_order;

    let insertPos = Math.floor((previous + next) / 2);

    // Shift the next elements
    if (insertPos == next || insertPos == previous) {
      const subarray = tasks
        .slice(targetIndex)
        .map((d) => ({ id: d.id, sort_order: d.sort_order + 100 }));

      await supabase.rpc("bulk_update_tasks", {
        input_tasks: JSON.stringify(subarray),
      });

      insertPos = Math.floor((previous + next + 100) / 2);
    }

    // Update the position
    await supabase.from("household_tasks").update({ sort_order: insertPos });

    return { success: true };
  },
);
