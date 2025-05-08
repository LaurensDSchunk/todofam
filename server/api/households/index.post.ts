import { ApiSuccessResponse } from "~/types/api/api.types";
import { HouseholdSummary } from "~/types/household.types";

export default defineEventHandler(
  async (
    event,
  ): Promise<ApiSuccessResponse<{ household: HouseholdSummary }>> => {
    const supabase = event.context.supabase;

    const body = await readBody(event);
    const { name } = body;

    const userId = await getUserId(event);

    // Create a new household
    const { data: household, error: createHouseholdError } = await supabase
      .from("households")
      .insert({ name: name })
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

    return { success: true, data: { household: household } };
  },
);
