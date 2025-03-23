import { z } from "zod";

const dbConfigSchema = z.object({
  DATABASE_URL: z.string(),
});

export type DbConfig = z.infer<typeof dbConfigSchema>;

export const readDbConfig = () => {
  return dbConfigSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
  });
};

export const appConfigSchema = z.object({
  ENVIRONMENT: z.string(),
  databaseConfig: dbConfigSchema,
});

export type AppConfig = z.infer<typeof appConfigSchema>;

export const readAppConfig = () => {
  return appConfigSchema.parse({
    ENVIRONMENT: process.env.ENVIRONMENT,
    databaseConfig: readDbConfig(),
  });
};
