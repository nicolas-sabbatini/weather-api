import { IncomingMessage } from "node:http";
import { Request, Response } from "npm:@types/express";
import { pino } from "npm:pino";
import { v4 } from "jsr:@std/uuid";
import { assert } from "jsr:@std/assert";

export const addLogMetadata = (req: Request, object: pino.Bindings) => {
  const metadata = {
    ...req.log.bindings(),
    ...object,
  };
  req.log = req.log.child(metadata);
};

export const extractLogMetadata = (req: Request, key: string) => {
  return req.log.bindings()[key];
};

export const logger = pino();

export const httpLoggerConfig = {
  logger,
  genReqId: function (req: Request, res: Response) {
    const existingID = req.id ?? req.headers["x-request-id"];
    if (existingID) return existingID;
    const id = crypto.randomUUID();
    assert(v4.validate(id));
    res.setHeader("X-Request-Id", id);
    return id;
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: (res: IncomingMessage) => ({
      statusCode: res.statusCode,
    }),
  },
};
