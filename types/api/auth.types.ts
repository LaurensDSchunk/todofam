import { z } from "zod";

import { PasswordSchema, UserNameSchema } from "../auth.types";
import type { ApiSuccessResponse, RouteInterface } from "./api.types";

export const SignInRequestSchema = z.object({
  email: z.string().email(),
  password: PasswordSchema,
});
export type SignInRouteInterface = RouteInterface<
  z.infer<typeof SignInRequestSchema>,
  ApiSuccessResponse
>;

export const SignUpRequestSchema = z.object({
  email: z.string().email(),
  name: UserNameSchema,
  password: PasswordSchema,
});
export type SignUpRouteInterface = RouteInterface<
  z.infer<typeof SignUpRequestSchema>,
  ApiSuccessResponse
>;

export const VerifyOtpRequestSchema = z.object({
  email: z.string().email(),
  token: z.string().length(6),
  type: z.enum(["signup"]),
});
export type VerifyRouteInterface = RouteInterface<
  z.infer<typeof VerifyOtpRequestSchema>,
  ApiSuccessResponse
>;

export type SignOutRouteInterface = RouteInterface<
  undefined,
  ApiSuccessResponse
>;

export const ResendOtpRequestSchema = z.object({
  email: z.string().email(),
  type: z.enum(["signup"]),
});
export type ResendOtpRouteInterface = RouteInterface<
  z.infer<typeof ResendOtpRequestSchema>,
  ApiSuccessResponse
>;
