import bodyParser from "npm:body-parser";
import cors from "npm:cors";
import express from "npm:express";
import helmet from "npm:helmet";
import { pinoHttp } from "npm:pino-http";
import { httpLoggerConfig } from "./logger.ts";
import { errorHandlerMiddleware } from "./middlewares/error-handler.ts";
import { routeNotFound } from "./middlewares/not-found.ts";
import { generateRoutes } from "./routes/index.ts";

const app = express();

// Load config middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(pinoHttp(httpLoggerConfig));

// Load ruotes
app.use(generateRoutes());

// Load error middlewares
app.use(routeNotFound);
app.use(errorHandlerMiddleware);

export default app;
