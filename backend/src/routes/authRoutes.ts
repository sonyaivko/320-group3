import { Router } from "express";
import { signUp, signIn } from "../services/authService";

const router = Router();

// POST /auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await signUp(email, password);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /auth/signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await signIn(email, password);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;