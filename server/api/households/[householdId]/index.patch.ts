import { ApiSuccessResponse } from "~/types/api/api.types";
import { HouseholdUpdateRequest } from "~/types/household.types";

export default defineEventHandler(
  async (event): Promise<ApiSuccessResponse> => {
    const supabase = event.context.supabase;

    const id = event.context.params?.householdId;
    if (!id) {
      throw createError({ statusCode: 400, message: "Missing household ID" });
    }

    const body = await readBody<HouseholdUpdateRequest>(event);

    const { name } = body;

    if (name) {
      const { error } = await supabase
        .from("households")
        .update({ name: name })
        .eq("id", id);

      if (error) {
        throw createError({
          statusCode: 500,
          message: error.message,
        });
      }
    }

    return { success: true };
  },
);
