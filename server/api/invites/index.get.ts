import { type InviteListRouteInterface } from "~/types/api/invites.types";
import type { Invite } from "~/types/invite.types";

export default defineEventHandler(
  async (event): Promise<InviteListRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const userId = await getUserId(event);

    const { data: invites, error: invitesError } = await supabase
      .from("invites")
      .select()
      .or(`recipient_id.eq.${userId},creator_id.eq.${userId}`);

    if (invitesError) {
      throw createError({
        statusCode: 500,
        message: invitesError.message,
      });
    }

    const rawids: string[] = [
      ...invites.map((d) => d.creator_id),
      ...invites.map((d) => d.recipient_id).filter((d) => d != null),
    ];
    // Each id will be unique
    const ids = [...new Set(rawids)];

    const { data: names, error: namesError } = await supabaseAdmin
      .from("users")
      .select("name, id")
      .in("id", ids);

    if (namesError) {
      throw createError({
        statusCode: 500,
        message: namesError.message,
      });
    }

    return {
      invites: invites.map((invite): Invite => {
        const creator = names.find((d) => d.id == invite.creator_id)!;
        const recipient = names.find((d) => d.id == invite.recipient_id);

        return {
          id: invite.id,
          householdId: invite.household_id,

          creatorId: creator.id,
          creatorName: creator.name,

          ...(recipient && { recipientId: recipient.id }),
          recipientName: recipient ? recipient.name : invite.recipient_email,

          status: invite.status,
          createdAt: invite.created_at,
        };
      }),
    };
  },
);
