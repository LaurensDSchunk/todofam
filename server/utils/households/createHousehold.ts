import { H3Event } from "h3";
import { getUserId } from "../auth/getUserId";

export async function createHousehold(event: H3Event, name: string) {
  const supabase = event.context.supabase;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user);

  const userId = await getUserId(event);

  // Create a new household
  const { data: household, error: createHouseholdError } = await supabase
    .from("households")
    .insert({ name: name })
    .select()
    .single();

  if (createHouseholdError) {
    console.log(createHouseholdError);
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

  return household;
}
