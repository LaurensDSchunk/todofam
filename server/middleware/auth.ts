import { getUser } from "../utils/supabase";

export default defineEventHandler(async (event) => {
  const path = event.path;

  if (path == "/about") {
    const user = await getUser(event);
    if (!user) {
      return sendRedirect(event, "/");
    }
  }
});
