import type { User } from "@supabase/supabase-js";

export async function getUserName(): Promise<string | null> {
  try {
    const res = await $fetch("/api/auth/me/name", {
      method: "GET",
      credentials: "include",
    });

    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
}
