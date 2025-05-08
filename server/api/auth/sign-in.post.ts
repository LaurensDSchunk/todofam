import { parseBody } from "~/server/utils/parseBody";

import { SignInRequestSchema } from "~/types/api/auth.types";
import type { SignInRouteInterface } from "~/types/api/auth.types";

export default defineEventHandler(
  async (event): Promise<SignInRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const { email, password } = await parseBody(event, SignInRequestSchema);

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
