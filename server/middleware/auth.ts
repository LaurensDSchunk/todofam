import { getUser } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const path = event.path;

  const unauthPaths = ["/auth/signin", "/auth/signup"];

  if (path == "/about") {
    const user = await getUser(event);
    if (!user) {
      return sendRedirect(event, "/");
    }
  }
});
