import { errorOnEnviroment } from "./errors/general.ts";

export enum ENVIRONMENT {
  LOCAL = "local",
  TEST = "test",
  PRODUCTION = "production",
}

interface Config {
  port: string;
  environment: ENVIRONMENT;
}

const loadConfig = (): Config => {
  const loadOrDefaultOrThrow = <T>(key: string, def?: T): T => {
    const value = Deno.env.get(key) as T;
    if (!value && !def) {
      throw errorOnEnviroment(`Missing environment variable ${key}`);
    }
    return value ?? def!;
  };

  const config: Config = {
    port: loadOrDefaultOrThrow("PORT"),
    environment: loadOrDefaultOrThrow("ENVIRONMENT"),
  };

  return config;
};

export const config = loadConfig();
