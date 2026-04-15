import "reflect-metadata";
import express from "express";
import cors from "cors";
import { uFoundDataSource } from "./ormconfig";
import * as dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes";
import filterRoutes from "./routes/filterRoutes";
<<<<<<< HEAD
import historyRoutes from "./routes/historyRoutes";
import authRoutes from "./routes/authRoutes";


=======
import authRoutes from "./routes/authRoutes";
>>>>>>> 9a29e83f2935a689a634d091ca8ce52fd9646514

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
<<<<<<< HEAD
=======

app.use("/auth", authRoutes);
>>>>>>> 9a29e83f2935a689a634d091ca8ce52fd9646514
app.use("/reports", reportRoutes);
app.use("/reports", filterRoutes);
app.use("/reports", historyRoutes);
app.use("/auth", authRoutes);

uFoundDataSource.initialize().then(() => {
  console.log("uFound DB connected!");
  app.listen(Number(process.env.PORT) || 4000, () => {
    console.log(`uFound server running on port ${process.env.PORT || 4000}`);
  });
}).catch((err: Error) => {
  console.error("DB connection failed:", err);
});