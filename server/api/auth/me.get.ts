import type { User } from "~/types/auth.types";
import { getUser } from "~/server/utils/auth/getUser";

export default defineEventHandler(
  async (event): Promise<{ user: User | null }> => {
    const user = await getUser(event);

    if (!user) {
      return { user: null };
    }

    const supabase = event.context.supabase;

    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("id", user.id)
      .single();

    if (error) {
      throw createError({
        statusCode: 400,
        message: error.message,
      });
    }

    return { user: { id: user.id, email: user.email!, name: data.name } };
  },
);
