import { H3Event } from "h3";

export function readParam(event: H3Event, name: string) {
  if (!event.context.params) {
    throw createError({
      statusCode: 400,
      message: `Parameter '${name}' not specified`,
    });
  }

  const param = event.context.params[name];

  if (!param) {
    throw createError({
      statusCode: 400,
      message: `Parameter '${name}' not specified`,
    });
  }

  return param;
}
