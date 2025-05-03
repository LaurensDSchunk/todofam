import type { SupabaseClient } from "@supabase/supabase-js";

declare module "h3" {
  interface H3EventContext {
    supabase: SupabaseClient;
  }
}
