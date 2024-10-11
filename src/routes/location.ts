import { Router } from "npm:express";
import { locationController } from "../controllers/location.ts";
import { logger } from "../logger.ts";
import { buildRoute } from "../helpers/route-builder.ts";

const route = Router();

export const generateLocationRoutes = (app: Router): void => {
  logger.info("Generating location routes");
  app.use("/location", route);
  route.get("/", buildRoute({ controller: locationController.getLocation }));
};
