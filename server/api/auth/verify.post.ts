import type { verifyRequest } from "~/types/auth.types";

import { validateEmail } from "~/utils/validation/email";

export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;

  const body = await readBody<verifyRequest>(event);
  const { token, email, type } = body;

  const allowedTypes = ["signup"];

  if (!token || !email || !type || !allowedTypes.includes(type)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    throw createError({
      statusCode: 400,
      statusMessage: emailValidation.errors![0],
    });
  }

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
