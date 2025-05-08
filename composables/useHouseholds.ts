import type { Household } from "~/types/household.types";

export function useHouseholds() {
  const households = useState<Household[]>("households", () => []);
}
