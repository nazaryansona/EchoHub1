import { Request, Response } from "express";
import { pool } from "../db/connection";

/**
 * Toggle reaction on a post.
 * POST /reactions/:postId
 * Body: { reaction_type: string }  // e.g. "like", "love", "laugh"
 *
 * Behavior:
 * - If the user already reacted (any reaction) => remove it (toggle off)
 * - If user hasn't reacted => insert reaction (toggle on)
 *
 * (This keeps one reaction per user per post)
 */
export const toggleReaction = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const reaction_type = (req.body.reaction_type ?? "").toString().trim();
    if (!reaction_type)
      return res.status(400).json({ error: "Missing reaction_type" });

    // @ts-ignore
    const userId: number = req.session?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const [existing]: any = await pool.query(
      "SELECT * FROM reactions WHERE post_id = ? AND user_id = ?",
      [postId, userId]
    );

    if (existing.length > 0) {
      // If same type -> remove. If different type -> update to new type.
      const existingReaction = existing[0];
      if (existingReaction.reaction_type === reaction_type) {
        await pool.query("DELETE FROM reactions WHERE id = ?", [
          existingReaction.id,
        ]);
        return res.json({ message: "Reaction removed" });
      } else {
        await pool.query(
          "UPDATE reactions SET reaction_type = ?, created_at = CURRENT_TIMESTAMP WHERE id = ?",
          [reaction_type, existingReaction.id]
        );

        // create notification for post owner if owner != actor
        const [postRows]: any = await pool.query(
          "SELECT user_id FROM posts WHERE id = ?",
          [postId]
        );
        if (postRows.length > 0) {
          const postOwnerId = postRows[0].user_id;
          if (postOwnerId !== userId) {
            await pool.query(
              "INSERT INTO notifications (user_id, actor_id, type, post_id) VALUES (?, ?, 'reaction', ?)",
              [postOwnerId, userId, postId]
            );
          }
        }

        return res.json({ message: "Reaction updated" });
      }
    } else {
      // insert
      await pool.query(
        "INSERT INTO reactions (post_id, user_id, reaction_type) VALUES (?, ?, ?)",
        [postId, userId, reaction_type]
      );

      // notify owner
      const [postRows]: any = await pool.query(
        "SELECT user_id FROM posts WHERE id = ?",
        [postId]
      );
      if (postRows.length > 0) {
        const postOwnerId = postRows[0].user_id;
        if (postOwnerId !== userId) {
          await pool.query(
            "INSERT INTO notifications (user_id, actor_id, type, post_id) VALUES (?, ?, 'reaction', ?)",
            [postOwnerId, userId, postId]
          );
        }
      }

      return res.json({ message: "Reaction added" });
    }
  } catch (err) {
    console.error("toggleReaction error:", err);
    return res.status(500).json({ error: "Failed to toggle reaction" });
  }
};
