import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * The public website itself does not need a database. The pool is therefore
 * created lazily and only when DATABASE_URL is configured, instead of
 * throwing at import time (which previously crashed /api/health — and any
 * module importing it — on machines without a database).
 */
const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

let cachedDb: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  try {
    const pool =
      globalForDb.__arenaNextJsPostgresqlPool ??
      new Pool({ connectionString: databaseUrl });

    if (process.env.NODE_ENV !== "production") {
      globalForDb.__arenaNextJsPostgresqlPool = pool;
    }

    cachedDb = drizzle(pool);
    return cachedDb;
  } catch {
    return null;
  }
}
