import type { VerifyOtpRequest } from "~/types/auth.types";
import { VerifyOtpRequestSchema } from "~/types/auth.types";

export default defineEventHandler(
  async (event): Promise<{ success: boolean }> => {
    const supabase = event.context.supabase;

    const body = await readBody<VerifyOtpRequest>(event);
    const result = VerifyOtpRequestSchema.safeParse(body);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: "Invalid body",
      });
    }

    const { token, email, type } = result.data;

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
