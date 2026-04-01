import { Router } from "express";
import { createReport } from "../services/reportService";

const router = Router();

// POST /reports
router.post("/", async (req, res) => {
  try {
    const report = await createReport(req.body);
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

export default router;