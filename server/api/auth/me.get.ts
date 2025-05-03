export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;

  const { data: session } = await supabase.auth.getSession();

  if (session) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

  return null;
});
