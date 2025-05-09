import type { Household, HouseholdSummary } from "~/types/household.types";
import { apiRequest, validatedApiRequest } from "~/utils/api/apiRequest";
import {
  type HouseholdListRouteInterface,
  type HouseholdCreateRouteInterface,
  HouseholdCreateRequestSchema,
} from "~/types/api/household.types";

export function useHouseholds() {
  const households = useState<Household[]>("households", () => []);

  async function getHouseholds(): Promise<{households: HouseholdSummary[] | null}> {
    const { data, error } = await apiRequest<HouseholdListRouteInterface>(
      "/households",
      "GET",
    );

    if (error) {
      alert(error.message);
      return {households: null};
    }

    return {households: data.households};
  }

  async function createHousehold(name: string): Promise<{ success: boolean }> {
    const { error } = await validatedApiRequest<HouseholdCreateRouteInterface>(
      "/households",
      "POST",
      HouseholdCreateRequestSchema,
      { name },
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function 

  return {
    getHouseholds,
    createHousehold,
  };
}
