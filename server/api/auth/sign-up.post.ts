export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;

  const body = await readBody(event);
  const { email, password, name } = body;

  if (!email || !password || !name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
