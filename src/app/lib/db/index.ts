import { readDbConfig } from "@/app/lib/config/config";
import { Database } from "@/app/lib/db/types";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export type DatabaseType = Kysely<Database>;

const dbConnection = () => {
  const config = readDbConfig();
  const { DATABASE_URL } = config;

  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: DATABASE_URL,
      }),
    }),
  });
};

export const db = dbConnection();
