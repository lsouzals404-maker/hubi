import { Pool } from "pg";
import { env } from "./env";

declare global {
  var __pgPool: Pool | undefined;
}

export const pool =
  env.databaseUrl
    ? global.__pgPool ??
      new Pool({
        connectionString: env.databaseUrl,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      })
    : null;

if (env.databaseUrl && !global.__pgPool && pool) {
  global.__pgPool = pool;
}