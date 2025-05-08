import { ApiSuccessResponse } from "~/types/api/api.types";
import { InviteCreateRequest } from "~/types/invite.types";

export default defineEventHandler(
  async (event): Promise<ApiSuccessResponse> => {
    const supabase = event.context.supabase;
    const body = await readBody<InviteCreateRequest>(event);
    const { householdId, recipientEmail } = body;

    // Check to see if the recepient has an account
    const { data: recepient, error: reciepientError } = await supabaseAdmin
      .from("users")
      .select()
      .eq("email", recipientEmail)
      .maybeSingle();

    if (reciepientError) {
      throw createError({
        statusCode: 500,
        message: reciepientError.message,
      });
    }

    if (recepient) {
      // Recipient already has an account, create invite
      const { data, error } = await supabase.from("invites").insert({
        recipient_email: recipientEmail,
        household_id: householdId,
        recipient_id: recepient.id,
      });

      if (error) {
        throw createError({
          statusCode: 500,
          message: error.message,
        });
      }
    } else {
      // No account, create invite and invite user to platform
      const { data, error } = await supabase.from("invites").insert({
        recipient_email: recipientEmail,
        household_id: householdId,
      });

      if (error) {
        throw createError({
          statusCode: 500,
          message: error.message,
        });
      }

      // TODO: Add email invitation
    }

    return { success: true };
  },
);
