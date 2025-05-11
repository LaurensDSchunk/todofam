import {
  ResendOtpRequestSchema,
  type ResendOtpRouteInterface,
} from "~/types/api/auth.types";

export default defineEventHandler(
  async (event): Promise<ResendOtpRouteInterface["response"]> => {
    const supabase = event.context.supabase;
    const { email, type } = await parseBody(event, ResendOtpRequestSchema);

    const { error } = await supabase.auth.resend({
      email: email,
      type: type,
    });

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return { success: true };
  },
);
