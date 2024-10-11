import { createInternalError } from "./internal.ts";

export const unknownLocation = createInternalError(400, "UNKNOWN_LOCATION");
