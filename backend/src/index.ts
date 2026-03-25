import "reflect-metadata";
import express from "express";
import { uFoundDataSource } from "../ormconfig";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

uFoundDataSource.initialize().then(() => {
  console.log("uFound DB connected!");
  app.listen(Number(process.env.PORT) || 4000, () => {
    console.log(`uFound server running on port ${process.env.PORT || 4000}`);
  });
}).catch((err: Error) => {
  console.error("DB connection failed:", err);
});
