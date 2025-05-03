export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;

  const body = await readBody(event);
  const { token, email, type } = body;

  if (!token || !email || !type) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const { data, error } = await supabase.auth.verifyOtp({
    type: type,
    email: email,
    token: String(token),
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  return data.user;
});
