/*
 * This endpoint returns all of the data of the household, including tasks
 */

import { getHousehold } from "~/server/utils/households/getHousehold";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.householdId;
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing household ID" });
  }
  return await getHousehold(event, id);
});
