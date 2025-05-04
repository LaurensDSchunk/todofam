import { H3Event } from "h3";

export async function getUser(event: H3Event) {
  const supabase = event.context.supabase;

  const { data: session } = await supabase.auth.getSession();

  if (session) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

  return null;
}

export async function getUserId(event: H3Event) {
  const user = await getUser(event);

  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: "No user logged in",
    });
  }

  return user.id;
}
