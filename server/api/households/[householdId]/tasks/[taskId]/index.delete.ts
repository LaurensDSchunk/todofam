export default defineEventHandler(async (event) => {
  const householdId = event.context.params?.householdId;
  const taskId = event.context.params?.taskId;

  if (!householdId || !taskId) {
    throw createError({
      statusCode: 400,
      message: "Invalid params",
    });
  }

  const supabase = event.context.supabase;

  const { error } = await supabase
    .from("household_tasks")
    .delete()
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
