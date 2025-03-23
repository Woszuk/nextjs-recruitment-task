import { readDbConfig } from "@/app/lib/config/config";
import { logger } from "@/app/lib/config/logger";
import { Database } from "@/app/lib/db/types";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export type DatabaseType = Kysely<Database>;

const dbConnection = () => {
  const config = readDbConfig();
  const { DATABASE_URL } = config;

  logger.info("DB connecting...");
  const database = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: DATABASE_URL,
      }),
    }),
  });
  logger.info("Connected to DB");

  return database;
};

export const db = dbConnection();
