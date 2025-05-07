/*
 * This utility function preforms an api request in a try/catch
 * and returns the result or an error
 */

type RequestType = "GET" | "POST" | "PATCH" | "DELETE";

type ApiSuccess<T = any> = { data: T; error?: undefined };
type ApiError = { data?: undefined; error: any };
type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

export async function apiRequest<T = any>(
  path: string,
  type: RequestType,
  body: any = null,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(path, {
      method: type,
      headers: {
        ...(body != null && { "Content-Type": "application/json" }),
      },
      ...(body != null && { body: JSON.stringify(body) }),
      credentials: "include",
    });

    const json = await res.json();

    if (!res.ok) {
      return { error: json };
    }

    return { data: json };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
}
