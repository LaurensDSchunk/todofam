import { readParam } from "~/server/utils/readParam";
import { type HouseholdDeleteRouteInterface } from "~/types/api/household.types";

export default defineEventHandler(
  async (event): Promise<HouseholdDeleteRouteInterface["response"]> => {
    const id = readParam(event, "householdId");

    const supabase = event.context.supabase;

    const { error } = await supabase.from("households").delete().eq("id", id);

    if (error) {
      throw createError({
        statusCode: 500,
        message: "Error deleting household",
      });
    }

    return { success: true };
  },
);
