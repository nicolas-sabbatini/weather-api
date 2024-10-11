import { Handler, NextFunction, Request, Response } from "npm:@types/express";
import { routeNotFoundError } from "../errors/general.ts";

export interface RouteConfig {
  preHandler?: Handler[];
  controller: Handler;
  postHandler?: Handler[];
}

export interface VariantRouteConfig {
  routes: Record<string, RouteConfig>;
  discriminator: (req: Request, res: Response) => string;
}

const buildHandlers = (config: RouteConfig): Handler[] => {
  const pre = config.preHandler ?? [];
  const post = config.postHandler ?? [];
  return [...pre, config.controller, ...post];
};

const executeHandlerChain = (
  handlers: Handler[],
  req: Request,
  res: Response,
) => {
  let current = 0;
  const next = () => {
    const currentHandler = handlers[current++];
    if (currentHandler) {
      return currentHandler(req, res, next);
    }
  };
  return next();
};

export const buildRoute = (config: RouteConfig): Handler => {
  const route = buildHandlers(config);
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await executeHandlerChain(route, req, res);
    } catch (err) {
      next(err);
    }
  };
};

export const buildRouteVarians = ({
  routes,
  discriminator,
}: VariantRouteConfig): Handler => {
  const ruteMap: Map<string, Handler[]> = new Map();
  for (const ruteName in routes) {
    ruteMap.set(ruteName, buildHandlers(routes[ruteName]));
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    const name = discriminator(req, res);
    const route = ruteMap.get(name);
    try {
      if (!route) {
        throw routeNotFoundError(`Route "${req.url}" Not found.`);
      }
      await executeHandlerChain(route, req, res);
    } catch (err) {
      next(err);
    }
  };
};
