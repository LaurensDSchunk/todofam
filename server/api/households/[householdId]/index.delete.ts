export default defineEventHandler(async (event) => {
  const id = event.context.params?.householdId;
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing household ID" });
  }

  const supabase = event.context.supabase;

  const { error } = await supabase.from("households").delete().eq("id", id);

  if (error) {
    throw createError({
      statusCode: 500,
      message: "Error deleting household",
    });
  }

  return { success: true };
});
