import { parseBody } from "~/server/utils/parseBody";
import {
  HouseholdCreateRequestSchema,
  HouseholdCreateRouteInterface,
} from "~/types/api/household.types";

export default defineEventHandler(
  async (event): Promise<HouseholdCreateRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const { name } = await parseBody(event, HouseholdCreateRequestSchema);

    const userId = await getUserId(event);

    // Get the user's households
    const { data: households, error: householdsError } = await supabase
      .from("households")
      .select()
      .eq("owner_id", userId);

    if (householdsError) {
      throw createError({
        statusCode: 500,
        message: householdsError.message,
      });
    }

    if (households.length > 0) {
      throw createError({
        statusCode: 403,
        message: "You can only have 1 household right now.",
      });
    }

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
