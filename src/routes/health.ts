import { Router } from "npm:express";
import { healthController } from "../controllers/health.ts";
import { logger } from "../logger.ts";
import { buildRoute } from "../helpers/route-builder.ts";

const route = Router();

export const generateHealthRoutes = (app: Router): void => {
  logger.info("Generating health routes");
  app.use("/health", route);
  route.get("/", buildRoute({ controller: healthController.check }));
};
