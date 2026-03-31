import "reflect-metadata";
import express from "express";
import { uFoundDataSource } from "./ormconfig";
import * as dotenv from "dotenv";
import { createReport } from "./services/reportService"; // make sure path is correct

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

// POST /reports
app.post("/reports", async (req, res) => {
  try {
    const report = await createReport(req.body);
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});