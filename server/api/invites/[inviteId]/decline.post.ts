import { readParam } from "~/server/utils/readParam";
import { type InviteReplyRouteInterface } from "~/types/api/invites.types";

export default defineEventHandler(
  async (event): Promise<InviteReplyRouteInterface["response"]> => {
    const inviteId = readParam(event, "inviteId");

    const supabase = event.context.supabase;

    const userId = await getUserId(event);

    const { error } = await supabase
      .from("invites")
      .update({ status: "declined" })
      .eq("id", inviteId)
      .eq("recipient_id", userId);

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return { success: true };
  },
);
