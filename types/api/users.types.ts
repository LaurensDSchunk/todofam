import { type User } from "../auth.types";
import type { RouteInterface } from "./api.types";

export type UserGetRouteInterface = RouteInterface<
  undefined,
  { user: User | null }
>;
