import { Router } from "express";
import { uFoundDataSource } from "../ormconfig";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await uFoundDataSource.query(
      `SELECT type, color, material FROM categories WHERE id = 1`
    );

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

export default router;