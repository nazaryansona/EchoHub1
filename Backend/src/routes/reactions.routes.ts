import { Router } from "express";
import { toggleReaction } from "../controllers/reactions.controller";
import { requireLogin } from "../middleware/auth";

const router = Router();

router.post("/:postId", requireLogin, toggleReaction);

export default router;
