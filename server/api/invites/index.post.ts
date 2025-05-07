import { InviteCreateRequest } from "~/types/invite.types";

export default defineEventHandler(
  async (event): Promise<{ success: boolean }> => {
    const supabase = event.context.supabase;
    const body = await readBody<InviteCreateRequest>(event);
    const { householdId, recipientEmail } = body;

    return { success: true };
  },
);
