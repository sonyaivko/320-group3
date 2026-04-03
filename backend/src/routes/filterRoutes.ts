import { Router } from "express";
import { getReports } from "../services/filterService";

const router = Router();

// GET /reports
router.get("/", async (req, res) => {
  try {
    const reports = await getReports({
      lost_or_found: req.query.lost_or_found as string,
      categories: req.query.categories as string,
      created_after: req.query.created_after as string,
      created_before: req.query.created_before as string,
      latitude: req.query.latitude ? Number(req.query.latitude) : undefined,
      longitude: req.query.longitude ? Number(req.query.longitude) : undefined,
      radius_km: req.query.radius_km ? Number(req.query.radius_km) : undefined,
    });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

export default router;