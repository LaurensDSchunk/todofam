import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

declare module "h3" {
  interface H3EventContext {
    supabase: SupabaseClient<Database>;
  }
}
