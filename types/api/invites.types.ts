import { z } from "zod";

import { type ApiSuccessResponse, type RouteInterface } from "./api.types";
import type { Invite } from "../invite.types";

export const InviteCreateRequestSchema = z.object({
  householdId: z.string().optional(),
  recipientEmail: z.string().email(),
});
export type InviteCreateRouteInterface = RouteInterface<
  z.infer<typeof InviteCreateRequestSchema>,
  ApiSuccessResponse
>;

export type InviteListRouteInterface = RouteInterface<
  undefined,
  { invites: Invite[] }
>;

export type InviteReplyRouteInterface = RouteInterface<
  undefined,
  ApiSuccessResponse
>;

export type InviteDeleteRouteInterface = RouteInterface<
  undefined,
  ApiSuccessResponse
>;
