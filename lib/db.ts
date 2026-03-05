import { Pool } from "pg";
import { env } from "./env";

declare global {
  var __pgPool: Pool | undefined;
}

export const pool =
  global.__pgPool ??
  new Pool({
    connectionString: env.databaseUrl ?? undefined,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

if (!global.__pgPool) {
  global.__pgPool = pool;
}