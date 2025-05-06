import { getUser } from "~/server/utils/auth/getUser";

export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;

  const userId = await getUserId(event);

  const { data, error } = await supabase
    .from("users")
    .select("name")
    .eq("id", userId)
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      message: "Error fetching user name",
    });
  }

  return data.name;
});
