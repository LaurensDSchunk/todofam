import { getHouseholds } from "~/server/utils/households";

export default defineEventHandler(async (event) => {
  return await getHouseholds(event);
});
