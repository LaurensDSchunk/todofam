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
  async function getHouseholds(): Promise<{
    households: HouseholdSummary[] | null;
  }> {
    const { data, error } = await apiRequest<HouseholdListRouteInterface>(
      "/households",
      "GET",
    );

    if (error) {
      alert(error.message);
      return { households: null };
    }

    return { households: data.households };
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

  async function getHousehold(id: string): Promise<Household | null> {
    const { error, data } = await apiRequest<HouseholdGetRouteInterface>(
      `/households/${id}`,
      "GET",
    );

    if (error) {
      alert(error.message);
      return null;
    }

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

    return data.tasks;
  }

  return {
    getHouseholds,
    createHousehold,
    getHousehold,
    deleteHousehold,
    updateHousehold,
    getHouseholdTasks,
  };
}
