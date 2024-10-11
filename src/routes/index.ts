import { Router } from "npm:express";
import { generateHealthRoutes } from "./health.ts";
import { generateLocationRoutes } from "./location.ts";
import { logger } from "../logger.ts";

const router = Router();

export const generateRoutes = (): Router => {
  logger.info("Generating routes");
  generateHealthRoutes(router);
  generateLocationRoutes(router);
  return router;
};
