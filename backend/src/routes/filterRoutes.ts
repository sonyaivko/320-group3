import { Router } from "express";
import { getReports } from "../services/filterService";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// GET /reports (protected route)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reports = await getReports({
      lost_or_found: req.query.lost_or_found as string,
      categories: req.query.categories
        ? JSON.parse(req.query.categories as string)
        : null,
      created_after: req.query.created_after as string,
      created_before: req.query.created_before as string,
      latitude: req.query.latitude ? Number(req.query.latitude) : undefined,
      longitude: req.query.longitude ? Number(req.query.longitude) : undefined,
      radius_km: req.query.radius_km ? Number(req.query.radius_km) : undefined,
    });

    res.json(reports);
  } catch (err) {
    console.error("Log in to view reports.:", err);
    res.status(500).json({ error: "Log in to view reports." });
  }
});

export default router;