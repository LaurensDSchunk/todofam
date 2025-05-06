import { H3Event } from "h3";
import { getUserId } from "../auth/getUserId";

export async function listHouseholds(event: H3Event) {
  const supabase = event.context.supabase;

  const userId = await getUserId(event);

  const { data: connections, error } = await supabase
    .from("household_members")
    .select()
    .eq("user_id", userId);

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Error getting connections: " + error.message,
    });
  }

  const { data: households, error: householdsError } = await supabase
    .from("households")
    .select("*")
    .in(
      "id",
      connections.map((c) => c.household_id),
    );

  if (householdsError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching households: " + householdsError.message,
    });
  }

  return households;
}
