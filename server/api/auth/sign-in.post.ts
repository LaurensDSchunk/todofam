import type { signInRequest } from "~/types/auth.types";

import { validateEmail } from "~/utils/validation/email";
import { validatePassword } from "~/utils/validation/password";

export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;

  const body = await readBody<signInRequest>(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid arguments",
    });
  }

  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  if (!emailValidation.valid) {
    throw createError({
      statusCode: 400,
      statusMessage: emailValidation.errors![0],
    });
  }

  if (!passwordValidation.valid) {
    throw createError({
      statusCode: 400,
      statusMessage: passwordValidation.errors![0],
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
