import { NextFunction, Request, Response } from "npm:@types/express";
import { Schema } from "../schemas/objets.ts";
import { badRequestError } from "../errors/general.ts";

export const schemaValidator = (schema: Schema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    req.log.info("Validating schema");
    const errorBody = schema.body?.validate(req.body).error;
    const errorParams = schema.params?.validate(req.params).error;
    const errorQuery = schema.queryParams?.validate(req.query).error;
    const error = errorBody || errorParams || errorQuery;
    if (error) {
      req.log.error("Schema validation failed", error);
      const message = error.details.map((e: Error) => e.message).join(", ");
      throw badRequestError(message);
    }
    req.log.info("Schema validation successfull");
    return next();
  };
};
