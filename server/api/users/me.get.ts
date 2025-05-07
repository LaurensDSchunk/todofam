import type { User } from "~/types/auth.types";

export default defineEventHandler(
  async (event): Promise<{ user: User | null }> => {
    const supabase = event.context.supabase;

    const { data, error } = await supabase
      .from("users")
      .select("name, id, email")
      .single();

    if (error || !data) {
      return { user: null };
    }

    return { user: data };
  },
);
