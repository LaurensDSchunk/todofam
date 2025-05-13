/*
 * This utility function preforms an api request in a try/catch
 * and returns the result or an error
 */

import type { ZodSchema, ZodTypeAny } from "zod";
import type { RouteInterface } from "~/types/api/api.types";

export type Method = "POST" | "PATCH" | "GET" | "DELETE";

type ApiSuccess<T = any> = { data: T; error?: undefined };
type ApiError = {
  data?: undefined;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
};

type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

export async function apiRequest<T extends RouteInterface | unknown>(
  path: string,
  method: Method,
  body?: T extends RouteInterface ? T["request"] : unknown,
): Promise<ApiResponse<T extends RouteInterface ? T["response"] : T>> {
  try {
    const res = await fetch("/api" + path, {
      method: method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        error: {
          message: json?.message || "Request failed",
          code: json?.code,
          details: json,
        },
      };
    }

    console.log(json);

    return { data: json };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return { error: { message: path + method + e.message } };
    }

    // Fallback in case the error isn't a known `Error` type
    console.error("Unknown error", e);
    return { error: { message: "Unknown error occurred" } };
  }
}

export async function validatedApiRequest<T extends RouteInterface | unknown>(
  path: string,
  method: Method,
  schema: ZodSchema<T extends RouteInterface ? T["request"] : ZodTypeAny>,
  body: T extends RouteInterface ? T["request"] : unknown,
): Promise<ApiResponse<T extends RouteInterface ? T["response"] : T>> {
  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      error: {
        message: result.error.issues[0].message,
        details: result.error.flatten(),
      },
    };
  }

  return apiRequest(path, method, result.data);
}
