import { Router } from "express";
import { uFoundDataSource } from "../ormconfig";
import { ReportHistory } from "../entities/ReportHistory";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// GET /reports/:id/history - protected
router.get("/:id/history", authMiddleware, async (req, res) => {
  try {
    const historyRepo = uFoundDataSource.getRepository(ReportHistory);
    const history = await historyRepo.find({
      where: { report_id: Number(req.params.id) },
      order: { changed_at: "DESC" },
    });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;