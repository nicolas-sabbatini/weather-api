import { NextFunction, Request, Response } from "npm:@types/express";
import { InternalError, isInternalError } from "../errors/internal.ts";
import { internalServerError } from "../errors/general.ts";

export const errorHandlerMiddleware = (
  error: Error | InternalError,
  req: Request,
  res: Response,
  _: NextFunction,
): Response | void => {
  req.log.error(error);
  if (!isInternalError(error)) {
    error = internalServerError("Unexpected error");
  }
  return res.status(error.status).send(error);
};
