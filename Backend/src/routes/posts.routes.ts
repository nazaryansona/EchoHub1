import { Router } from "express";
import {
  createPost,
  getFeed,
  getMyPosts,
} from "../controllers/posts.controller";
import { requireLogin } from "../middleware/auth";
import { upload } from "../utils/upload";

const router = Router();

router.get("/feed", getFeed);
router.get("/me", requireLogin, getMyPosts);
router.post("/", requireLogin, upload.single("image"), createPost);

export default router;
