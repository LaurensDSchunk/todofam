import { parseBody } from "~/server/utils/parseBody";
import {
  InviteCreateRequestSchema,
  type InviteCreateRouteInterface,
} from "~/types/api/invites.types";

export default defineEventHandler(
  async (event): Promise<InviteCreateRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const { householdId, recipientEmail } = await parseBody(
      event,
      InviteCreateRequestSchema,
    );

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
