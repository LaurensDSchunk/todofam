import { readParam } from "~/server/utils/readParam";
import { type InviteDeleteRouteInterface } from "~/types/api/invites.types";

export default defineEventHandler(
  async (event): Promise<InviteDeleteRouteInterface["response"]> => {
    const supabase = event.context.supabase;
    const inviteId = readParam(event, "inviteId");

    const { error } = await supabase
      .from("invites")
      .delete()
      .eq("id", inviteId);

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return { success: true };
  },
);
