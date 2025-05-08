import { SignUpRequestSchema } from "~/types/api/auth.types";
import type { Routes } from "~/types/api/routes.types";
type Route = Routes["/auth/sign-up"];

export default defineEventHandler(async (event): Promise<Route["response"]> => {
  const supabase = event.context.supabase;

  const body = await readBody<Route["request"]>(event);
  const result = SignUpRequestSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid body",
    });
  }

  const { email, password, name } = result.data;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
        email: email,
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
