import type { Routes } from "~/types/api/routes.types";
type Route = Routes["/auth/sign-out"];

export default defineEventHandler(async (event): Promise<Route["response"]> => {
  const supabase = event.context.supabase;

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  return { success: true };
});
