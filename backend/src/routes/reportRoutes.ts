import { Router } from "express";
import { createReport, resolveReport, deleteReport, markAsFound } from "../services/reportService";
//import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// POST /reports - protected
//router.post("/", authMiddleware, async (req, res) => {
router.post("/", async (req, res) => {
  try {
    const user = (req as any).user;
    const report = await createReport({ ...req.body, user_id: user.id });
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

// PATCH /reports/:id/resolve - protected
//router.patch("/:id/resolve", authMiddleware, async (req, res) => {
router.patch("/:id/resolve", async (req, res) => {
  try {
    const user = (req as any).user;
    const report = await resolveReport(Number(req.params.id), user.id);
    res.json(report);
  } catch (err: any) {
    console.error(err);
    res.status(err.message === "Unauthorized" ? 403 : 500).json({ error: err.message });
  }
});

// PATCH /reports/:id/found - protected
//router.patch("/:id/found", authMiddleware, async (req, res) => {
router.patch("/:id/found", async (req, res) => {
  try {
    const user = (req as any).user;
    const { description, latitude, longitude } = req.body;
    const report = await markAsFound(Number(req.params.id), user.id, { description, latitude, longitude });
    res.json(report);
  } catch (err: any) {
    console.error(err);
    res.status(err.message === "Unauthorized" ? 403 : 500).json({ error: err.message });
  }
});

// DELETE /reports/:id - protected
//router.delete("/:id", authMiddleware, async (req, res) => {
router.delete("/:id", async (req, res) => {
  try {
    const user = (req as any).user;
    await deleteReport(Number(req.params.id), user.id);
    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    res.status(err.message === "Unauthorized" ? 403 : 500).json({ error: err.message });
  }
});

export default router;