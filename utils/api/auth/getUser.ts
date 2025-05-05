import type { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
  try {
    const res = await $fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
}
