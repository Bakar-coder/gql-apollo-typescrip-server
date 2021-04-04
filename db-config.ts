import { __prod__ } from "./_constants";
import { createConnection } from "typeorm";

export const dbConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: !__prod__,
} as Parameters<typeof createConnection>[0];
