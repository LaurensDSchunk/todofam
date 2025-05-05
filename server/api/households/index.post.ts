import { createHousehold } from "../../utils/households/createHousehold";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name } = body;

  return await createHousehold(event, name);
});
