import { parseBody } from "~/server/utils/parseBody";
import {
  SignUpRequestSchema,
  type SignUpRouteInterface,
} from "~/types/api/auth.types";

export default defineEventHandler(
  async (event): Promise<SignUpRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const { email, password, name } = await parseBody(
      event,
      SignUpRequestSchema,
    );

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
