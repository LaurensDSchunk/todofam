import { getUser } from "../utils/auth/getUser";

export default defineEventHandler(async (event) => {
  const path = event.path;

  const unauthPaths = ["/auth/signin", "/auth/signup", "/auth/verify"];

  if (path == "/about") {
    const user = await getUser(event);
    if (!user) {
      return sendRedirect(event, "/");
    }
  }
});
