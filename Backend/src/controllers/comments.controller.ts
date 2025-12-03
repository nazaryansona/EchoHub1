import { Request, Response } from "express";
import { db } from "../db/connection";

export const addComment = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const text = (req.body.text ?? "").trim();
    if (!text) return res.status(400).json({ error: "Missing comment text" });

    // @ts-ignore
    const userId: number = req.session?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const [insertResult]: any = await db.query(
      "INSERT INTO comments (post_id, user_id, text) VALUES (?, ?, ?)",
      [postId, userId, text]
    );

    const [postRows]: any = await db.query(
      "SELECT user_id FROM posts WHERE id = ?",
      [postId]
    );
    if (postRows.length > 0) {
      const postOwnerId = postRows[0].user_id;
      if (postOwnerId !== userId) {
        await db.query(
          "INSERT INTO notifications (user_id, actor_id, type, post_id) VALUES (?, ?, 'comment', ?)",
          [postOwnerId, userId, postId]
        );
      }
    }

    return res
      .status(201)
      .json({ message: "Comment added", commentId: insertResult.insertId });
  } catch (err) {
    console.error("addComment error:", err);
    return res.status(500).json({ error: "Failed to add comment" });
  }
};
