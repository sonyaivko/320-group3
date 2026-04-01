import { Router } from "express";
import { createReport } from "../services/reportService";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// POST /reports - protected
router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = (req as any).user;
    const report = await createReport({ ...req.body, user_id: user.id });
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

export default router;