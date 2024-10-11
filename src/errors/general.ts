import { createInternalError } from "./internal.ts";

export const badRequestError = createInternalError(400, "BAD_REQUEST_ERROR");
export const routeNotFoundError = createInternalError(
  404,
  "ROUTE_NOT_FOUND_ERROR",
);
export const internalServerError = createInternalError(
  500,
  "INTERNAL_SERVER_ERROR",
);
export const errorOnEnviroment = createInternalError(
  500,
  "ERROR_ON_ENVARIOMENT",
);
