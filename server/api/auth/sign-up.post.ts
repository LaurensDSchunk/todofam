import { validateEmail } from "~/utils/validation/email";
import { validatePassword } from "~/utils/validation/password";
import { validateName } from "~/utils/validation/name";
import { sanitizeName } from "~/utils/sanitization/name";

export default defineEventHandler(async (event) => {
  const supabase = event.context.supabase;

  const body = await readBody(event);
  const { email, password, rawName } = body;

  if (!email || !password || !rawName) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const name = sanitizeName(rawName);

  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const nameValidation = validateName(name);

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

  if (!nameValidation.valid) {
    throw createError({
      statusCode: 400,
      statusMessage: nameValidation.errors![0],
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
