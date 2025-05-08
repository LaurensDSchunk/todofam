import { readParam } from "~/server/utils/readParam";
import { type InviteReplyRouteInterface } from "~/types/api/invites.types";

export default defineEventHandler(
  async (event): Promise<InviteReplyRouteInterface["response"]> => {
    const supabase = event.context.supabase;
    const inviteId = readParam(event, "inviteId");

    const userId = await getUserId(event);

    const { data: invite, error: inviteError } = await supabase
      .from("invites")
      .update({ status: "accepted" })
      .eq("id", inviteId)
      .eq("recipient_id", userId)
      .select()
      .single();

    if (inviteError) {
      throw createError({
        statusCode: 500,
        message: inviteError.message,
      });
    }

    supabaseAdmin.from("household_members").insert({
      household_id: invite.household_id,
      user_id: invite.recipient_id!,
    });

    return { success: true };
  },
);
