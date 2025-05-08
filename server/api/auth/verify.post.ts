import { VerifyOtpRequestSchema } from "~/types/api/auth.types";
import type { Routes } from "~/types/api/routes.types";
type Route = Routes["/auth/verify"];

export default defineEventHandler(async (event): Promise<Route["response"]> => {
  const supabase = event.context.supabase;

  const body = await readBody<Route["request"]>(event);
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
});
