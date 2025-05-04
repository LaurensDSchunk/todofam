import { createHousehold } from "~/server/utils/households";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name } = body;

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid arguments",
    });
  }

  createHousehold(event, name);
});
