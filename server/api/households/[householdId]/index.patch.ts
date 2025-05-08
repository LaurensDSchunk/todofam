import {
  type HouseholdUpdateRouteInterface,
  HouseholdUpdateRequestSchema,
} from "~/types/api/household.types";

import { parseBody } from "~/server/utils/parseBody";
import { readParam } from "~/server/utils/readParam";

export default defineEventHandler(
  async (event): Promise<HouseholdUpdateRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const id = readParam(event, "householdId");

    const { name } = await parseBody(event, HouseholdUpdateRequestSchema);

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
