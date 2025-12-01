import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Getting users" });
});

export default router;
