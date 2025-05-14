import type { Household, HouseholdSummary } from "~/types/household.types";
import { apiRequest, validatedApiRequest } from "~/utils/api/apiRequest";
import {
  type HouseholdListRouteInterface,
  type HouseholdCreateRouteInterface,
  type HouseholdGetRouteInterface,
  type HouseholdDeleteRouteInterface,
  type HouseholdGetTasksRouteInterface,
  type HouseholdUpdateRouteInterface,
  HouseholdCreateRequestSchema,
  HouseholdUpdateRequestSchema,
} from "~/types/api/household.types";
import type { Task } from "~/types/task.types";

export function useHouseholds() {
  const households = useState<HouseholdSummary[] | null>(
    "household-summaries",
    () => null,
  );

  const household = useState<Household | null>("household", () => null);

  async function getHouseholds(): Promise<HouseholdSummary[] | null> {
    const { data, error } = await apiRequest<HouseholdListRouteInterface>(
      "/households",
      "GET",
    );

    if (error) {
      alert(error.message);
      return null;
    }

    households.value = data.households;

    return data.households;
  }

  async function createHousehold(
    name: string,
  ): Promise<{ success: boolean; household?: HouseholdSummary }> {
    const { error, data } =
      await validatedApiRequest<HouseholdCreateRouteInterface>(
        "/households",
        "POST",
        HouseholdCreateRequestSchema,
        { name },
      );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true, household: data.data?.household };
  }

  async function getHousehold(id: string): Promise<Household | null> {
    const { error, data } = await apiRequest<HouseholdGetRouteInterface>(
      `/households/${id}`,
      "GET",
    );

    if (error) {
      alert(error.message);
      return null;
    }

    data.household.tasks.sort((a, b) => a.sortOrder - b.sortOrder);
    household.value = data.household;

    return data.household;
  }

  async function deleteHousehold(id: string): Promise<{ success: boolean }> {
    const { error } = await apiRequest<HouseholdDeleteRouteInterface>(
      `/households/${id}`,
      "DELETE",
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function updateHousehold(
    id: string,
    name: string,
  ): Promise<{ success: boolean }> {
    const { error } = await validatedApiRequest<HouseholdUpdateRouteInterface>(
      `/households/${id}`,
      "PATCH",
      HouseholdUpdateRequestSchema,
      { name },
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function getHouseholdTasks(id: string): Promise<Task[] | null> {
    const { data, error } = await apiRequest<HouseholdGetTasksRouteInterface>(
      `/households/${id}/tasks`,
      "GET",
    );

    if (error) {
      alert(error.message);
      return null;
    }

    return data.tasks.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return {
    households,
    household,
    getHouseholds,
    createHousehold,
    getHousehold,
    deleteHousehold,
    updateHousehold,
    getHouseholdTasks,
  };
}
