import { listHouseholds } from "../../utils/households/listHouseholds";

export default defineEventHandler(async (event) => {
  return listHouseholds(event);
});
