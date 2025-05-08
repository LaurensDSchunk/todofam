import { z } from "zod";
import {
  HouseholdNameSchema,
  type Household,
  type HouseholdSummary,
} from "../household.types";
import type { ApiSuccessResponse, RouteInterface } from "./api.types";

export const HouseholdCreateRequestSchema = z.object({
  name: HouseholdNameSchema,
});
export type HouseholdCreateRouteInterface = RouteInterface<
  z.infer<typeof HouseholdCreateRequestSchema>,
  ApiSuccessResponse<{ household: HouseholdSummary }>
>;

export const HouseholdUpdateRequestSchema = z.object({
  name: HouseholdNameSchema,
});
export type HouseholdUpdateRouteInterface = RouteInterface<
  z.infer<typeof HouseholdUpdateRequestSchema>,
  ApiSuccessResponse
>;

// For the /households/index.get route
export type HouseholdListRouteInterface = RouteInterface<
  undefined,
  { households: HouseholdSummary[] }
>;

// For getting an individual household
export type HouseholdGetRouteInterface = RouteInterface<
  undefined,
  { household: Household }
>;

export type HouseholdDeleteRouteInterface = RouteInterface<
  undefined,
  ApiSuccessResponse
>;
