/*
 * This middleware prevents users from accessing pages from the wrong state
 */

import { getUser } from "../utils/auth/getUser";

export default defineEventHandler(async (event) => {
  const path = event.path;

  const unauthPaths = ["/", "/auth/sign-in", "/auth/sign-up", "/auth/verify"];

  const user = undefined;
  //const user = await getUser(event);

  if (user && unauthPaths.includes(path)) {
    //return sendRedirect(event, "/dashboard");
  }

  if (!user && !unauthPaths.includes(path)) {
    //return sendRedirect(event, "/auth/sign-in");
  }
});
