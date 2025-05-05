import { getHouseholds } from "../../utils/households/listHouseholds";

export default defineEventHandler(async (event) => {
  return getHouseholds(event);
});
