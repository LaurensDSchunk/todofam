import { SupabaseClient } from "@supabase/supabase-js";
import { H3Event } from "h3";

export async function createHousehold(event: H3Event, name: string) {
  const supabase = event.context.supabase;

  const user = await getUser(event);

  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: "No user logged in",
    });
  }

  const userId: string = user.id;

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
  const { data: connection, error } = await supabase
    .from("household_members")
    .insert({ household_id: household.id, user_id: userId });

  // TODO: Finish this
}
