import { H3Event } from "h3";

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
