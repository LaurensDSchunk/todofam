import type { SignInRequest } from "~/types/auth.types";
import { SignInRequestSchema } from "~/types/auth.types";

export default defineEventHandler(
  async (event): Promise<{ success: boolean }> => {
    const supabase = event.context.supabase;

    const body = await readBody<SignInRequest>(event);
    const result = SignInRequestSchema.safeParse(body);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: "Invalid body",
      });
    }

    const { email, password } = result.data;

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
  },
);
