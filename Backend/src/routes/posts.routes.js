import { Router } from "express";
import { upload } from "../utils/upload";
import { createPost } from "../controllers/posts.controller";
import { requireLogin } from "../middleware/auth";

const router = Router();

router.post("/", requireLogin, upload.single("image"), createPost);

export default router;
