import { H3Event } from "h3";
import { getUserId } from "../auth/getUserId";

export async function getHouseholds(event: H3Event) {
  const supabase = event.context.supabase;

  const userId = await getUserId(event);

  const { data, error } = await supabase
    .from("household_members")
    .select()
    .eq("user_id", userId);

  if (error || !data) {
    throw createError({
      statusCode: 400,
      statusMessage: "Error getting households: " + error.message,
    });
  }

  return data;
}
