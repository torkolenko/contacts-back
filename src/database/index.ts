import { Pool, PoolConfig } from "pg";

let pool: Pool;

export function initDb(params?: PoolConfig) {
  pool = new Pool(params);
}

export function getPool() {
  if (!pool) {
    throw new Error("Database pool has not been initialized");
  }

  return pool;
}
