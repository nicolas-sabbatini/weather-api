import { NextFunction, Request, Response } from "npm:@types/express";
import { routeNotFoundError } from "../errors/general.ts";

export const routeNotFound = (
  req: Request,
  _: Response,
  next: NextFunction,
): Response | void => {
  req.log.error(`Route "${req.url}" Not found.`);
  return next(routeNotFoundError(`Route "${req.url}" Not found.`));
};
