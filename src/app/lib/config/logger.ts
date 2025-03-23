import { AppConfig, readAppConfig } from "@/app/lib/config/config";
import pino from "pino";

export type LoggerConfig = Pick<AppConfig, "ENVIRONMENT">;

const createLogger = () => {
  const config = readAppConfig();
  return pino({
    formatters: {
      level: (label) => ({ level: label }),
      bindings: (bindings) => ({ ...bindings, env: config.ENVIRONMENT }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  });
};

export const logger = createLogger();
