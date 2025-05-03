export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
