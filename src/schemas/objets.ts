import { ObjectSchema } from "npm:joi";

export enum From {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}

export interface Schema {
  body?: ObjectSchema;
  params?: ObjectSchema;
  queryParams?: ObjectSchema;
}
