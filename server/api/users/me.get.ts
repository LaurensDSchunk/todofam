import { type UserGetRouteInterface } from "~/types/api/users.types";

export default defineEventHandler(
  async (event): Promise<UserGetRouteInterface["response"]> => {
    const supabase = event.context.supabase;

    const { data, error } = await supabase
      .from("users")
      .select("name, id, email")
      .maybeSingle();

    if (error || !data) {
      return { user: null };
    }

    return { user: data };
  },
);
