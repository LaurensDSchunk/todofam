import type { SignUpRequest } from "~/types/auth.types";
import { SignUpRequestSchema } from "~/types/auth.types";

export default defineEventHandler(
  async (event): Promise<{ success: boolean }> => {
    const supabase = event.context.supabase;

    const body = await readBody<SignUpRequest>(event);
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
  },
);
