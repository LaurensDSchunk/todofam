import { H3Event } from "h3";
import { getUserId } from "./auth";

export async function createHousehold(event: H3Event, name: string) {
  const supabase = event.context.supabase;

  const userId = await getUserId(event);

  // Create a new household
  const { data: household, error: createHouseholdError } = await supabase
    .from("households")
    .insert({ name: name, owner_id: userId })
    .select()
    .single();

  if (createHouseholdError) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Error creating household: " + createHouseholdError.message,
    });
  }

  // Add a join between the household and user
  const { data, error: connectionError } = await supabase
    .from("household_members")
    .insert({ household_id: household.id, user_id: userId });

  if (connectionError) {
    // Make sure no empty houses
    const { error: deletionError } = await supabase
      .from("households")
      .delete()
      .eq("id", household.id);

    throw createError({
      statusCode: 500,
      statusMessage:
        "Error linking user to household: " + connectionError.message,
    });
  }
}

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
