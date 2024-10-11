import app from "./server.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";

const startServer = () => {
  try {
    app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    logger.error(error);
  }
};

startServer();
