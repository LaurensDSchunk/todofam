/*
 * This route provides a safe way to query other users.
 * It only returns the user name and id.
 * I'm not sure how to limit what can be queried through RLS so this is my solution to that.
 */

import { readParam } from "~/server/utils/readParam";
import { type UserGetRouteInterface } from "~/types/api/users.types";

export default defineEventHandler(
  async (event): Promise<UserGetRouteInterface["response"]> => {
    const userId = readParam(event, "userId");

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
      .maybeSingle();

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
