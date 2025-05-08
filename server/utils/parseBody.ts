import { H3Event } from "h3";
import { z, ZodTypeAny } from "zod";

/*
 * This function reads the body and then validates it.
 * Throws an error if the body is invalid.
 */

export async function parseBody<S extends ZodTypeAny>(
  event: H3Event,
  schema: S,
): Promise<z.infer<S>> {
  const body = await readBody(event);

  const result = schema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: result.error.message,
    });
  }

  return result.data;
}
