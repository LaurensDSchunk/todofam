import type { Invite } from "~/types/invite.types";

export default defineEventHandler(
  async (event): Promise<{ invites: Invite[] }> => {
    const supabase = event.context.supabase;

    const userId = await getUserId(event);

    const { data: invites, error } = await supabase
      .from("invites")
      .select()
      .or(`recipient_id.eq.${userId},creator_id.eq.${userId}`);

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    const reqs = [
      // Get the names of the creators
      supabaseAdmin
        .from("users")
        .select("name")
        .in(
          "id",
          invites.map((d) => d.creator_id),
        ),
    ];

    const recipientIds = invites
      .filter((invite) => invite.recipient_id)
      .map((invite) => invite.recipient_id);

    // TODO: FIX / FINISH THIS FUNCTION
  },
);
