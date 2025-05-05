import { getUser } from "~/server/utils/auth/getUser";

export default defineEventHandler(async (event) => {
  return getUser(event);
});
