import { getUser } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  return getUser(event);
});
