import { Router } from "express";
import { addComment } from "../controllers/comments.controller";
import { requireLogin } from "../middleware/auth";

const router = Router();

router.post("/:postId", requireLogin, addComment);
router.get("/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const [rows]: any = await db.query(
      "SELECT id, text, user_id FROM comments WHERE post_id = ?",
      [postId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

export default router;
