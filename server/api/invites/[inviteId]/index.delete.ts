export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;
  const inviteId = event.context.params?.inviteId;

  if (!inviteId) {
    throw createError({
      statusCode: 400,
      message: "No invite id defined",
    });
  }

  const { error } = await supabase.from("invites").delete().eq("id", inviteId);

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }

  return { success: true };
});
