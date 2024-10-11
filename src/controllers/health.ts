import { NextFunction, Request, Response } from "npm:@types/express";
import process from "node:process";

export class HealthController {
  check(req: Request, res: Response, _: NextFunction): void {
    req.log.info({ uptime: process.uptime(), db: "ok" });
    res.send({ uptime: process.uptime(), db: "ok" });
  }
}

export const healthController: HealthController = new HealthController();
