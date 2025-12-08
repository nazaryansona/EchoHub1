import { Router } from "express";
import {
  getNotifications,
  markAllRead,
} from "../controllers/notifications.controller";
import { requireLogin } from "../middleware/auth";

const router = Router();

router.get("/", requireLogin, getNotifications);
router.patch("/mark-all-read", requireLogin, markAllRead);

export default router;
