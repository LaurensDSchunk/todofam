import { type SignOutRouteInterface } from "~/types/api/auth.types";

export default defineEventHandler(
  async (event): Promise<SignOutRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      });
    }

    return { success: true };
  },
);
