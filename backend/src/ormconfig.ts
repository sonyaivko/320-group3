// src/ormconfig.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Report } from "./entities/Report";
import * as dotenv from "dotenv";
dotenv.config();

export const uFoundDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Report],  // ← pass class directly instead of glob string
});