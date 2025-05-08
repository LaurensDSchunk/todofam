import { parseBody } from "~/server/utils/parseBody";
import {
  VerifyOtpRequestSchema,
  type VerifyRouteInterface,
} from "~/types/api/auth.types";

export default defineEventHandler(
  async (event): Promise<VerifyRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const { token, email, type } = await parseBody(
      event,
      VerifyOtpRequestSchema,
    );

    const { data, error } = await supabase.auth.verifyOtp({
      type: type,
      email: email,
      token: String(token),
    });

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      });
    }

    return { success: true };
  },
);
