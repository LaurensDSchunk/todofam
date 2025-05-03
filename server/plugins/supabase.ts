import type { Database } from "~/types/database.types";
import { createServerClient } from "@supabase/ssr";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    // Creates the supabase client based off cookies from the request
    const supabase = createServerClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return Object.entries(parseCookies(event)).map(([name, value]) => ({
              name,
              value,
            }));
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              setCookie(event, name, value, options),
            );
          },
        },
      },
    );

    // Attach supabase to the event context
    event.context.supabase = supabase;
  });
});
