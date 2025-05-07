/*
 * This route provides a safe way to query other users.
 * It only returns the user name and id.
 * I'm not sure how to limit what can be queried through RLS so this is my solution to that.
 */

import type { User } from "~/types/auth.types";

export default defineEventHandler(
  async (event): Promise<{ user: User | null }> => {
    const userId = event.context.params?.userId;

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "No user id specified",
      });
    }

    const currentUser = getUser(event);
    if (!currentUser) {
      throw createError({
        statusCode: 403,
        message: "No user is signed in",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("users")
      .select("name, id")
      .eq("id", userId)
      .single();

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    if (!data) {
      return { user: null };
    }

    return { user: { name: data.name, id: data.id } };
  },
);
