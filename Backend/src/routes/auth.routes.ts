import { Router } from "express";
import {
  signup,
  login,
  logout,
  previewUsername,
  getCurrentUser,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/preview-username", previewUsername);
router.get("/me", getCurrentUser);

export default router;
